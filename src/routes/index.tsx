import { server } from "@/supabase/client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { data } = await server.auth.getSession();
    if (!data.session?.access_token) {
      throw redirect({ to: "/signin" });
    } else {
      throw redirect({ to: "/private/home" });
    }
  },
});
