import { StoreProvider, useStore } from "./store";
import { TopNav } from "./components/TopNav";
import { Footer } from "./components/Footer";
import { DashboardPage } from "./pages/DashboardPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { TeamsPage } from "./pages/TeamsPage";
import { ProfilePage } from "./pages/ProfilePage";

function Routed() {
  const { tab } = useStore();
  switch (tab) {
    case "leaderboard":
      return <LeaderboardPage />;
    case "teams":
      return <TeamsPage />;
    case "profile":
      return <ProfilePage />;
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
    </StoreProvider>
  );
}
