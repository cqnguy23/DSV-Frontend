import { Col, Image, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import StarsRating from "stars-rating";

import { ClipLoader } from "react-spinners";
import productsAction from "../redux/actions/products.actions";
const SingleProductPage = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const loading = useSelector((state) => state.products.loading);
  const params = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const id = params.id;
  useLayoutEffect(() => {
    dispatch(productsAction.getSingleProduct(id));
  }, [dispatch]);
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  console.log(rating);
  return (
    <>
      <Content className="single-product-content">
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
                  {" "}
                  <em>In stock: {product.quantity}</em>{" "}
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <StarsRating
                    count={5}
                    value={rating}
                    onChange={changeRating}
                    size={12}
                    color2={"#ffd700"}
                  />
                  {"   "}| Review
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Content>
    </>
  );
};

export default SingleProductPage;
