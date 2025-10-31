import { useLocale } from "@/context/LocaleContext";
import Link from "next/link";
import Button from "@/components/ui/ReformUpdateButton";

export function ReformUpdate() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("reformUpdateSection");

  const updates = [
    {
      category: pageText.corruptionAgainst,
      title: pageText.buttonTitle,
      color: "#EA8389",
      href: "/updates/education",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.buttonTitle,
      color: "#31B36BCC",
      href: "/updates/healthcare",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.buttonTitle,
      color: "#F9D262",
      href: "/updates/economy",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.buttonTitle,
      color: "#4A7EC9",
      href: "/updates/technology",
    },
  ];

  return (
    <section className="w-full py-4 dark:bg-gray-900">
      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-8 text-center">
        {pageText.sectionTitle}
      </h2>
      <div className="container mx-auto bg-[#F9F8F8] rounded-3xl px-14 py-10 max-w-4xl">
        {/* Update Buttons Stack */}
        <div className="space-y-4">
          <p className="font-semibold text-neutral-600">
            {pageText.seeRecentUpdates}
          </p>
          {updates.map((update, index) => (
            <Button key={index} variant="card" update={update} />
          ))}
        </div>

        {/* View All Updates Button */}
        <div className="mt-4 text-center">
          <Link href="/updates">
            <Button
              variant="primary"
              pageText={{ viewAll: pageText.viewAll }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
