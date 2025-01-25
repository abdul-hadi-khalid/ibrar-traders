import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./graph.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graph({ weeklySales }) {
  // Prepare the data for the chart
  const days = Object.keys(weeklySales); // Extract days (keys)
  const sales = Object.values(weeklySales); // Extract sales amounts (values)

  const data = {
    labels: days,
    datasets: [
      {
        label: "Sales Amount",
        data: sales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow flexible resizing
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Sales Data",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales Amount",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
    },
  };

  return (
    <div className="home-page-graph">
      <Bar data={data} options={options} />
    </div>
  );
}

export default Graph;
