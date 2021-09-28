import React from "react";
import { Line } from "react-chartjs-2";

const OrdersByDateChart = ({ orders }) => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {};
  return (
    <>
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Orders from last 7 days",
              font: { size: "20px" },
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </>
  );
};

export default OrdersByDateChart;