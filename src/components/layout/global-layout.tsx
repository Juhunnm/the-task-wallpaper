import { Outlet } from "react-router";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border border-b">
        <div>Todo</div>
      </header>
      <main className="bg-muted flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
