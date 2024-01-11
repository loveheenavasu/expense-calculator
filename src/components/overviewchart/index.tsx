// import "./styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";


export default function OverViewChart({incomeData,expenseData}:any) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  console.log('incomeData,epxpensesData',incomeData,expenseData);
  const mapIncomeData=incomeData?.map((income:any)=>income.amount)
  const labels = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul","Aug","Sept","Nov","Dec"];
  const mappedExpenseDate=expenseData?.map((expense:any)=>expense.price)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        beginAtZero: true,
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
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income Data",
        data: mapIncomeData,
        backgroundColor: "#0084FF"
      },
      {
        label: "Expenses Data",
        data:mappedExpenseDate,
        backgroundColor: "#388E3C"
      }
    ]
  };
  return (
    <>
      <Bar  data={data} options={options}/>
    </>
  );
}
