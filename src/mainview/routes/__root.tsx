import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen w-screen overflow-y-auto dark bg-background text-foreground">
      <Outlet />
      {process.env.NODE_ENV === "development" && <TanStackRouterDevtools />}
    </div>
  ),
});
