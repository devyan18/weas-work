import { createLazyFileRoute } from "@tanstack/react-router";
import { SignInpage } from "@/pages/Signinpage";

export const Route = createLazyFileRoute("/signin")({
  component: () => <SignInpage />,
});
