import { Affix, Button, Col, Divider, Image, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { QuantityPicker } from "react-qty-picker";

import React from "react";
import cartActions from "../redux/actions/cart.actions";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const loading = useSelector((state) => state.cart.loading);
  const handleDeleteItem = (productID, size) => {
    dispatch(cartActions.removeItem(productID, size));
  };
  const handleQuantityPicker = (value, id, size) => {
    dispatch(cartActions.updateItem(id, value, size));
  };
  const handleSubmitOrder = () => {
    dispatch(cartActions.submitOrder(cartProducts, totalAmount));
  };

  return (
    <Layout style={{ minHeight: "450px" }}>
      <Content className="bg-white">
        <Row className="cart-header">My Cart</Row>
        {cartProducts.length === 0 ? (
          <div style={{ fontSize: "16px" }}>
            Please select a product to proceed!
          </div>
        ) : (
          <Row className="cart-page-products-row">
            <Col span={16}>
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
                    <Divider style={{ margin: "10px 0px" }} />
                    <Row className="card-row">
                      <Col span={8}>
                        <Row style={{ flexWrap: "nowrap" }}>
                          <Col>
                            <Image
                              src={product.imgURL}
                              height="115px"
                              width="80px"
                            />
                          </Col>
                          <Col offset={1} className="card-col">
                            <Row className="cart-title">{product.name}</Row>
                            <Row className="cart-buttons">
                              <Button
                                type="text"
                                size="small"
                                onClick={() => {
                                  handleDeleteItem(product.id, product.size);
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
                          min={1}
                          width={"30p x"}
                          max={product.maxQuantity}
                          value={product.quantity}
                          onChange={(value) => {
                            handleQuantityPicker(
                              value,
                              product.id,
                              product.size
                            );
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
            <Col offset={1} span={7}>
              <Affix offsetTop={10}>
                <Row className="total-title"> Total </Row>
                <div className="cart-total-div">
                  <Row className="flex-justify-between">
                    <Col>Shipping & Handling:</Col>
                    <Col>Free</Col>
                  </Row>
                  <Row className="flex-justify-between mb-15">
                    <Col>Total Product:</Col>
                    <Col>${totalAmount}</Col>
                  </Row>
                  <Divider />
                  <Row className="flex-justify-between total-title">
                    <Col>Subtotal</Col>
                    <Col>${totalAmount}</Col>
                  </Row>
                </div>
                <Row>
                  <Button
                    className="checkout-btn"
                    type="primary"
                    loading={loading}
                    onClick={handleSubmitOrder}
                  >
                    Checkout{" "}
                  </Button>
                </Row>
              </Affix>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default CartPage;
