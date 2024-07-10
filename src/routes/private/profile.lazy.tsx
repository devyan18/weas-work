import { LayoutPage } from "@/components/layouts/LayoutPage";
import { ProfilePage } from "@/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/private/profile")({
  component: () => (
    <LayoutPage>
      <ProfilePage />
    </LayoutPage>
  ),
});
