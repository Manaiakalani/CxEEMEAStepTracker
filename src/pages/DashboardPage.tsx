import { Hero } from "../components/Hero";
import { TodayFocus } from "../components/TodayFocus";
import { QuickEntry } from "../components/QuickEntry";
import { Challenges } from "../components/Challenges";
import { WeeklyChart } from "../components/WeeklyChart";
import { Leaderboard } from "../components/Leaderboard";
import { RecentActivity } from "../components/RecentActivity";
import { useStore } from "../store";

export function DashboardPage() {
  const { setTab } = useStore();
  return (
    <>
      <Hero />
      <TodayFocus />
      <QuickEntry />
      <Challenges />
      <WeeklyChart />
      <Leaderboard
        limit={5}
        showAllToggle
        onSeeAll={() => setTab("leaderboard")}
      />
      <RecentActivity />
    </>
  );
}
