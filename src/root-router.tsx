import { Route, Routes } from "react-router";
import GlobalLayout from "./components/layout/global-layout";
import IndexPage from "./page/index-page";
import RenderPage from "./page/render";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/render" element={<RenderPage />} />
      </Route>
    </Routes>
  );
}
