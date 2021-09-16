import { Card, Col, Layout, Pagination, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import BreadCrumb from "../components/BreadCrumb";
import productsAction from "../redux/actions/products.actions";
const ProductsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.data);
  const numsProducts = useSelector((state) => state.products.total);
  const genderRedux = useSelector((state) => state.products.gender);
  const initPage = useSelector((state) => state.products.page);
  const limit = 20;
  const params = useParams();
  const gender = params.gender;
  const [page, setPage] = useState(initPage);
  const handlePageChange = (page, totalPage) => {
    setPage(page);
  };
  const onProductClick = (id) => {
    history.push(`/products/gender/${gender}/${id}`);
  };
  useEffect(() => {
    dispatch(productsAction.getProducts(page, limit, gender));
  }, [dispatch, page, gender]);
  useEffect(() => {
    if (genderRedux !== gender) setPage(1);
  }, [gender, genderRedux]); //reset page when switch to different gender
  return (
    <Layout className="products-page">
      <BreadCrumb />
      {loading || products.length === 0 ? (
        <ClipLoader />
      ) : (
        <Content className="products content">
          <Col span={4} className="sidebar"></Col>
          <Col span={20}>
            <Row style={{ justifyContent: "end" }}>
              <Pagination
                simple
                current={page}
                onChange={handlePageChange}
                pageSize={limit}
                total={numsProducts}
              />
            </Row>
            <Row className="products-list">
              {products.map((product, idx) => {
                return (
                  <Col span={4.8} key={idx} style={{ marginTop: "20px" }}>
                    <Card
                      bodyStyle={{
                        padding: "5px 0px 0px 5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      hoverable
                      style={{ width: "180px", height: "345px" }}
                      cover={
                        <img
                          alt="product"
                          src={product.imgURL[0]}
                          height="270px"
                        />
                      }
                      onClick={() => {
                        onProductClick(product._id);
                      }}
                    >
                      <div className="header-col-title"> {product.name} </div>
                      <div className="header-col-price"> {product.price}$ </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Row style={{ justifyContent: "end" }}>
              <Pagination
                simple
                current={page}
                onChange={handlePageChange}
                pageSize={limit}
                total={numsProducts}
                style={{ marginTop: "40px" }}
              />
            </Row>
          </Col>
        </Content>
      )}
    </Layout>
  );
};
export default ProductsPage;
