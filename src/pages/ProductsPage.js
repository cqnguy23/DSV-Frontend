import { DownOutlined } from "@ant-design/icons";
import { ToggleButtonGroup } from "@mui/material";
import {
  Card,
  Col,
  Layout,
  Pagination,
  Row,
  Menu,
  Button,
  Divider,
  Dropdown,
  Badge,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToggleButton from "@mui/material/ToggleButton";
import ConditionalWrapper from "../components/ConditionalWrapper";
import { useHistory, useLocation, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import BreadCrumb from "../components/BreadCrumb";
import productsAction from "../redux/actions/products.actions";

const ProductsPage = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const dispatch = useDispatch();
  const history = useHistory();
  const { SubMenu } = Menu;

  const loading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.data);
  const numsProducts = useSelector((state) => state.products.total);
  const genderRedux = useSelector((state) => state.products.gender);
  const categories = useSelector((state) => state.products.categories);
  const initPage = useSelector((state) => state.products.page);
  const [sortType, setSortType] = useState("alpha");

  const limit = 20;
  const params = useParams();
  const query = useQuery();
  const search = query.get("search");
  const gender = params.gender;
  const [page, setPage] = useState(initPage);
  const [sizes, setSizes] = useState();
  const [colors, setColors] = useState();
  const [brands, setBrands] = useState();
  const [category, setCategory] = useState("none");
  const handleSize = (event, newSizes) => {
    setSizes(newSizes);
  };
  const handleColor = (event, newColors) => {
    setColors(newColors);
  };
  const handleCategory = (event) => {
    setPage(1);
    setCategory(event.key);
  };
  const onItemSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setBrands(selectedKeys);
  };
  const onItemDeselect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setBrands(selectedKeys);
  };
  const resetPage = () => {
    setCategory("none");
    setPage(1);
    setBrands();
    setColors();
    setSizes();
  };
  const handleSort = (type) => {
    setSortType(type); //3 types: date, az, za
  };
  const availableBrandsSet = new Set();
  const availableColorsSet = new Set();
  for (const product of products) {
    availableBrandsSet.add(product.brand);
    availableColorsSet.add(product.color);
  }
  const availableColors = Array.from(availableColorsSet);
  const availableBrands = Array.from(availableBrandsSet);
  const sortButtonMap = {
    alpha: "Name (A - Z)",
    reverseAlpha: "Name (Z - A)",
    price: "Price (lowest to highest)",
    reversePrice: "Price (highest to lowest)",
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          style={{ width: "100%", textAlign: "left" }}
          type="text"
          onClick={() => {
            handleSort("alpha");
          }}
        >
          Name: A - Z
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          style={{ width: "100%", textAlign: "left" }}
          type="text"
          onClick={() => {
            handleSort("reverseAlpha");
          }}
        >
          Name: Z - A
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          style={{ width: "100%", textAlign: "left" }}
          type="text"
          onClick={() => {
            handleSort("price");
          }}
        >
          Price: lowest to highest
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          style={{ width: "100%", textAlign: "left" }}
          type="text"
          onClick={() => {
            handleSort("reversePrice");
          }}
        >
          Price: highest to lowest
        </Button>
      </Menu.Item>
    </Menu>
  );
  const handlePageChange = (page, totalPage) => {
    setPage(page);
  };
  const onProductClick = (id) => {
    history.push(`/products/${gender}/${id}`);
  };
  useEffect(() => {
    dispatch(
      productsAction.getProducts({
        role: "customer",
        page,
        limit,
        gender,
        searchKey: search,
        category,
        sortType,
        sizes,
        colors,
        brands,
      })
    );
    dispatch(productsAction.getCategories(gender));
  }, [
    dispatch,
    page,
    gender,
    category,
    sortType,
    limit,
    sizes,
    colors,
    brands,
    search,
  ]);
  useEffect(() => {
    if (genderRedux !== gender) {
      resetPage();
    }
  }, [gender, genderRedux]); //reset page when switch to different gender
  return (
    <Layout className="products-page">
      <BreadCrumb />

      <Content className="products content">
        <Col span={4} className="sidebar">
          <div>
            <div className="category-title">Category</div>
            <div>
              <Menu defaultSelectedKeys={[category]} mode="vertical">
                <Menu.Item key="none" onClick={handleCategory}>
                  All categories
                </Menu.Item>
                <Row
                  style={{
                    width: "20px",
                    height: "1px",
                    background: "#979797",
                  }}
                ></Row>
                {categories.map((category, idx) => (
                  <Menu.Item key={category.name} onClick={handleCategory}>
                    {category.name}
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </div>
          <Divider
            style={{ margin: "50px 0px", minWidth: "50%", width: "20px" }}
          />
          <div>
            <div className="category-title">Filter</div>
          </div>
          <div>
            <Menu
              defaultOpenKeys={["sub1,sub2,sub4"]}
              open
              mode="inline"
              multiple
              onSelect={onItemSelect}
              onDeselect={onItemDeselect}
            >
              <SubMenu key="sub1" title="Size">
                <Row style={{ margin: "15px 0" }}>
                  <ToggleButtonGroup
                    id="products-size-btn-group"
                    aria-label="label"
                    value={sizes}
                    onChange={handleSize}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "150px",
                    }}
                  >
                    <ToggleButton
                      id="products-size-btn"
                      value="s"
                      aria-label="s"
                    >
                      S
                    </ToggleButton>
                    <ToggleButton
                      id="products-size-btn"
                      value="m"
                      aria-label="m"
                    >
                      M
                    </ToggleButton>
                    <ToggleButton
                      id="products-size-btn"
                      value="l"
                      aria-label="l"
                    >
                      L
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Row>
              </SubMenu>
              <SubMenu key="sub2" title="Color">
                <Row style={{ margin: "15px 0" }}>
                  <ToggleButtonGroup
                    id="color-btn-group"
                    aria-label="color"
                    value={colors}
                    onChange={handleColor}
                    style={{
                      display: "flex",
                      width: "150px",
                      flexFlow: "row wrap",
                    }}
                  >
                    {availableColors.map((color) => {
                      return (
                        <ToggleButton
                          id="products-color"
                          value={color}
                          style={
                            color === "Other"
                              ? {
                                  backgroundImage:
                                    "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)",
                                  margin: "5px 0px 0 5px",
                                }
                              : color === "Coal"
                              ? {
                                  backgroundColor: `#36454f`,
                                  margin: "5px 0px 0 5px",
                                }
                              : {
                                  backgroundColor: `${color.toLowerCase()}`,
                                  margin: "5px 0px 0 5px",
                                }
                          }
                          aria-label="red"
                        />
                      );
                    })}
                  </ToggleButtonGroup>
                </Row>
              </SubMenu>
              <SubMenu key="sub4" title="Brand">
                {availableBrands.map((brand) => {
                  return <Menu.Item key={brand}>{brand}</Menu.Item>;
                })}
              </SubMenu>
            </Menu>
          </div>
        </Col>
        {loading || products.length === 0 ? (
          <ClipLoader />
        ) : (
          <Col span={20}>
            <>
              <Row style={{ justifyContent: "space-between" }}>
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Button className="products-page-sortBtn">
                    <span>
                      Sort by: {"  "}
                      <strong>{sortButtonMap[sortType]}</strong>
                    </span>
                    <DownOutlined />
                  </Button>
                </Dropdown>
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
                    <Col key={idx} style={{ marginTop: "20px" }}>
                      <ConditionalWrapper
                        condition={
                          product.size.s === 0 &&
                          product.size.m === 0 &&
                          product.size.l === 0
                        }
                        wrapper={(children) => (
                          <Badge.Ribbon
                            placement="start"
                            text="Sold out"
                            color="grey"
                          >
                            {children}
                          </Badge.Ribbon>
                        )}
                      >
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
                              style={{ objectFit: "cover" }}
                            />
                          }
                          onClick={() => {
                            onProductClick(product._id);
                          }}
                        >
                          <div className="header-col-title">
                            {" "}
                            {product.name}{" "}
                          </div>
                          <div className="header-col-price">
                            {" "}
                            {product.price.toFixed(2)}${" "}
                          </div>
                        </Card>
                      </ConditionalWrapper>
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
            </>
          </Col>
        )}
      </Content>
    </Layout>
  );
};
export default ProductsPage;
