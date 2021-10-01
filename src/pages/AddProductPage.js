import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Input,
  Select,
  Form,
  Breadcrumb,
} from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import AdminInfo from "../components/AdminInfo";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import productActions from "../redux/actions/products.actions";
import formatUtils from "../utils/formatUtils";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
// const myWidget = window.cloudinary.createUploadWidget(
//   {
//     cloudName: "chuong-nguyen",
//     uploadPreset: "dsv_intern",
//     cropping: true,
//   },
//   (error, result) => {
//     if (!error && result && result.event === "success") {
//       console.log("Done! Here is the image info: ", result.info);
//       console.log(result.info.url);
//     }
//   }
// );
const AddProductPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const [form] = Form.useForm();
  const [imgUrls, setImgUrls] = useState(["", "", "", ""]);
  const [deleteTokens, setDeleteTokens] = useState(["", "", "", ""]);
  const handleUploadImg = (idx) => {
    formatUtils.uploadImage(
      imgUrls,
      setImgUrls,
      idx,
      deleteTokens,
      setDeleteTokens
    );
  };
  const handleDeleteImg = (idx) => {
    formatUtils.deleteImage(deleteTokens[idx]);
    const newUrls = [...imgUrls];
    newUrls[idx] = "";
    setImgUrls(newUrls);
  };
  const onFinish = (values) => {
    const urls = imgUrls.filter((url) => url !== "");
    values.imgURL = urls;
    dispatch(productActions.addProduct(values));
    form.resetFields();
    setImgUrls(["", "", "", ""]);
  };
  const onReset = () => {
    form.resetFields();
    for (const token of deleteTokens) {
      if (token !== "") formatUtils.deleteImage(token);
    }
    setImgUrls(["", "", "", ""]);
  };
  useEffect(() => {
    dispatch(productActions.getCategories());
  }, [dispatch, imgUrls]);

  const categoriesSelect = [];
  const brandSelect = [];
  const sizeSelect = [];
  const colorSelect = [];
  const genderSelect = [];
  const brands = ["Gucci", "BOSS", "Dior", "Lacoste", "Prada", "LV"];
  const colors = [
    "Black",
    "Blue",
    "Coal",
    "Grey",
    "White",
    "Red",
    "Pink",
    "Brown",
    "Green",
    "Other",
  ];
  const sizes = ["S", "M", "L"];
  const genders = ["Men", "Women", "Boys", "Girls"];
  for (const category of categories) {
    categoriesSelect.push(<Option key={category.name}>{category.name}</Option>);
  }
  for (const brand of brands) {
    brandSelect.push(<Option key={brand}>{brand}</Option>);
  }
  for (const size of sizes) {
    sizeSelect.push(<Option key={size.toLowerCase()}>{size}</Option>);
  }
  for (const gender of genders) {
    genderSelect.push(<Option key={gender.toLowerCase()}>{gender}</Option>);
  }
  for (const color of colors) {
    colorSelect.push(<Option key={color}>{color}</Option>);
  }
  return (
    <Layout className="site-layout admin-dashboard-layout">
      <Header className="site-layout-background admin-dashboard-header">
        <Row className="admin-dashboard-toprow">
          <div
            style={{ fontSize: "28px", fontWeight: "bold", marginTop: "20px" }}
          >
            Add product
          </div>
          <AdminInfo />
        </Row>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/admin/dashboard/products">Products</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/admin/dashboard/products/add">Add product</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </Header>
      <Content className="admin-dashboard-add-products-content">
        <Form
          id="add-product-form"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          requiredMark={false}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{ span: 20 }}
          colon={false}
        >
          <Row style={{ marginBottom: "24px", flexFlow: "row" }}>
            <Col
              span={4}
              style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "bold",
                paddingRight: "10px",
              }}
            >
              <div>PHOTOS</div>
            </Col>
            <Col
              span={20}
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "10px",
              }}
            >
              {imgUrls.map((img, idx) => {
                return (
                  <>
                    {img === "" ? (
                      <div
                        style={{
                          height: "270px",
                          width: "12vw",
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                          position: "relative",
                        }}
                      >
                        <Button
                          onClick={() => {
                            handleUploadImg(idx);
                          }}
                          type="text"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <PlusCircleOutlined />
                          <div>Add Photo</div>
                        </Button>
                      </div>
                    ) : (
                      <div style={{ position: "relative", width: "12vw" }}>
                        <img
                          height="270px"
                          width="100%"
                          alt="img"
                          src={img}
                          style={{ objectFit: "cover" }}
                        />
                        <Button
                          type="text"
                          icon={<CloseOutlined />}
                          onClick={() => {
                            handleDeleteImg(idx);
                          }}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </Col>
          </Row>
          <Row
            style={{
              marginBottom: "24px",
              flexFlow: "row",
              paddingLeft: "10px",
              color: "#acacac",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <Col offset={4}>
              You can add up to 4 photos. The 1st photo will be set as cover
              (main photo).
            </Col>
          </Row>
          <Form.Item name="name" label="NAME">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="CATEGORIES">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select categories"
              showArrow
            >
              {categoriesSelect}
            </Select>
          </Form.Item>
          <Form.Item name="gender" label="GENDER">
            <Select
              style={{ width: "100%" }}
              placeholder="Select gender"
              showArrow
            >
              {genderSelect}
            </Select>
          </Form.Item>
          <Form.Item name="brand" label="BRAND">
            <Select
              style={{ width: "100%" }}
              placeholder="Select brand"
              showArrow
            >
              {brandSelect}
            </Select>
          </Form.Item>

          <Form.Item name="price" label="PRICE ($)">
            <Input />
          </Form.Item>
          <Form.Item name="size" label="SIZE">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select size"
              showArrow
            >
              {sizeSelect}
            </Select>
          </Form.Item>
          <Form.Item name="color" label="COLORS">
            <Select
              style={{ width: "100%" }}
              placeholder="Select color"
              showArrow
            >
              {colorSelect}
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="QUANTITY">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="DESCRIPTION">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 10, offset: 14 }}
            style={{ justifyContent: "end" }}
          >
            <Row style={{ width: "100%", justifyContent: "end" }}>
              <Button
                htmlType="button"
                onClick={onReset}
                style={{ marginRight: "20px", width: "12vw", height: "48px" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "12vw", height: "48px" }}
              >
                Complete
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default AddProductPage;
