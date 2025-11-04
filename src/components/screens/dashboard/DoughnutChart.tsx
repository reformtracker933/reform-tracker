// "use client";

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// // Register the arc element and plugins
// ChartJS.register(ArcElement, Tooltip, Legend);

// interface DoughnutChartProps {
//   labels: string[];
// }

// export default function DoughnutChart({ labels }: DoughnutChartProps) {
//   const colors = ["#E83231", "#2563EB", "#10B981", "#FBBF24"];

//   const data = {
//     labels,
//     datasets: [
//       {
//         data: [40, 30, 20, 10],
//         borderWidth: 0,
//         cutout: "80%",
//         spacing: 8,
//         hoverOffset: 6,
//         backgroundColor: colors,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false, // ensures it fills parent div
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: true },
//     },
//   } as const;

//   return (
//     <div className="w-full h-full bg-white rounded-xl shadow-xl p-5 flex flex-col items-center">
//       {/* Title */}
//       <div className="text-5xl font-semibold text-gray-800 mb-4">
//         সেক্টর দ্বারা সংস্কার
//       </div>

//       {/* Doughnut Chart */}
//       <div className="flex-1 w-full flex items-center justify-center">
//         <Doughnut data={data} options={options} />
//       </div>

//       {/* Legend */}
//       <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-xs text-sm">
//         {labels.map((lab, idx) => (
//           <div key={idx} className="flex items-center gap-2">
//             <span
//               style={{
//                 width: 12,
//                 height: 12,
//                 background: colors[idx],
//                 borderRadius: 6,
//               }}
//             />
//             <span className="text-gray-700">{lab}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register the arc element and plugins
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
}

export default function DoughnutChart({ labels }: DoughnutChartProps) {
  const colors = [
    "#E83231",
    "#2563EB",
    "#10B981",
    "#FBBF24",
    "#E83231",
    "#2563EB",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [40, 30, 20, 10],
        borderWidth: 0,
        cutout: "80%", // inner hole size
        spacing: 4,
        hoverOffset: 4,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // let canvas keep its aspect ratio
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  } as const;

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-xl p-4 flex flex-col items-center justify-around">
      {/* Title */}
      <div className="text-center text-5xl font-semibold text-gray-800">
        সেক্টর দ্বারা সংস্কার
      </div>

      {/* Doughnut Chart: smaller container */}
      <div className="w-64 h-64 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>

      {/* Legend */}
      <div className="mt-4 w-full flex justify-center">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {labels.map((lab, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                style={{
                  width: 12,
                  height: 12,
                  background: colors[idx],
                  borderRadius: 6,
                }}
              />
              <span className="text-gray-700">{lab}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
