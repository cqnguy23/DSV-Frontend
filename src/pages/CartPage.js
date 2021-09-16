import { Button, Col, Divider, Image, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { QuantityPicker } from "react-qty-picker";

import React from "react";
import cartActions from "../redux/actions/cart.actions";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const handleDeleteItem = (productID) => {
    dispatch(cartActions.removeItem(productID));
  };
  const handleQuantityPicker = (value, id) => {
    dispatch(cartActions.updateItem(id, value));
  };
  const handleSubmitOrder = () => {
    dispatch(cartActions.submitOrder(cartProducts, totalAmount));
  };

  return (
    <Layout>
      <Content className="bg-white">
        <Row className="cart-header">My Bag</Row>
        {cartProducts.length === 0 ? (
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
                  <div key={idx}>
                    <Divider style={{ margin: "10px" }} />
                    <Row className="card-row">
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
                              <Button
                                type="text"
                                size="small"
                                onClick={() => {
                                  handleDeleteItem(product.id);
                                }}
                              >
                                Remove
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={3} className="cart-color">
                        <div
                          className="circle"
                          style={
                            product.color === "Other" ||
                            product.color === "Coal"
                              ? {
                                  backgroundImage:
                                    "linear-gradient(red, yellow, green)",
                                }
                              : product.color === "White"
                              ? { backgroundColor: "grey" }
                              : { backgroundColor: `${product.color}` }
                          }
                        ></div>
                      </Col>
                      <Col span={3} className="cart-size">
                        {product.size.toUpperCase()}
                      </Col>
                      <Col span={6} className="cart-quantity">
                        <QuantityPicker
                          smooth
                          min={1}
                          max={product.maxQuantity}
                          value={product.quantity}
                          onChange={(value) => {
                            handleQuantityPicker(value, product.id);
                          }}
                        />
                      </Col>
                      <Col span={4} className="cart-amount">
                        ${product.totalPrice}
                      </Col>
                    </Row>
                  </div>
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
                  <Col>${totalAmount}</Col>
                </Row>
                <Divider />
                <Row className="flex-justify-between">
                  <Col className="total-title">Subtotal:</Col>
                  <Col>${totalAmount}</Col>
                </Row>
              </div>
              <Row>
                <Button type="primary" onClick={handleSubmitOrder}>
                  {" "}
                  Checkout{" "}
                </Button>
              </Row>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default CartPage;
