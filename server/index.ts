import express from "express";
import cors from "cors";
import "dotenv/config";
import { RenderPayload, Theme } from "../shared/types";
import { DEVICE_MAP, DeviceType } from "../shared/devices";
import { chromium } from "playwright";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN?.trim() || "http://localhost:5173";

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

app.get("/api/wallpaper.png", async (req, res) => {
  //   try {
  const deviceQ = req.query.device;
  const themeQ = req.query.theme;
  const accentQ = req.query.accent;

  const device: DeviceType = isDeviceType(deviceQ) ? deviceQ : "iphone-16";
  const theme: Theme = isTheme(themeQ) ? themeQ : "dark";
  const accentColor =
    typeof accentQ === "string" && accentQ.length > 0 ? accentQ : "#FFFFFF";

  const showDate = parseBool(req.query.date, true);
  const showProgress = parseBool(req.query.progress, true);

  const sp = new URLSearchParams({
    device,
    theme,
    accent: accentColor,
    date: showDate ? "1" : "0",
    progress: showProgress ? "1" : "0",
    render: "1",
  });
  const targetUrl = `${FRONTEND_ORIGIN}/?${sp.toString()}`;

  const { width, height } = DEVICE_MAP[device];

  let browser: any;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 3, // 선명도
    });

    const page = await context.newPage();

    // ✅ 프론트 페이지 로드
    await page.goto(targetUrl, { waitUntil: "networkidle" });

    // ✅ 캡쳐 대상 찾기 (프론트에서 id 부여한 것)
    const el = await page.waitForSelector("#capture-root", { timeout: 15000 });

    // (선택) 폰트/레이아웃 안정화를 위해 한 프레임 기다리기
    await page.waitForTimeout(50);

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
// const { width, height } = DEVICE_MAP[device];

// res.send({ payload, width, height });
// 프론트 렌더 전용 페이지로 payload 전달 (base64)
// const encoded = Buffer.from(JSON.stringify(payload), "utf-8").toString(
//   "base64",
// );

// const renderUrl = `${process.env.FRONT_PORT}/render?payload=${encodeURIComponent(encoded)}`;
// console.log(renderUrl);

//     const browser = await chromium.launch();
//     const page = await browser.newPage({
//       viewport: { width, height },
//       deviceScaleFactor: 3,
//     });

//     try {
//       await page.goto(renderUrl, { waitUntil: "networkidle" });
//       await page.waitForSelector("#capture-root", { timeout: 10_000 });

//       const el = await page.$("#capture-root");
//       const png = await el!.screenshot({ type: "png" });

//       res.setHeader("Content-Type", "image/png");
//       res.setHeader("Cache-Control", "no-store");
//       return res.status(200).send(png);
//     } finally {
//       await page.close().catch(() => {});
//       await browser.close().catch(() => {});
//     }
//   } catch (e: any) {
//     console.error(e);
//     return res.status(500).json({ error: e?.message ?? "Render failed" });
//   }
// });

const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);
app.listen(PORT, () => {
  console.log(`Render server on http://localhost:${PORT}`);
});
