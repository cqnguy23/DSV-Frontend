import { Col, Layout, Row, Button, Divider, Dropdown, Menu } from "antd";
import Search from "antd/lib/input/Search";
import { Header } from "antd/lib/layout/layout";
import {
  CaretDownOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import logo from "../image/logo.png";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../redux/actions/user.actions";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userName = useSelector((state) => state.user.name);
  const onSearch = () => {};
  const onMenuClick = (gender) => {
    history.push("/products/" + gender);
  };

  const menMenu = (
    <Menu
      onClick={() => {
        onMenuClick("men");
      }}
    >
      <Menu.Item key="1">All</Menu.Item>
    </Menu>
  );
  const womenMenu = (
    <Menu
      onClick={() => {
        onMenuClick("women");
      }}
    >
      <Menu.Item key="1">All</Menu.Item>
    </Menu>
  );
  const girlsMenu = (
    <Menu
      onClick={() => {
        onMenuClick("girls");
      }}
    >
      <Menu.Item key="1">All</Menu.Item>
    </Menu>
  );
  const boysMenu = (
    <Menu
      onClick={() => {
        onMenuClick("boys");
      }}
    >
      <Menu.Item key="1">All</Menu.Item>
    </Menu>
  );
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLogInModalVisible, setIsLogInModalVisible] = useState(false);

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const showLogInModal = () => {
    setIsLogInModalVisible(true);
  };

  const handleLogOut = () => {
    dispatch(userActions.logout());
  };
  return (
    <>
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
              <Link to="/">
                <img
                  alt="logo"
                  src={logo}
                  height="20px"
                  className="cursor-pointer"
                />
              </Link>
            </Col>
            <Col className="header-col flex-end" span={6}>
              {isLoggedIn ? (
                <>
                  <div style={{ marginRight: "10px" }}>
                    Welcome back, {userName}!
                  </div>
                  <Button size="small" onClick={handleLogOut}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    type="text"
                    className="register-button"
                    onClick={showRegisterModal}
                    style={{ backgroundColor: "white" }}
                  >
                    Register
                  </Button>
                  <Button
                    onClick={showLogInModal}
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
                  </Button>{" "}
                </>
              )}
              <Link to="/cart">
                <ShoppingCartOutlined
                  style={{ fontSize: "24px", marginLeft: "10px" }}
                />
              </Link>
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
                Men <DownOutlined />
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
                Women <DownOutlined />
              </a>
            </Dropdown>
          </Col>
          <Col className="header-col" span={2}>
            <Dropdown overlay={boysMenu}>
              <a
                href="/#"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Boys <DownOutlined />
              </a>
            </Dropdown>
          </Col>
          <Col className="header-col" span={2}>
            <Dropdown overlay={girlsMenu}>
              <a
                href="/#"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Girls <DownOutlined />
              </a>
            </Dropdown>
          </Col>
        </Row>
        <Divider style={{ marginTop: "10px" }} />
      </Layout>
      <RegisterModal
        isRegisterModalVisible={isRegisterModalVisible}
        setIsRegisterModalVisible={setIsRegisterModalVisible}
        setIsLogInModalVisible={setIsLogInModalVisible}
      />
      <LoginModal
        isLogInModalVisible={isLogInModalVisible}
        setIsLogInModalVisible={setIsLogInModalVisible}
        setIsRegisterModalVisible={setIsRegisterModalVisible}
      />
    </>
  );
};

export default NavBar;
