import { Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/global-layout";
import IndexPage from "./page/index-page";
import SignUpPage from "./page/sign-up-page";
import SignInPage from "./page/sign-in-page";
import GuestOnlyLayout from "./components/layout/guest-only-layout";
import MemberOnlyLayout from "./components/layout/member-only-layout";
import RenderPage from "./page/render";

export default function RootRoute() {
  return (
    <Routes>
      {/* 인증 없이 서버(Playwright)가 직접 접근하는 렌더 전용 라우트 */}
      <Route path="/render" element={<RenderPage />} />
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
        <Route element={<MemberOnlyLayout />}>
          <Route path="/" element={<IndexPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
