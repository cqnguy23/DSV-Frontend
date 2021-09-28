import {
  Button,
  Col,
  Image,
  Radio,
  Rate,
  Row,
  Layout,
  Divider,
  Tooltip,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { QuantityPicker } from "react-qty-picker";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { ClipLoader } from "react-spinners";
import productsAction from "../redux/actions/products.actions";
import cartActions from "../redux/actions/cart.actions";
import BreadCrumb from "../components/BreadCrumb";
import Reviews from "../components/Reviews";
const SingleProductPage = () => {
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [sizeChosen, setSizeChosen] = useState(false);
  const [size, setSize] = useState();
  const params = useParams();
  const history = useHistory();
  const id = params.id;
  const reviews = useSelector(
    (state) => state.products.selectedProduct.product.reviewsID
  );
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();
  const product = useSelector(
    (state) => state.products.selectedProduct.product
  );
  const quantity = useSelector(
    (state) => state.products.selectedProduct.quantity
  );
  const rating = useSelector(
    (state) => state.products.selectedProduct.product.rating
  );
  const similarBrandProducts = useSelector(
    (state) => state.products.selectedProduct.similarBrandProducts
  );

  const handleSize = (size) => {
    setSizeChosen(true);
    setSize(size);
  };
  const getSelectedValue = (value) => {
    setSelectedQuantity(value);
  };
  // const changeRating = (newRating) => {
  //   setRating(newRating);
  // };
  const handleClickOnSimilarBrand = (gender, id) => {
    history.push(`/products/${gender}/${id}`);
  };
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
    <>
      <Layout className="single-product-content">
        <BreadCrumb id={product._id} name={product.name} />
        {loading || Object.keys(product).length === 0 ? (
          <ClipLoader />
        ) : (
          <>
            <Content>
              <Row className="single-product-row">
                <Col className="single-product-col" span={2}>
                  {product.imgURL.map((img, idx) => {
                    return (
                      <Row key={idx}>
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
                      <Rate allowHalf count={5} value={rating} disabled />

                      <Divider
                        type="vertical"
                        style={{ height: "20px", margin: "0 10px" }}
                      />
                      <div>
                        {reviews.length <= 1
                          ? `${reviews.length} review`
                          : `${reviews.length} reviews`}
                      </div>
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
                          style={
                            product.color === "Other"
                              ? {
                                  backgroundImage:
                                    "linear-gradient(red, yellow, green)",
                                  marginRight: "20px",
                                }
                              : {
                                  backgroundColor: product.color,
                                  marginRight: "20px",
                                }
                          }
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
                        value={1}
                        min={1}
                        max={product.size[size]}
                        onChange={getSelectedValue}
                      />
                    </div>
                    <Button
                      type="primary"
                      id="single-product-add-btn"
                      onClick={handleAddToCart}
                      disabled={!sizeChosen}
                    >
                      Add to cart
                    </Button>
                  </div>
                </Col>
                <Col offset={1} span={2}>
                  <Row style={{ fontSize: "14px", fontWeight: "500" }}>
                    More from
                  </Row>
                  <Row style={{ marginBottom: "20px" }}> {product.brand} </Row>
                  {similarBrandProducts.map((product, idx) => {
                    return (
                      <Row key={idx}>
                        <img
                          alt="product"
                          src={product.imgURL[0]}
                          height="100px"
                          className="single-product-side-img"
                          onClick={() =>
                            handleClickOnSimilarBrand(
                              product.gender,
                              product._id
                            )
                          }
                          style={{ cursor: "pointer" }}
                        ></img>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            </Content>
          </>
        )}
      </Layout>

      <Reviews />
    </>
  );
};

export default SingleProductPage;
