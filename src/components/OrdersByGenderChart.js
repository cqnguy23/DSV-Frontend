import React from "react";
import { Pie } from "react-chartjs-2";

const OrdersByGenderChart = ({ orders }) => {
  const productsCount = {
    men: 0,
    women: 0,
    boys: 0,
    girls: 0,
  };
  let womenOrders = 0;
  let menOrders = 0;
  let boysOrders = 0;
  let girlsOrders = 0;
  for (const order of orders) {
    for (const product of order.products) {
      productsCount[product.product.gender] += product.orderedQuantity;
    }
  }
  const { men, women, boys, girls } = productsCount;
  const data = {
    labels: ["Men", "Women", "Boys", "Girls"],
    datasets: [
      {
        label: "# of Votes",
        data: [men, women, boys, girls],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Products Sold by Gender",
              font: { size: "20px" },
            },
          },
        }}
      />
    </>
  );
};

export default OrdersByGenderChart;
