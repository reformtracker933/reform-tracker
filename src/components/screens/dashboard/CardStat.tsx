import { LucideIcon } from "lucide-react";

interface CardStatProps {
  icon?: LucideIcon;
  title: string;
  value: string | number;
  delta?: string;
}

export default function CardStat({
  icon: Icon,
  title,
  value,
  delta,
}: CardStatProps) {
  return (
    <div className="w-full h-full p-4 bg-white rounded-3xl shadow-xl flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-secondary-100 flex items-center justify-center">
          {Icon && <Icon className="w-6 h-6 text-secondary" />}
        </div>
        <div className="text-sm font-medium text-neutral-600">{title}</div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-3xl font-extrabold text-neutral-900">{value}</div>
        {delta && (
          <div className="text-sm font-medium bg-success-10 text-success rounded-full px-3 py-1">
            {`↑ ${delta}`}
          </div>
        )}
      </div>
    </div>
  );
}
