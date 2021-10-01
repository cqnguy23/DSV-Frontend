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
  Input,
} from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import orderActions from "../redux/actions/order.actions";
import { ClipLoader } from "react-spinners";
import {
  DownOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  SearchOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import AdminInfo from "../components/AdminInfo";
import { CSVLink } from "react-csv";

import api from "../api";
const AdminOrdersPage = () => {
  let orders = useSelector((state) => state.order.orders);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  let loading = useSelector((state) => state.order.loading);
  const { RangePicker } = DatePicker;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [csvOrdersData, setCsvOrdersData] = useState([]);
  const csvLink = useRef();
  const headers = [
    { label: "Order ID", key: "id" },
    { label: "Detail", key: "product" },
    { label: "Date Created", key: "dateCreated" },
    { label: "Subtotal", key: "subtotal" },
    { label: "Status", key: "status" },
  ];
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleLimitChange = (current, pageSize) => {
    setLimit(pageSize);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (dateRange.length === 0) {
      dispatch(orderActions.getOrders({ page, limit, search: searchKey }));
    } else {
      dispatch(
        orderActions.getOrders({
          page,
          limit,
          startDate: dateRange[0].format(),
          endDate: dateRange[1].format(),
          search: searchKey,
        })
      );
    }
  }, [dispatch, page, dateRange, limit, searchKey]);
  const handleEditOrderStatus = (id, status) => {
    dispatch(orderActions.updateOrder(id, status));
  };
  const handleSearch = (e) => {
    setPage(1);
    setSearchKey(e.target.value);
  };
  const handleDateRangeChange = (dates, dateStrings) => {
    if (!dates) {
      setDateRange([]);
    } else {
      const startDate = dates[0].utc();
      const endDate = dates[1].utc();
      setPage(1);
      setDateRange([startDate, endDate]);
    }
  };
  const handleFilteredByDate = (date) => {
    let pickedDate;
    if (date.toLowerCase() === "today") {
      pickedDate = moment().utc();
    } else if (date.toLowerCase() === "yesterday") {
      pickedDate = moment().subtract(1, "day").utc();
    }
    setPage(1);
    setDateRange([pickedDate, pickedDate]);
  };
  const handleExportOrders = async () => {
    try {
      let url = "/order/all";

      const resp = await api.get(url);
      const exportedOrders = await resp.data;
      const csvData = exportedOrders.map((order) => {
        return {
          id: order._id.slice(-7).toUpperCase(),
          product: order.products[0].product.name,
          dateCreated: order.createdAt,
          subtotal: order.totalPrice,
          status: order.status,
        };
      });
      setCsvOrdersData(csvData);
      csvLink.current.link.click();
    } catch (err) {
      console.log(err);
    }
  };
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
            allowClear="true"
            size="middle"
            style={{ height: "100%" }}
            value={dateRange}
            onChange={handleDateRangeChange}
          />
          <Button
            className="admin-date-btn"
            onClick={() => {
              handleFilteredByDate("today");
            }}
          >
            {" "}
            Today{" "}
          </Button>
          <Button
            className="admin-date-btn"
            onClick={() => {
              handleFilteredByDate("yesterday");
            }}
          >
            {" "}
            Yesterday{" "}
          </Button>
          <Row style={{ marginRight: "0", marginLeft: "auto", height: "48px" }}>
            <Input
              placeholder="Search order"
              prefix={<SearchOutlined />}
              style={{
                height: "100%",
                lineHeight: "inherit",
                width: "240px",
                marginRight: "20px",
              }}
              onChange={handleSearch}
            />

            <Button
              icon={<ExportOutlined />}
              style={{ height: "100%", width: "112px" }}
              onClick={handleExportOrders}
            >
              Export
            </Button>
            <CSVLink
              data={csvOrdersData}
              headers={headers}
              filename="orders.csv"
              ref={csvLink}
              target="_blank"
            />
          </Row>
        </Row>
      </Header>
      <Content className="admin-dashboard-content">
        {loading ? (
          <div
            style={{
              minHeight: "550px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ClipLoader />
          </div>
        ) : orders.length === 0 ? (
          <div style={{ minHeight: "550px", margin: "25px", fontSize: "16px" }}>
            {" "}
            No orders have been made{" "}
          </div>
        ) : (
          <Col style={{ minHeight: "550px" }}>
            <Row className="site-layout-background admin-dashboard-status-row">
              <Col style={{ marginLeft: "15px" }} span={3}>
                ORDER ID
              </Col>
              <Col span={5}>ORDERED DATE</Col>
              <Col span={7}>DETAIL</Col>
              <Col span={3}>TOTAL</Col>
              <Col span={3}>
                STATUS <DownOutlined />
              </Col>
              <Col span={2}></Col>
            </Row>
            <Divider />

            {orders.map((order, idx) => {
              return (
                <Row
                  key={idx}
                  className="site-layout-background admin-dashboard-order-row"
                  style={{
                    backgroundColor: idx % 2 === 1 ? "#f6f6f6" : "none",
                  }}
                >
                  <Col style={{ marginLeft: "15px" }} span={3}>
                    {order._id.slice(-7).toUpperCase()}
                  </Col>
                  <Col span={5}>{order.convertedDate}</Col>
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
                      style={{
                        width: "70px",
                        textAlign: "center",
                        borderRadius: "12px",
                        fontSize: "10px",
                        height: "20px",
                      }}
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
          <div>
            Showing {(page - 1) * limit + 1} to {limit * page} of {totalOrders}{" "}
            entries
          </div>
          <Pagination
            showSizeChanger
            current={page}
            onChange={handlePageChange}
            onShowSizeChange={handleLimitChange}
            pageSize={limit}
            total={totalOrders}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default AdminOrdersPage;
