import { createFileRoute } from "@tanstack/react-router";
import { Homepage } from "@/pages";
import { LayoutPage } from "@/components/layouts/LayoutPage";

export const Route = createFileRoute("/private/home")({
  component: () => {
    return (
      <LayoutPage>
        <Homepage />
      </LayoutPage>
    );
  },
});
