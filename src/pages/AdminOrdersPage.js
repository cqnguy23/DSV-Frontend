import { Layout, Row, Col, Divider, Tag, Dropdown, Button, Menu } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import orderActions from "../redux/actions/order.actions";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import { DeleteFilled, DownOutlined, EditOutlined } from "@ant-design/icons";
const AdminOrdersPage = () => {
  let orders = useSelector((state) => state.order.orders);
  let loading = useSelector((state) => state.order.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getOrders());
  }, [dispatch]);
  console.log(orders);
  function handleMenuClick(e) {
    console.log("click", e);
  }
  if (orders.length != 0) {
    orders = orders.map((order) => {
      const date = moment(order.createdAt).calendar(null, {
        sameDay: "[Today], Do MMM, YYYY",
        lastDay: "[Yesterday], Do MMM, YYYY",
        sameElse: "dddd,Do MMM, YYYY",
      });
      return { ...order, createdAt: date };
    });
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteFilled />}>
        Remove
      </Menu.Item>
    </Menu>
  );
  console.log(orders);
  return (
    <Layout className="site-layout admin-dashboard-layout">
      <Header className="site-layout-background admin-dashboard-header">
        <h1>Orders</h1>
      </Header>
      <Content className="admin-dashboard-content">
        {loading ? (
          <ClipLoader />
        ) : orders.length == 0 ? (
          <div> No orders have been made </div>
        ) : (
          <Col>
            <Row className="site-layout-background admin-dashboard-status-row">
              <Col style={{ marginLeft: "15px" }} span={3}>
                ORDER ID
              </Col>
              <Col span={5}>ORDERED DATE</Col>
              <Col span={7}>DETAIL</Col>
              <Col span={3}>TOTAL</Col>
              <Col span={3}>STATUS</Col>
              <Col span={2}></Col>
            </Row>
            <Divider />

            {orders.map((order, idx) => {
              return (
                <Row
                  className="site-layout-background admin-dashboard-order-row"
                  style={{ backgroundColor: idx % 2 == 1 ? "#f6f6f6" : "none" }}
                >
                  <Col style={{ marginLeft: "15px" }} span={3}>
                    {order._id.slice(-7).toUpperCase()}
                  </Col>
                  <Col span={5}>{order.createdAt}</Col>
                  <Col span={7}>{order.products[0].product.name}</Col>
                  <Col span={3}>${order.totalPrice.toFixed(2)}</Col>
                  <Col span={3}>
                    <Tag
                      color={
                        order.status == "Pending"
                          ? "#fbba4e"
                          : order.status == "Completed"
                          ? "#82bf11"
                          : "#f05d62    "
                      }
                    >
                      {order.status}
                    </Tag>
                  </Col>
                  <Col span={2}>
                    <Dropdown overlay={menu}>
                      <Button type="text">
                        Action <DownOutlined />
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
              );
            })}
          </Col>
        )}
      </Content>
    </Layout>
  );
};

export default AdminOrdersPage;
