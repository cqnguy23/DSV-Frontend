import {
  Col,
  Layout,
  Row,
  Button,
  Divider,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  Checkbox,
} from "antd";
import Search from "antd/lib/input/Search";
import { Header } from "antd/lib/layout/layout";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import logo from "../image/logo.png";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../redux/actions/user.actions";
const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userName = useSelector((state) => state.user.name);
  const onSearch = () => {};
  const onClick = () => {
    history.push("/products");
  };
  const toHomePage = () => {
    history.push("/");
  };
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
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleRegisterOk = () => {
    setIsRegisterModalVisible(false);
  };

  const handleRegisterCancel = () => {
    setIsRegisterModalVisible(false);
  };
  const [isLogInModalVisible, setIsLogInModalVisible] = useState(false);

  const showLogInModal = () => {
    setIsLogInModalVisible(true);
  };

  const handleLogInOk = () => {
    setIsLogInModalVisible(false);
  };

  const handleLogInCancel = () => {
    setIsLogInModalVisible(false);
  };
  const onLogInFinish = (values) => {
    const { email, password } = values;
    dispatch(userActions.login(email, password, setIsLogInModalVisible));
  };

  const onLogInFinishFailed = (errorInfo) => {};
  const onRegisterFinish = (values) => {
    const { email, password, name } = values;
    dispatch(
      userActions.resgister(email, password, name, setIsRegisterModalVisible)
    );
  };

  const onRegisterFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            <Col className="header-col" span={6} onClick={toHomePage}>
              <img
                alt="logo"
                src={logo}
                height="20px"
                className="cursor-pointer"
              />
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
              <a href="/#">
                <ShoppingCartOutlined
                  style={{ fontSize: "24px", marginLeft: "10px" }}
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
      <Modal
        centered
        bodyStyle={{ height: "70vh" }}
        width="555px"
        visible={isRegisterModalVisible}
        onOk={handleRegisterOk}
        footer={[
          <div className="modal-footer">
            Do you have an account? <a>Log In</a>
          </div>,
        ]}
        onCancel={handleRegisterCancel}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onRegisterFinish}
          onFinishFailed={onRegisterFinishFailed}
          autoComplete="off"
          className="register-login-form"
        >
          <h1 style={{ textAlign: "center" }}>
            {" "}
            <strong>Register</strong>
          </h1>

          <div> Name </div>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your name!" },
              {
                type: "string",
                message: "Please enter a valid name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div> Email </div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div> Password </div>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Password must be more than 6 characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div style={{ textAlign: "center", fontSize: "12px" }}>
            By creating an account you agree to the Terms of Service and Privacy
            Policy
          </div>
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        centered
        bodyStyle={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        width="555px"
        visible={isLogInModalVisible}
        onOk={handleLogInOk}
        footer={[
          <div className="modal-footer">
            Don't have an account? <a>Register</a>
          </div>,
        ]}
        onCancel={handleLogInCancel}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onLogInFinish}
          onFinishFailed={onLogInFinishFailed}
          autoComplete="off"
          className="register-login-form"
        >
          <h1 style={{ textAlign: "center" }}>
            {" "}
            <strong>Log In</strong>
          </h1>
          <div> Email </div>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Your email is invalid!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div> Password </div>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Invalid Password ",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NavBar;
