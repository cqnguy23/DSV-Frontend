import { Col, Layout, Radio, Row } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Footer from "rc-table/lib/Footer";
import React from "react";
import { Route, Switch, useHistory } from "react-router";
import UserOrders from "../components/UserOrders";
import UserPasswordChange from "../components/UserPasswordChange";

const UserPage = () => {
  const history = useHistory();
  const handleNavigate = (path) => {
    const url = "/user" + path;
    history.push(url);
  };
  return (
    <Layout id="user-layout">
      <Row>
        <Col span={4}>
          <h1>My Account</h1>
          <Radio.Group
            defaultValue="orders"
            buttonStyle="outline"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Radio.Button value="orders" onClick={() => handleNavigate("/")}>
              My Orders
            </Radio.Button>
            {/* <Radio.Button
              value="password"
              onClick={() => handleNavigate("/password")}
            >
              Change Password
            </Radio.Button> */}
          </Radio.Group>
        </Col>
        <Col span={20}>
          <Switch>
            <Route exact path="/user/" component={UserOrders} />
            <Route exact path="/user/password" component={UserPasswordChange} />
          </Switch>
        </Col>
      </Row>
    </Layout>
  );
};

export default UserPage;
