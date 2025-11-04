import PartiesClient from "@/components/screens/partiesSection/PartiesClient";
import { getPartyStatistics, getAllProposals } from "@/sanity/lib/fetch";

export default async function PartiesPage() {
  const [parties, proposals] = await Promise.all([
    getPartyStatistics(),
    getAllProposals("bn", 0, 100),
  ]);

  return <PartiesClient parties={parties} proposals={proposals} />;
}
