import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["#634d36", "#00000", "#ffffff", "#4BC0C0"],
        hoverBackgroundColor: ["#634d36", "#00000", "#fffff", "#3BA99C"],
      },
    ],
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
