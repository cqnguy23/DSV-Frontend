import { Button, Col, Image, Radio, Rate, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { QuantityPicker } from "react-qty-picker";

import React, { useEffect, useLayoutEffect, useState } from "react";
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
  console.log(params);
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
    console.log(addedProduct.totalPrice);
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
  }, [quantity, size]);
  console.log(loading);
  return (
    <>
      <Content className="single-product-content">
        <BreadCrumb />
        {loading ? (
          <ClipLoader />
        ) : (
          <Row className="single-product-row">
            <Col span={2}></Col>

            <Col className="single-product-col" span={2}>
              <Row>
                <Image
                  alt="product"
                  src={product.imgURL?.at(1)}
                  height="100px"
                ></Image>
              </Row>
              <Row>
                <Image
                  alt="product"
                  src={product.imgURL?.at(2)}
                  height="100px"
                ></Image>
              </Row>
              <Row>
                <Image
                  alt="product"
                  src={product.imgURL?.at(3)}
                  height="100px"
                ></Image>
              </Row>
              <Row>
                <Image
                  alt="product"
                  src={product.imgURL?.at(4)}
                  height="100px"
                ></Image>
              </Row>
            </Col>
            <Col span={7}>
              <Image
                alt="product"
                src={product.imgURL?.at(0)}
                className="single-product-img"
                height="100%"
              />
            </Col>
            <Col className="single-product-info" span={9}>
              <div>
                <div className="single-product-title"> {product.name}</div>
                <div className="single-product-price"> ${product.price}</div>
                <div>
                  <em>In stock: {currentQuantity}</em>{" "}
                </div>
                <br />
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <Rate
                    allowHalf
                    count={5}
                    value={rating}
                    onChange={changeRating}
                  />
                  {"   "}| Review
                </div>
                <div> Size </div>

                <Radio.Group
                  defaultValue={size}
                  buttonStyle="solid"
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    justifyContent: "space-between",
                    width: "150px",
                  }}
                >
                  <Radio.Button
                    value="s"
                    disabled={product.size?.s === 0 ? true : false}
                    onClick={() => {
                      handleSize("s");
                    }}
                  >
                    S
                  </Radio.Button>
                  <Radio.Button
                    value="m"
                    disabled={product.size?.m === 0 ? true : false}
                    // disabled={availableSize.includes("m") ? false : true}
                    onClick={() => {
                      handleSize("m");
                    }}
                  >
                    M
                  </Radio.Button>
                  <Radio.Button
                    value="l"
                    disabled={product.size?.l === 0 ? true : false}
                    // disabled={availableSize.includes("l") ? false : true}
                    onClick={() => {
                      handleSize("l");
                    }}
                  >
                    L
                  </Radio.Button>
                </Radio.Group>
                <div
                  className="flex-align-center flex-justify-between"
                  style={{
                    width: "250px",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <div>Quantity</div>
                  <QuantityPicker
                    smooth
                    min={0}
                    max={product?.size ? product?.size[size] : 0}
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
        )}
      </Content>
    </>
  );
};

export default SingleProductPage;
