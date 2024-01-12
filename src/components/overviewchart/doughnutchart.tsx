import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({totalIncome,totalExpenses}:any) {
    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
          {
            label: 'Income',
            data: [totalIncome,totalExpenses],
            backgroundColor: [
              '#D0CCD0',
              '#2C514C', 
            ],
            
            borderWidth: 0,
          },
        ],
      };
      
  return <Doughnut data={data} />;
}
