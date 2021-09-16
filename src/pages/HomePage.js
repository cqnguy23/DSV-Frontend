import { Button, Col, Layout, Row, Divider } from "antd";
import React from "react";
import { useHistory } from "react-router";
import cover from "../image/cover1.jpeg";
import menImg from "../image/men.jpeg";
import womenImg from "../image/women.jpeg";
import girlsImg from "../image/girls.jpg";
import boysImg from "../image/boys.jpeg";
const HomePage = () => {
  const history = useHistory();

  const onClick = (gender) => {
    history.push("/products/gender/" + gender);
  };
  return (
    <Layout className="homepage-layout">
      <Row className="position-relative">
        <img alt="cover" width="100%" height="100%" src={cover} />
        <div className="top-right">OUTFIT OF THE WEEK</div>
        <Button
          type="primary"
          className="bottom-right"
          onClick={() => {
            onClick("women");
          }}
        >
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
        <Col className="position-relative width-24">
          <img alt="men" width="100%" height="100%" src={menImg} />
          <div className="bottom-centered">
            <div>Men</div>
            <Divider style={{ margin: "5px", color: "white" }} />
            <Button
              type="primary"
              onClick={() => {
                onClick("men");
              }}
            >
              Shop now
            </Button>
          </div>
        </Col>
        <Col className="position-relative width-24">
          <img alt="woman" width="100%" height="100%" src={womenImg} />
          <div className="bottom-centered">
            <div>Women</div>
            <Divider style={{ margin: "5px", color: "white" }} />
            <Button
              type="primary"
              onClick={() => {
                onClick("women");
              }}
            >
              Shop now
            </Button>
          </div>
        </Col>
        <Col className="position-relative width-24">
          <img alt="woman" width="100%" height="100%" src={boysImg} />
          <div className="bottom-centered">
            <div>Boys</div>
            <Divider style={{ margin: "5px", color: "white" }} />
            <Button
              type="primary"
              onClick={() => {
                onClick("boys");
              }}
            >
              Shop now
            </Button>
          </div>
        </Col>
        <Col className="position-relative width-24">
          <img alt="woman" width="100%" height="100%" src={girlsImg} />
          <div className="bottom-centered">
            <div>Girls</div>
            <Divider style={{ margin: "5px", color: "white" }} />
            <Button
              type="primary"
              onClick={() => {
                onClick("girls");
              }}
            >
              Girls
            </Button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;
