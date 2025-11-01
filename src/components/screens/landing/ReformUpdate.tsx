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
    <section className="w-full py-4 bg-white">
      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 text-center">
        {pageText.sectionTitle}
      </h2>
      <div className="max-w-7xl mx-auto bg-neutral-100 rounded-3xl px-4 py-10">
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
