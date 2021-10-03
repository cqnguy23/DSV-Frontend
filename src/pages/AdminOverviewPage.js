import { Col, Layout, Row } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import api from "../api";
import AdminInfo from "../components/AdminInfo";
import OrdersByDateChart from "../components/OrdersByDateChart";
import OrdersByGenderChart from "../components/OrdersByGenderChart";
import OrdersByTypeChart from "../components/OrdersByTypeChart";

const AdminOverviewPage = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      let url = "/order/all";
      const resp = await api.get(url);
      const data = await resp.data;
      setOrders(data);
    };
    const getCategories = async () => {
      let url = "/category/all";
      const resp = await api.get(url);
      const data = await resp.data;
      setCategories(data);
    };
    getOrders();
    getCategories();
  }, []);
  return (
    <Layout
      className="site-layout admin-dashboard-layout"
      style={{ alignItems: "center" }}
    >
      <Header
        className="site-layout-background admin-dashboard-header"
        style={{ width: "100%" }}
      >
        <Row className="admin-dashboard-toprow">
          <h1>Overview</h1>
          <AdminInfo />
        </Row>
      </Header>
      <Content
        style={{
          display: "flex",
          width: "96%",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <Row style={{ marginBottom: "15px", justifyContent: "space-between" }}>
          <Col
            className="admin-overview-plot"
            style={{
              padding: "20px 30px 30px 30px",
              width: "35%",
            }}
          >
            <OrdersByGenderChart orders={orders} />
          </Col>
          <Col
            className="admin-overview-plot"
            style={{
              padding: "20px 30px 30px 30px",
              width: "64%",
            }}
          >
            <OrdersByTypeChart orders={orders} categories={categories} />
          </Col>
        </Row>
        <Row
          className="admin-overview-plot"
          style={{
            padding: "10px 20px 20px 20px",
          }}
        >
          <OrdersByDateChart orders={orders} />
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminOverviewPage;
