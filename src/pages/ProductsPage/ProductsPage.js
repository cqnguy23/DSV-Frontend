import { Card, Col, Layout, Pagination, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { productsAction } from "../../redux/actions/products.actions";
import "./ProductsPage.css";
const ProductsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.data);
  const numsProducts = useSelector((state) => state.products.total);
  const limit = 20;
  const [page, setPage] = useState(1);
  const handlePageChange = (page, totalPage) => {
    setPage(page);
  };
  const onProductClick = (id) => {
    history.push(`products/${id}`);
  };

  useEffect(() => {
    dispatch(productsAction.getAllProducts(page, limit));
  }, [dispatch, page, limit]);

  return (
    <Layout
      className="products-page"
      style={{ backgroundColor: "transparent" }}
    >
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
            {loading
              ? ""
              : products.map((product, idx) => {
                  return (
                    <Col key={idx} style={{ marginTop: "20px" }}>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="product" src={product.imgURL} />}
                        onClick={() => {
                          onProductClick(product._id);
                        }}
                      >
                        <Meta
                          title={product.name}
                          description={`${product.price}$`}
                        />
                      </Card>
                    </Col>
                  );
                })}
          </Row>
        </Col>
      </Content>
    </Layout>
  );
};

export default ProductsPage;
