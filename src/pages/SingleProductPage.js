import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { productsAction } from "../redux/actions/products.actions";
const SingleProductPage = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  useEffect(() => {
    dispatch(productsAction.getSingleProduct(id));
  }, [dispatch, id]);
  return (
    <>
      <Content>
        <Row>
          <Col style={{ border: "1px solid black" }} span={4}></Col>
          <Col style={{ border: "1px solid black" }} span={8}>
            <img
              alt="product"
              src={product.imgURL}
              className="single-product-img"
            />
          </Col>
          <Col style={{ border: "1px solid black" }} span={8}>
            <Row className="single-product-title"> {product.name}</Row>
            <Row className="single-product-price"> {product.price}$</Row>
          </Col>
          <Col style={{ border: "1px solid black" }} span={4}></Col>
        </Row>
      </Content>
    </>
  );
};

export default SingleProductPage;
