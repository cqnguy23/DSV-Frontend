import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Image, Row, Divider, Col } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  DollarCircleFilled,
  TagFilled,
  SettingFilled,
} from "@ant-design/icons";
import logo from "../image/logo.png";
const { Header, Content, Footer, Sider } = Layout;
const AdminDashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }} className="admin-dashboard-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="admin-dashboard-sider"
      >
        <div className="admin-dashboard-logo">
          <Image src={logo} width="120px" />
        </div>

        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          className="admin-dashboard-menu"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Overview
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            Orders
          </Menu.Item>
          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="4" icon={<DollarCircleFilled />}>
            Payments
          </Menu.Item>
          <Menu.Item key="5" icon={<TagFilled />}>
            Promotions
          </Menu.Item>
          <Menu.Item key="6" icon={<SettingFilled />}>
            Setting
          </Menu.Item>
        </Menu>
      </Sider>
      <Divider type="vertical" style={{ height: "100vh", margin: 0 }} />
      <Layout className="site-layout admin-dashboard-layout">
        <Header className="site-layout-background admin-dashboard-header">
          <h1>Orders</h1>
        </Header>
        <Content className="admin-dashboard-content">
          <Row className="site-layout-background admin-dashboard-status-row">
            <Col style={{ marginLeft: "15px" }} span={3}>
              ORDER ID
            </Col>
            <Col span={4}>ORDERED DATE</Col>
            <Col span={8}>DETAIL</Col>
            <Col span={3}>TOTAL</Col>
            <Col span={3}>STATUS</Col>
            <Col span={2}></Col>
          </Row>
          <Divider />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardPage;
