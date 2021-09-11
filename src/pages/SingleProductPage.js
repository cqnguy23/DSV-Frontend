import { Button, Col, Image, Radio, Rate, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { QuantityPicker } from "react-qty-picker";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import StarsRating from "stars-rating";

import { ClipLoader } from "react-spinners";
import productsAction from "../redux/actions/products.actions";
const SingleProductPage = () => {
  const product = useSelector((state) => state.products.selectedProduct);

  const [size, setSize] = useState();
  const handleSizeS = () => {
    setSize("s");
  };
  const handleSizeM = () => {
    setSize("m");
  };
  const handleSizeL = () => {
    setSize("l");
  };
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  const loading = useSelector((state) => state.products.loading);
  const params = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const id = params.id;
  useEffect(() => {
    dispatch(productsAction.getSingleProduct(id));
  }, [dispatch]);

  console.log(product);
  console.log(size);
  return (
    <>
      <Content className="single-product-content">
        {!product ? (
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
                  <em>In stock: {product.size ? product.size[size] : ""}</em>{" "}
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
                    onClick={handleSizeS}
                  >
                    S
                  </Radio.Button>
                  <Radio.Button
                    value="m"
                    disabled={product.size?.m === 0 ? true : false}
                    // disabled={availableSize.includes("m") ? false : true}
                    onClick={handleSizeM}
                  >
                    M
                  </Radio.Button>
                  <Radio.Button
                    value="l"
                    disabled={product.size?.l === 0 ? true : false}
                    // disabled={availableSize.includes("l") ? false : true}
                    onClick={handleSizeL}
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
                  <QuantityPicker smooth min={0} max={product.quantity} />
                </div>
                <Button type="primary" className="single-product-add-btn">
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
