import { Button, Col, Layout, Row, Divider } from "antd";
import React from "react";
import { useHistory } from "react-router";
import cover from "../image/cover1.jpeg";
import menImg from "../image/men.jpeg";
import womenImg from "../image/women.jpeg";
const HomePage = () => {
  const history = useHistory();
  const onMenClick = () => {
    history.push("/products/category/men");
  };
  const onWomenClick = () => {
    history.push("/products/category/women");
  };
  return (
    <Layout className="homepage-layout">
      <Row className="position-relative">
        <img alt="cover" width="100%" height="100%" src={cover} />
        <div className="top-right">OUTFIT OF THE WEEK</div>
        <Button type="primary" className="bottom-right" onClick={onWomenClick}>
          Shop Now
        </Button>
      </Row>
      <Row
        style={{
          height: "40%",
          justifyContent: "space-between",
          marginBottom: "0",
          marginTop: "10px",
        }}
      >
        <Col className="position-relative width-49">
          <img alt="men" width="100%" height="100%" src={menImg} />
          <div className="bottom-centered">
            <div>Men</div>
            <Divider style={{ margin: "5px", color: "white" }} />
            <Button type="primary" onClick={onMenClick}>
              Shop now
            </Button>
          </div>
        </Col>
        <Col></Col>
        <Col className="position-relative width-49">
          <img alt="woman" width="100%" height="100%" src={womenImg} />
          <div className="bottom-centered">
            <div>Women</div>
            <Divider style={{ margin: "5px", color: "white" }} />
            <Button type="primary" onClick={onWomenClick}>
              Shop now
            </Button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;
