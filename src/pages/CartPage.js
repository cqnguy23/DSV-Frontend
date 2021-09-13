import { Button, Col, Divider, Image, Layout, Row } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { QuantityPicker } from "react-qty-picker";

import React from "react";

const CartPage = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  console.log(cartProducts);
  return (
    <Layout>
      <Content className="bg-white">
        <Row className="cart-header">My Bag</Row>
        {cartProducts.length == 0 ? (
          <div>Please select a product to proceed!</div>
        ) : (
          <Row>
            <Col span={19}>
              <Row style={{ fontWeight: "bolder" }}>
                <Col span={8}>Product</Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  Color
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  Size
                </Col>
                <Col span={6} style={{ textAlign: "center" }}>
                  Quantity
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  Amount
                </Col>
              </Row>
              {cartProducts.map((product, idx) => {
                return (
                  <>
                    <Divider style={{ margin: "10px" }} />
                    <Row key={idx} className="card-row">
                      <Col span={8}>
                        <Row style={{ flexWrap: "nowrap" }}>
                          <Col>
                            <Image src={product.imgURL} height="115px" />
                          </Col>
                          <Col offset={1} className="card-col">
                            <Row className="cart-title">{product.name}</Row>
                            <Row className="cart-buttons">
                              <Button type="text" size="small">
                                Change
                              </Button>
                              {"|"}
                              <Button type="text" size="small">
                                Remove
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={3} className="cart-color">
                        <div
                          class="circle"
                          style={{ backgroundColor: `${product.color}` }}
                        ></div>
                      </Col>
                      <Col span={3} className="cart-size">
                        {product.size.toUpperCase()}
                      </Col>
                      <Col span={6} className="cart-quantity">
                        <QuantityPicker
                          smooth
                          min={0}
                          max={product.maxQuantity}
                          value={product.quantity}
                        />
                      </Col>
                      <Col span={4} className="cart-amount">
                        ${product.price}
                      </Col>
                    </Row>
                  </>
                );
              })}
            </Col>
            <Col offset={1} span={4}>
              <Row className="total-title"> Total </Row>
              <div>
                <Row className="flex-justify-between">
                  <Col>Shipping & Handling:</Col>
                  <Col>Free</Col>
                </Row>
                <Row className="flex-justify-between">
                  <Col>Total Product:</Col>
                  <Col>$1000</Col>
                </Row>
                <Divider />
                <Row className="flex-justify-between">
                  <Col className="total-title">Subtotal:</Col>
                  <Col>$1000</Col>
                </Row>
              </div>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default CartPage;
