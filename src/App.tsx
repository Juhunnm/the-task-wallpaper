import { useEffect } from "react";
import { useLocation } from "react-router";
import SessionProvider from "./provider/session-provider";
import RootRoute from "./root-router";
import { useThemeMode } from "./store/setting-store";

// 스토어에 저장된 모드를 DOM에 동기화 (새로고침해도 테마 유지)
// /render 경로는 payload의 theme이 단독으로 적용되므로 스킵
function ThemeSync() {
  const mode = useThemeMode();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/render") return;
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(mode);
  }, [mode, pathname]);
  return null;
}

function App() {
  return (
    <SessionProvider>
      <ThemeSync />
      <RootRoute />
    </SessionProvider>
  );
}

export default App;
