import { createLazyFileRoute } from "@tanstack/react-router";
import { SignInpage } from "@/pages";

export const Route = createLazyFileRoute("/signin")({
  component: () => <SignInpage />,
});
