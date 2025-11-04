export default function CardStat({
  icon: Icon,
  title,
  value,
  delta,
}: {
  icon?: any;
  title: string;
  value: string | number;
  delta?: string;
}) {
  return (
    <div className="w-full h-full p-4 bg-white rounded-3xl shadow-xl flex flex-col justify-between">
      {/* Top Section: Icon + Title */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-blue-50 flex items-center justify-center">
          {Icon ? <Icon className="w-6 h-6 text-blue-500" /> : null}
        </div>
        <div className="text-sm font-medium text-gray-600">{title}</div>
      </div>

      {/* Bottom Section: Value + Delta */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-3xl font-extrabold text-gray-800">{value}</div>
        {delta ? (
          <div className="text-sm font-medium bg-green-100 text-green-700 rounded-full px-3 py-1">
            {`↑ ${delta}`}
          </div>
        ) : null}
      </div>
    </div>
  );
}
