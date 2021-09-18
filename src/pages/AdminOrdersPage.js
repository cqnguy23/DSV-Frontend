import {
  Layout,
  Row,
  Col,
  Divider,
  Tag,
  Dropdown,
  Menu,
  Button,
  DatePicker,
  Pagination,
} from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import userActions from "../redux/actions/user.actions";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import orderActions from "../redux/actions/order.actions";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import {
  DownOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import AdminInfo from "../components/AdminInfo";
const AdminOrdersPage = () => {
  let orders = useSelector((state) => state.order.orders);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  let loading = useSelector((state) => state.order.loading);
  const { RangePicker } = DatePicker;
  const limit = 10;
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getOrders(page, limit));
  }, [dispatch, page]);
  console.log(orders);
  const handleEditOrderStatus = (id, status) => {
    dispatch(orderActions.updateOrder(id, status));
  };

  function handleDateRangeChange(dates, dateStrings) {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log(typeof dates[0]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  }
  if (orders.length !== 0) {
    orders = orders.map((order) => {
      const date = moment(order.createdAt).calendar(null, {
        sameDay: "[Today], Do MMM, YYYY",
        lastDay: "[Yesterday], Do MMM, YYYY",
        sameElse: "dddd,Do MMM, YYYY",
      });
      return { ...order, createdAt: date };
    });
  }

  return (
    <Layout className="site-layout admin-dashboard-layout">
      <Header className="site-layout-background admin-dashboard-header">
        <Row className="admin-dashboard-toprow">
          <h1>Orders</h1>
          <AdminInfo />
        </Row>
        <Row className="admin-date-picker">
          <div
            style={{
              marginRight: "20px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            ORDERED DATE{" "}
          </div>
          <RangePicker
            size="middle"
            style={{ height: "100%" }}
            onChange={handleDateRangeChange}
          />
          <Button className="admin-date-btn"> Today </Button>
          <Button className="admin-date-btn"> Yesterday </Button>
        </Row>
      </Header>
      <Content className="admin-dashboard-content">
        {loading ? (
          <ClipLoader />
        ) : orders.length === 0 ? (
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
                  style={{
                    backgroundColor: idx % 2 === 1 ? "#f6f6f6" : "none",
                  }}
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
                        order.status === "Pending"
                          ? "#fbba4e"
                          : order.status === "Completed"
                          ? "#82bf11"
                          : "#f05d62    "
                      }
                    >
                      {order.status}
                    </Tag>
                  </Col>
                  <Col span={2}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="1"
                            icon={
                              <CheckCircleFilled style={{ color: "#82bf11" }} />
                            }
                            onClick={() => {
                              handleEditOrderStatus(order._id, "completed");
                            }}
                          >
                            Mark as Completed
                          </Menu.Item>
                          <Menu.Item
                            key="2"
                            icon={
                              <CloseCircleFilled style={{ color: "#f05d62" }} />
                            }
                            onClick={() => {
                              handleEditOrderStatus(order._id, "cancelled");
                            }}
                          >
                            Mark as Cancelled
                          </Menu.Item>
                        </Menu>
                      }
                    >
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
        <div className="admin-dashboard-pagination">
          <Pagination
            current={page}
            onChange={handlePageChange}
            pageSize={limit}
            total={totalOrders}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default AdminOrdersPage;
