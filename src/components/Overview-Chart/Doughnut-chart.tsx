import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ totalIncome, totalExpenses }: any) {
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#1f83f6", "#408f3c"],

        borderWidth: 0,
      },
    ],
  };

  return <Doughnut data={data} />;
}
