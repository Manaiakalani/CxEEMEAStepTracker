import { lazy, Suspense } from "react";
import { StoreProvider, useStore } from "./store";
import { TopNav } from "./components/TopNav";
import { Footer } from "./components/Footer";
import { DashboardPage } from "./pages/DashboardPage";
import { HAIRLINE, MUTED } from "./theme";

const LeaderboardPage = lazy(() =>
  import("./pages/LeaderboardPage").then((m) => ({ default: m.LeaderboardPage })),
);
const ProfilePage = lazy(() =>
  import("./pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const OnboardingModal = lazy(() =>
  import("./components/OnboardingModal").then((m) => ({
    default: m.OnboardingModal,
  })),
);

function RouteFallback() {
  return (
    <div
      className="max-w-[1200px] mx-auto px-6 sm:px-10 py-16 text-[13px]"
      style={{ color: MUTED, borderTop: `1px solid ${HAIRLINE}` }}
      aria-hidden="true"
    >
      Loading…
    </div>
  );
}

function Routed() {
  const { tab } = useStore();
  switch (tab) {
    case "leaderboard":
      return (
        <Suspense fallback={<RouteFallback />}>
          <LeaderboardPage />
        </Suspense>
      );
    case "profile":
      return (
        <Suspense fallback={<RouteFallback />}>
          <ProfilePage />
        </Suspense>
      );
    case "about":
      return (
        <Suspense fallback={<RouteFallback />}>
          <AboutPage />
        </Suspense>
      );
    case "dashboard":
    default:
      return <DashboardPage />;
  }
}

export function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1">
          <Routed />
        </main>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <OnboardingModal />
      </Suspense>
    </StoreProvider>
  );
}
