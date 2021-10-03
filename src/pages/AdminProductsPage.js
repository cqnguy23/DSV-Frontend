import {
  DeleteFilled,
  DownOutlined,
  EditFilled,
  ExportOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import api from "../api";

import {
  Layout,
  Row,
  Col,
  Divider,
  Dropdown,
  Menu,
  Button,
  Pagination,
  Input,
  Popconfirm,
  Popover,
  Form,
} from "antd";
import { ClipLoader } from "react-spinners";
import { CSVLink } from "react-csv";

import { Content, Header } from "antd/lib/layout/layout";

import React, { useEffect, useState, useRef } from "react";
import AdminInfo from "../components/AdminInfo";
import productActions from "../redux/actions/products.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import formatUtils from "../utils/formatUtils";
import { useHistory } from "react-router";
import UploadButton from "../components/UploadButton";

const AdminProductsPage = () => {
  const [limit, setLimit] = useState(10);
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("addedDate");
  const [searchKey, setSearchKey] = useState("");
  const totalProducts = useSelector((state) => state.products.total);
  const csvLink = useRef();
  const [csvProductsData, setCsvProductsData] = useState([]);
  const headers = [
    { label: "Product ID", key: "id" },
    { label: "Product Name", key: "name" },
    { label: "Quantity (S)", key: "s" },
    { label: "Quantity (M)", key: "m" },
    { label: "Quantity (L)", key: "l" },
    { label: "Sold", key: "sold" },
    { label: "Price", key: "price" },
    { label: "Profit earned", key: "profit" },
    { label: "Date Created", key: "dateCreated" },
  ];
  const handlePageChange = (page) => {
    setPage(page);
  };
  const toAddProduct = () => {
    history.push("/admin/dashboard/products/add");
  };
  const handleEditProduct = (id, size) => {
    const convertedSize = {
      s: parseInt(size.s),
      m: parseInt(size.m),
      l: parseInt(size.l),
    };
    dispatch(productActions.editProduct(id, convertedSize));
  };
  const handleDeleteProduct = (id) => {
    dispatch(productActions.deleteProduct(id));
  };
  const handleLimitChange = (current, pageSize) => {
    setLimit(pageSize);
  };
  const sortButtonMap = {
    addedDate: "Date added",
    alpha: "A - Z",
    reverseAlpha: "Z - A",
  };
  const content = (id, initialValues) => (
    <Form
      labelCol={{ span: 4 }}
      name="basic"
      onFinish={(values) => {
        handleEditProduct(id, values);
      }}
    >
      <Form.Item
        label="S"
        name="s"
        initialValue={initialValues.s}
        rules={[{ required: true, message: "Please input a number" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="M"
        name="m"
        initialValue={initialValues.m}
        rules={[{ required: true, message: "Please input a number" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="L"
        name="l"
        initialValue={initialValues.l}
        rules={[{ required: true, message: "Please input a number" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          style={{ width: "100%", textAlign: "left" }}
          type="text"
          onClick={() => {
            handleSort("addedDate");
          }}
        >
          Date added
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          style={{ width: "100%", textAlign: "left" }}
          type="text"
          onClick={() => {
            handleSort("alpha");
          }}
        >
          A - Z
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          style={{ width: "100%", textAlign: "left" }}
          type="text"
          onClick={() => {
            handleSort("reverseAlpha");
          }}
        >
          Z - A
        </Button>
      </Menu.Item>
    </Menu>
  );
  const handleSearch = (e) => {
    setPage(1);
    setSearchKey(e.target.value);
  };
  const handleSort = (type) => {
    setSortType(type); //3 types: date, az, za
  };
  useEffect(() => {
    dispatch(
      productActions.getProducts({
        role: "admin",
        page,
        limit,
        sortType,
        searchKey,
      })
    );
  }, [dispatch, page, limit, sortType, searchKey]);

  const handleExportProducts = async () => {
    try {
      let url = "/products/admin/all";

      const resp = await api.get(url);
      const exportedProducts = await resp.data;
      const csvData = exportedProducts.map((product) => {
        return {
          id: product._id,
          name: product.name,
          s: product.size.s,
          m: product.size.m,
          l: product.size.l,
          sold: product.sold,
          price: product.price,
          profit: (product.price * product.sold).toFixed(2),
          dateCreated: product.createdAt,
        };
      });
      setCsvProductsData(csvData);
      csvLink.current.link.click();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout className="site-layout admin-dashboard-layout">
      <Header className="site-layout-background admin-dashboard-header">
        <Row className="admin-dashboard-toprow">
          <h1>Products</h1>
          <AdminInfo />
        </Row>
        <Row className="admin-date-picker" style={{ alignItems: "center" }}>
          <div
            style={{
              marginRight: "20px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            SORT BY{" "}
          </div>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button className="admin-dashboard-products-sortBtn">
              {sortButtonMap[sortType]} <DownOutlined />
            </Button>
          </Dropdown>
          <Row style={{ marginRight: "0", marginLeft: "auto", height: "48px" }}>
            <Input
              placeholder="Search product"
              prefix={<SearchOutlined />}
              style={{
                height: "100%",
                lineHeight: "inherit",
                width: "200px",
                marginRight: "20px",
              }}
              onChange={handleSearch}
            />
            <Button
              icon={<PlusOutlined />}
              type="primary"
              style={{ height: "100%", width: "160px", marginRight: "20px" }}
              onClick={toAddProduct}
            >
              Add Product
            </Button>
            <Button
              icon={<ExportOutlined />}
              style={{ height: "100%", width: "100px" }}
              onClick={handleExportProducts}
            >
              Export
            </Button>
            <CSVLink
              data={csvProductsData}
              headers={headers}
              filename="products.csv"
              className="hidden"
              ref={csvLink}
              target="_blank"
            />
            <UploadButton />
          </Row>
        </Row>
      </Header>
      <Content className="admin-dashboard-products-content">
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
        ) : products.length === 0 ? (
          <div> No orders have been made </div>
        ) : (
          <Col style={{ minHeight: "600px" }}>
            <Row className="site-layout-background admin-dashboard-status-row">
              <Col style={{ marginLeft: "15px" }} span={8}>
                PRODUCTS
              </Col>
              <Col span={3}>SOLD</Col>
              <Col span={6}>DATE ADDED</Col>
              <Col span={4}>PROFITS</Col>
              <Col span={2}></Col>
            </Row>
            <Divider />

            {products.map((product, idx) => {
              return (
                <Row
                  className="site-layout-background admin-dashboard-products-row"
                  style={{
                    backgroundColor: idx % 2 === 1 ? "#f6f6f6" : "none",
                  }}
                  key={idx}
                >
                  <Col style={{ marginLeft: "15px" }} span={8}>
                    <Row>
                      <Col style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={product.imgURL[0]}
                          width="30px"
                          height="40px"
                          alt="product"
                        />
                      </Col>
                      <Col style={{ marginLeft: "15px", maxWidth: "280px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>
                          {product.name}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#acacac",
                          }}
                        >
                          {formatUtils.capitalizeFirstLetter(product.gender)},{" "}
                          {product.category[0].name}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={3}>
                    {product.sold}/
                    {product.size.s +
                      product.size.m +
                      product.size.l +
                      product.sold}
                  </Col>
                  <Col span={6}>
                    {formatUtils.convertToCalendarDate(product.createdAt)}
                  </Col>
                  <Col span={4}>
                    ${(product.price * product.sold).toFixed(2)}
                  </Col>

                  <Col span={2}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="1"
                            icon={<EditFilled style={{ color: "#82bf11" }} />}
                            onClick={() => {}}
                          >
                            <Popover
                              content={content(product._id, product.size)}
                              title="Edit quantity for each size:"
                              trigger="click"
                            >
                              Edit
                            </Popover>
                          </Menu.Item>
                          <Menu.Item
                            key="2"
                            icon={<DeleteFilled style={{ color: "#f05d62" }} />}
                          >
                            <Popconfirm
                              title="Are you sure you want to delete this item?"
                              onConfirm={() => {
                                handleDeleteProduct(product._id);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              Remove
                            </Popconfirm>
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
            Showing {(page - 1) * limit + 1} to {limit * page} of{" "}
            {totalProducts} entries
          </div>
          <Pagination
            current={page}
            onChange={handlePageChange}
            pageSize={limit}
            onShowSizeChange={handleLimitChange}
            total={totalProducts}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default AdminProductsPage;
