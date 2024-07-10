import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { WorkspacesProvider } from "@/providers/WorkspacesProvider";
import { LayoutProvider } from "./providers/LayoutProvider";

// Create a new router instance
const router = createRouter({ routeTree, context: { isAuth: undefined! } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const $root = document.getElementById("root")!;
if (!$root.innerHTML) {
  const root = ReactDOM.createRoot($root);
  root.render(
    <AuthProvider>
      <LayoutProvider>
        <WorkspacesProvider>
          <App />
        </WorkspacesProvider>
      </LayoutProvider>
    </AuthProvider>,
  );
}

function App() {
  const { isAuth } = useAuth();

  return <RouterProvider router={router} context={{ isAuth }} />;
}
