import { Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/global-layout";
import IndexPage from "./page/index-page";
import SignUpPage from "./page/sign-up-page";
import SignInPage from "./page/sign-in-page";
import GuestOnlyLayout from "./components/layout/guest-only-layout";
import MemberOnlyLayout from "./components/layout/member-only-layout";

export default function RootRoute() {
  return (
    <Routes>
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
