import { Outlet } from "react-router";
import { Header } from "./header/header";
export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
