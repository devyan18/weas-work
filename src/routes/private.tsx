import { server } from "@/supabase/client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/private")({
  beforeLoad: async () => {
    const { data } = await server.auth.getSession();

    if (!data.session?.access_token) {
      throw redirect({ to: "/signin" });
    }
  },

  component: () => <Outlet />,
});
