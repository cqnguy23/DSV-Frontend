import React, { useState } from "react";
import { Layout, Menu, Image, Divider } from "antd";
import {
  PieChartOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  DollarCircleFilled,
  TagFilled,
  SettingFilled,
} from "@ant-design/icons";
import logo from "../image/logo.png";
import { Route, Switch } from "react-router";
import AdminOrdersPage from "./AdminOrdersPage";
const { Sider } = Layout;
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
      <Switch>
        <Route exact path="/admin/dashboard" component={AdminOrdersPage} />
      </Switch>
    </Layout>
  );
};

export default AdminDashboardPage;
