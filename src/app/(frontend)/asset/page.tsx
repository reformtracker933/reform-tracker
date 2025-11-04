import AssetClient from "@/components/screens/assetSection/AssetClient";
import { getAllResources } from "@/sanity/lib/fetch";

export default async function AssetPage() {
  const resources = await getAllResources("bn", 0, 100);

  return <AssetClient resources={resources} />;
}
