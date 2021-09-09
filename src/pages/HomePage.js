import { Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import cover from "../image/cover1.jpeg";
import menImg from "../image/men.jpeg";
const HomePage = () => {
  return (
    <Layout className="homepage-layout">
      <Row>
        <img alt="cover" width="100%" height="100%" src={cover}></img>
      </Row>
      <Row
        style={{
          height: "40%",
          justifyContent: "space-between",
          marginBottom: "0",
          marginTop: "10px",
        }}
      >
        <Col span={5}>
          <img alt="men" width="100%" height="80%%" src={menImg}></img>
        </Col>
        <Col span={5}>
          <img alt="woman" width="100%" height="80%%" src={menImg}></img>
        </Col>
        <Col span={5}>
          <img alt="girls" width="100%" height="80%%" src={menImg}></img>
        </Col>
        <Col span={5}>
          <img alt="boys" width="100%" height="80%%" src={menImg}></img>
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;
