import express from "express";
import cors from "cors";
import "dotenv/config";
import { RenderPayload, Theme, Task } from "../shared/types";
import { DEVICE_MAP, DeviceType } from "../shared/devices";
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN?.trim() || "http://localhost:5173";

// service role key: RLS 우회해서 서버 측에서 임의 유저 데이터 조회 가능
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function parseBool(v: unknown, fallback = false) {
  if (typeof v !== "string") return fallback;
  return v === "true" || v === "1";
}

function isTheme(v: any): v is Theme {
  return v === "dark" || v === "light";
}

function isDeviceType(v: any): v is DeviceType {
  return v && typeof v === "string" && v in DEVICE_MAP;
}

function coerceTasks(v: any): Task[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((t) => t && typeof t.text === "string")
    .map((t) => ({
      id: Number(t.id),
      text: String(t.text),
      completed: Boolean(t.completed),
    }));
}

async function fetchTasksForUser(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("tasks")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("tasks 조회 실패:", error.message);
    return [];
  }
  if (!data) return [];
  return coerceTasks(data.tasks);
}
app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/api/wallpaper.png", async (req, res) => {
  const deviceQ = req.query.device;
  const themeQ = req.query.theme;
  const accentQ = req.query.accent;
  const userIdQ = req.query.userId;

  const device: DeviceType = isDeviceType(deviceQ) ? deviceQ : "iphone-16";
  const theme: Theme = isTheme(themeQ) ? themeQ : "dark";
  const accentColor =
    typeof accentQ === "string" && accentQ.length > 0 ? accentQ : "#FFFFFF";
  const showDate = parseBool(req.query.date, true);

  const showProgress = parseBool(req.query.progress, true);

  // userId가 있으면 해당 유저 tasks 조회, 없으면 빈 배열
  const tasks: Task[] =
    typeof userIdQ === "string" && userIdQ.length > 0
      ? await fetchTasksForUser(userIdQ)
      : [];

  // RenderPayload를 base64로 인코딩해서 /render 페이지로 전달
  const payload: RenderPayload = {
    device,
    theme,
    accentColor,
    showDate,
    showProgress,
    tasks,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf-8").toString(
    "base64",
  );
  console.log(encoded);
  const targetUrl = `${FRONTEND_ORIGIN}/render?payload=${encodeURIComponent(encoded)}`;

  const { width, height } = DEVICE_MAP[device];

  let browser: any;
  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",  // Docker /dev/shm 메모리 제한 우회
        "--disable-gpu",
        "--single-process",
      ],
    });

    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 3,
    });

    const page = await context.newPage();

    await page.goto(targetUrl, { waitUntil: "networkidle" });

    // 웹 폰트(Inter) 로드 완료 대기
    await page.evaluate(() => document.fonts.ready);

    const el = await page.waitForSelector("#capture-root", { timeout: 15000 });

    await page.waitForTimeout(300);

    const png = await el.screenshot({ type: "png" });

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(png);
  } catch (e) {
    console.error("render failed:", e);
    return res.status(500).json({ message: "Failed to render wallpaper" });
  } finally {
    if (browser) await browser.close();
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Render server on http://localhost:${PORT}`);
});
