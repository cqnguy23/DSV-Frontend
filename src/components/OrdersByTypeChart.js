import React from "react";
import { Bar } from "react-chartjs-2";

const OrdersByTypeChart = ({ orders, categories }) => {
  const categoriesName = categories.map((category) => category.name);
  const categoriesCount = categoriesName.reduce(
    (a, v) => ({ ...a, [v]: 0 }),
    {}
  );
  for (const order of orders) {
    for (const product of order.products) {
      for (const category of product.product.category) {
        categoriesCount[category.name] += product.orderedQuantity;
      }
    }
  }
  const data = {
    labels: categoriesName,
    datasets: [
      {
        label: "# of items",
        data: Object.values(categoriesCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(102, 153, 153 0.2)",
          "rgba(102, 51, 0, 0.2)",
          "rgba(51, 51, 0, 0.2)",
          "rgba(255, 51, 204, 0.2)",
          "rgba(204, 51, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(102, 153, 153, 1)",
          "rgba(102, 51, 0, 1)",
          "rgba(51, 51, 0, 1)",
          "rgba(255, 51, 204, 1)",
          "rgba(204, 51, 0, 1)",
          "rgba(0, 255, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Products Sold by Categories",
              font: { size: "20px" },
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </>
  );
};

export default OrdersByTypeChart;
