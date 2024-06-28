import "../index.css";

import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<Record<"isAuth", boolean>>()({
  component: () => <Outlet />,
});
