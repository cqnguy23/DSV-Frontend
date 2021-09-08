import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Divider, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import icon from "../image/logo.png";

const FooterComponent = () => {
  return (
    <Layout className="footer-layout">
      <Content>
        <Row className="footer-row first-row">
          <Col span={2}>
            <img alt="icon" src={icon} style={{ height: "20px" }} />
          </Col>
          <Col span={10} className="footer-links-group">
            <a href="/#">Home</a>
            <a href="/#">Products</a>
            <a href="/#">Services</a>
            <a href="/#">About Us</a>
            <a href="/#">Help</a>
            <a href="/#">Contacts</a>
          </Col>
          <Col span={2} className="footer-social-group">
            <TwitterOutlined />
            <FacebookFilled />
            <InstagramOutlined />
          </Col>
        </Row>
        <Divider style={{ margin: "0px" }} />
        <Row className="footer-row second-row">
          <Col span={8} className="footer-links-group">
            <a href="/#">Home</a>
            <a href="/#">Products</a>
            <a href="/#">Services</a>
            <a href="/#">About Us</a>
            <a href="/#">Help</a>
            <a href="/#">Contacts</a>
          </Col>
          <Col span={10}></Col>
          <Col span={6} className="footer-links-group">
            <a href="/#">Privacy Policy</a>
            <a href="/#">Terms & Conditions</a>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default FooterComponent;
