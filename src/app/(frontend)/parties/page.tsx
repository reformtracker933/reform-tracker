import PartiesClient from "@/components/screens/partiesSection/PartiesClient";
import { getPartyStatistics } from "@/sanity/lib/fetch";

export default async function PartiesPage() {
  const parties = await getPartyStatistics();

  return <PartiesClient parties={parties} />;
}
