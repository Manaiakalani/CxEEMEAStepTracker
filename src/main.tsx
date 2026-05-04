import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

// Unadvertised admin route — accessible only via the direct URL `/admin`.
// Kept out of the public nav and README on purpose. Lazy-loaded so the
// admin bundle never ships to regular walkers.
const AdminPage = lazy(() =>
  import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);

const isAdminRoute =
  typeof window !== "undefined" &&
  window.location.pathname.replace(/\/+$/, "").toLowerCase() === "/admin";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdminRoute ? (
      <Suspense fallback={null}>
        <AdminPage />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
