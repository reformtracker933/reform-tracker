import DashboardClient from "@/components/screens/dashboard/DashboardClient";
import { getDashboardStats } from "@/sanity/lib/fetch";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return <DashboardClient stats={stats} />;
}
