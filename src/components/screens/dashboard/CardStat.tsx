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
    // <div className="w-full h-full p-4 bg-white rounded-3xl shadow-xl flex flex-col justify-between">
    //   <div className="flex items-center gap-3">
    //     <div className="p-3 rounded-lg bg-secondary-100 flex items-center justify-center">
    //       {Icon && <Icon className="w-8 h-8 text-secondary" />}
    //     </div>
    //     <div className="flex flex-col flex-1">
    //       <div className="text-base font-semibold text-neutral-600">
    //         {title}
    //       </div>
    //       <div className="flex items-center justify-between mt-3 w-full">
    //         <div className="text-5xl font-semibold text-neutral-900">
    //           {value}
    //         </div>
    //         {delta && (
    //           <div className="text-sm font-medium bg-success-10 text-success rounded-full px-6 py-3">
    //             {`↑ ${delta}`}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-full p-4 bg-white rounded-3xl shadow-xl flex flex-col justify-between">
      <div className="flex items-start gap-3">
        {/* Icon container */}
        <div className="p-3 rounded-lg bg-secondary-100 flex items-center justify-center">
          {Icon && <Icon className="w-12 h-12 text-secondary" />}
        </div>

        {/* Title + Value/Delta container */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <div className="text-base font-semibold text-neutral-600">
            {title}
          </div>

          {/* Value and Delta row */}
          <div className="flex items-center justify-between mt-6 w-full">
            <div className="text-5xl font-semibold text-neutral-900">
              {value}
            </div>
            {delta && (
              <div className="text-xs font-medium bg-success-10 text-success rounded-full px-6 py-3 mr-2">
                {`↑ ${delta}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
