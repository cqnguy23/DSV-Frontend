import { Col, Layout, Row, Button, Divider, Dropdown, Menu } from "antd";
import Search from "antd/lib/input/Search";
import { Header } from "antd/lib/layout/layout";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import logo from "../image/logo.png";
const NavBar = () => {
  const onSearch = () => {};
  const onClick = () => {};
  const menMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  const womenMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  return (
    <Layout className="header-layout">
      <Header className="header">
        <Row className="header-row">
          <Col className="header-col flex-start" span={6}>
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Col>
          <Col className="header-col" span={6}>
            <img alt="logo" src={logo} height="20px" />
          </Col>
          <Col className="header-col flex-end" span={6}>
            <a href="/#" className="register-button">
              Register
            </a>
            <Button
              className="header-login-btn"
              style={{
                borderRadius: "100px",
                borderColor: "ffa15f",
                color: "pale-orange",
                minWidth: "120px",
                minHeight: "35px",
                marginLeft: "24px",
              }}
            >
              Log In
            </Button>
            <a href="/#">
              <ShoppingCartOutlined
                style={{ fontSize: "24px", marginLeft: "29px" }}
              />
            </a>
          </Col>
        </Row>
      </Header>
      <Divider style={{ margin: "0" }} />
      <Row className="navbar-menu">
        <Col className="header-col" span={2}>
          <Dropdown overlay={menMenu}>
            <a
              href="/#"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Men
              <DownOutlined />
            </a>
          </Dropdown>
        </Col>
        <Col className="header-col" span={2}>
          <Dropdown overlay={womenMenu}>
            <a
              href="/#"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Women
              <DownOutlined />
            </a>
          </Dropdown>
        </Col>
      </Row>
      <Divider style={{ marginTop: "10px" }} />
    </Layout>
  );
};

export default NavBar;
