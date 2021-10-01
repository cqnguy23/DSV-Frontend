import moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";

const OrdersByDateChart = ({ orders }) => {
  const numsOfDay = 14;
  const difference = [];
  for (let i = numsOfDay; i >= 0; i--) {
    difference.push(i);
  }
  const datesInMoments = difference.map((num) => moment().subtract(num, "day"));
  const datesInDate = datesInMoments.map((date) => date.format("dddd"));
  const ordersByDate = datesInMoments.map((date) => {
    let result = 0;
    for (const order of orders) {
      const target = moment(order.createdAt);
      if (target.isSame(date, "day")) result++;
    }
    return result;
  });
  const data = {
    labels: datesInDate,
    datasets: [
      {
        label: "# of orders",
        data: ordersByDate,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return (
    <>
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Orders from last 14 days",
              font: { size: "20px" },
            },
            legend: {
              display: false,
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
