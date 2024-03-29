import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
const LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Nov",
  "Dec",
];
const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  // inflateAmount:0,
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: "#FFF",
        font: {
          size: 14,
        },
      },
    },
    y: {
      beginAtZero:true,
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#FFF",
        font: {
          size: 14,
        },
      },
    },
  },
};
export const  BarChart=({ incomeData, expenseData }: any) =>{
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: LABELS,
    datasets: [
      {
        label: "Income Data",
        data: incomeData,
        backgroundColor: "#0084FF",
      },
      {
        label: "Expenses Data",
        data: expenseData,
        backgroundColor: "#388E3C",
      },
    ],
  };
  return (
    <>
      <Bar data={data} options={OPTIONS} />
    </>
  );
}
