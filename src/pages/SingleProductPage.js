import { Button, Col, Image, Radio, Rate, Row, Layout, Divider } from "antd";
import { Content } from "antd/lib/layout/layout";
import { QuantityPicker } from "react-qty-picker";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { ClipLoader } from "react-spinners";
import productsAction from "../redux/actions/products.actions";
import cartActions from "../redux/actions/cart.actions";
import BreadCrumb from "../components/BreadCrumb";
const SingleProductPage = () => {
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [size, setSize] = useState();
  const params = useParams();
  const id = params.id;
  const handleSize = (size) => {
    setSize(size);
  };
  const getSelectedValue = (value) => {
    setSelectedQuantity(value);
  };
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const product = useSelector(
    (state) => state.products.selectedProduct.product
  );
  const quantity = useSelector(
    (state) => state.products.selectedProduct.quantity
  );

  const handleAddToCart = () => {
    const addedProduct = {
      id: product._id,
      name: product.name,
      quantity: selectedQuantity,
      size: size,
      price: product.price,
      imgURL: product.imgURL[0],
      color: product.color,
      maxQuantity: currentQuantity,
      totalPrice: (product.price * selectedQuantity).toFixed(2),
    };
    dispatch(cartActions.addToCart(addedProduct));
  };
  useEffect(() => {
    dispatch(productsAction.getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (size) {
      setCurrentQuantity(product.size[size]);
    } else {
      setCurrentQuantity(quantity);
    }
  }, [quantity, size, product.size]);
  return (
    <Layout className="single-product-content">
      <BreadCrumb id={product._id} name={product.name} />
      {loading || Object.keys(product).length === 0 ? (
        <ClipLoader />
      ) : (
        <Content>
          <Row className="single-product-row">
            <Col span={2}></Col>

            <Col className="single-product-col" span={2}>
              {product.imgURL.map((img) => {
                return (
                  <Row>
                    <img
                      alt="product"
                      src={img}
                      height="120px"
                      className="single-product-side-img"
                    ></img>
                  </Row>
                );
              })}
            </Col>
            <Col span={7}>
              <Image
                alt="product"
                src={product.imgURL.at(0)}
                className="single-product-img"
                height="537px"
              />
            </Col>
            <Col className="single-product-info" span={9}>
              <div>
                <div className="single-product-title"> {product.name}</div>
                <div className="single-product-price">
                  {" "}
                  ${product.price.toFixed(2)}
                </div>
                <div>
                  <em>In stock: {currentQuantity}</em>{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    margin: "13px 0 25px 0px",
                    alignItems: "center",
                  }}
                >
                  <Rate
                    allowHalf
                    count={5}
                    value={rating}
                    onChange={changeRating}
                  />
                  <Divider
                    type="vertical"
                    style={{ height: "20px", margin: "0 10px" }}
                  />
                  <div>Review</div>
                </div>
                <div>
                  <div className="single-product-headline"> Size </div>

                  <Radio.Group
                    defaultValue={size}
                    buttonStyle="solid"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "150px",
                    }}
                  >
                    <Radio.Button
                      value="s"
                      className="single-product-sizebtn"
                      disabled={product.size.s === 0 ? true : false}
                      onClick={() => {
                        handleSize("s");
                      }}
                    >
                      S
                    </Radio.Button>
                    <Radio.Button
                      className="single-product-sizebtn"
                      value="m"
                      disabled={product.size.m === 0 ? true : false}
                      // disabled={availableSize.includes("m") ? false : true}
                      onClick={() => {
                        handleSize("m");
                      }}
                    >
                      M
                    </Radio.Button>
                    <Radio.Button
                      className="single-product-sizebtn"
                      value="l"
                      disabled={product.size.l === 0 ? true : false}
                      // disabled={availableSize.includes("l") ? false : true}
                      onClick={() => {
                        handleSize("l");
                      }}
                    >
                      L
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                  <div className="single-product-headline"> Color </div>
                  <Row
                    style={{
                      justifyContent: "start",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      className="circle"
                      style={{ backgroundColor: "red", marginRight: "20px" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ backgroundColor: "blue", marginRight: "20px" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ backgroundColor: "purple", marginRight: "20px" }}
                    ></div>
                  </Row>
                </div>
                <div
                  className="flex-align-center flex-justify-between"
                  style={{
                    width: "200px",
                    marginTop: "30px",
                    marginBottom: "30px",
                  }}
                >
                  <div
                    className="single-product-headline"
                    style={{ marginRight: "20px" }}
                  >
                    Quantity
                  </div>
                  <QuantityPicker
                    min={0}
                    max={product.size[size]}
                    onChange={getSelectedValue}
                  />
                </div>
                <Button
                  type="primary"
                  className="single-product-add-btn"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </div>
            </Col>
          </Row>
        </Content>
      )}
    </Layout>
  );
};

export default SingleProductPage;
