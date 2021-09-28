import {
  Col,
  Layout,
  Row,
  Button,
  Divider,
  Dropdown,
  Menu,
  Badge,
  Avatar,
} from "antd";
import Search from "antd/lib/input/Search";
import { Header } from "antd/lib/layout/layout";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import logo from "../image/logo.png";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../redux/actions/user.actions";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import formatUtils from "../utils/formatUtils";
import { Link } from "react-router-dom";
import productActions from "../redux/actions/products.actions";
const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userName = useSelector((state) => state.user.name);
  const onSearch = () => {};
  const onMenuClick = (gender) => {
    history.push("/products/" + gender);
  };
  const handleProfileClick = () => {
    history.push("/user/");
  };
  const genderArray = ["men", "women", "boys", "girls"];
  const categories = useSelector((state) => state.products.categories);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLogInModalVisible, setIsLogInModalVisible] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const showLogInModal = () => {
    setIsLogInModalVisible(true);
  };

  const handleLogOut = () => {
    dispatch(userActions.logout());
  };
  useEffect(() => {
    dispatch(productActions.getCategories());
  }, [dispatch]);
  const menCategories = categories.filter((category) =>
    category.gender.includes("men")
  );
  // const womenCategories = categories.filter((category) =>
  //   category.gender.includes("women")
  // );
  // const boysCategories = categories.filter((category) =>
  //   category.gender.includes("boys")
  // );
  // const girlsCategories = categories.filter((category) =>
  //   category.gender.includes("girls")
  // );
  console.log(menCategories);
  return (
    <>
      <Layout className="header-layout">
        <Header className="header">
          <Row className="header-row">
            <Col className="header-col flex-start" span={10}>
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{ width: 200 }}
              />
            </Col>
            <Col className="header-col" span={4}>
              <Link to="/">
                <img
                  alt="logo"
                  src={logo}
                  height="20px"
                  className="cursor-pointer"
                />
              </Link>
            </Col>
            <Col className="header-col flex-end" span={10}>
              {isLoggedIn ? (
                <>
                  <div style={{ marginRight: "10px" }}>
                    Welcome back, {userName}
                  </div>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="1" onClick={handleProfileClick}>
                          My Profile
                        </Menu.Item>
                        <Menu.Item key="2" onClick={handleLogOut}>
                          Log Out
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottomCenter"
                  >
                    <Avatar
                      style={{
                        backgroundColor: "",
                        border: "2px solid #ffa15f",
                        cursor: "pointer",
                      }}
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      size="medium"
                    />
                  </Dropdown>
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
                      border: "1px solid #ffa15f",
                      color: "#ffa15f",
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
                <Badge
                  count={products.length}
                  style={{ color: "white", backgroundColor: "#ffa15f" }}
                >
                  <Avatar
                    size="small"
                    shape="square"
                    className="profile-cart"
                    style={{
                      marginLeft: "20px",
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "22px",
                    }}
                    icon={<ShoppingCartOutlined />}
                  />
                </Badge>
              </Link>
            </Col>
          </Row>
        </Header>
        <Divider />
        <Row className="navbar-menu">
          {genderArray.map((gender, idx) => {
            return (
              <Col className="header-col" span={2} key={idx}>
                <Dropdown
                  overlay={
                    <Menu
                      onClick={() => {
                        onMenuClick(gender);
                      }}
                      style={{ display: "flex" }}
                    >
                      <Menu.Item key="1">All</Menu.Item>
                    </Menu>
                  }
                  placement="bottomCenter"
                >
                  <a
                    href="/#"
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {formatUtils.capitalizeFirstLetter(gender)} <DownOutlined />
                  </a>
                </Dropdown>
              </Col>
            );
          })}
        </Row>
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
