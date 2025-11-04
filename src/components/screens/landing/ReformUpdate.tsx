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
      color: "var(--color-primary-400)",
      href: "/updates/education",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.buttonTitle,
      color: "var(--color-success)",
      href: "/updates/healthcare",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.buttonTitle,
      color: "var(--color-warning)",
      href: "/updates/economy",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.buttonTitle,
      color: "var(--color-secondary)",
      href: "/updates/technology",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 md:mb-8 text-center">
        {pageText.sectionTitle}
      </h2>
      <div className="max-w-7xl mx-auto bg-neutral-100 rounded-2xl md:rounded-3xl py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        {/* Update Buttons Stack */}
        <div className="space-y-3 md:space-y-4">
          <p className="font-semibold text-neutral-600 text-base md:text-lg">
            {pageText.seeRecentUpdates}
          </p>
          {updates.map((update, index) => (
            <Button key={index} variant="card" update={update} />
          ))}
        </div>

        {/* View All Updates Button */}
        <div className="mt-4 md:mt-6 text-center">
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
