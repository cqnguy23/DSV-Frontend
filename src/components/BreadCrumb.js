import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = ({ id, name }) => {
  const location = useLocation();
  const gender = location.pathname.split("/gender/")[1].split("/")[0];

  const breadcrumbNameMap = {
    "/products/gender/women": "Women",
    "/products/gender/men": "Men",
    "/products/gender/boys": "Boys",
    "/products/gender/girls": "Girls",
  };
  if (id) breadcrumbNameMap["/products/gender/" + gender + "/" + id] = name;
  const pathSnippets = location.pathname
    .split("/gender")[1]
    .split("/")
    .filter((i) => i);
  console.log(pathSnippets);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/products/gender/${pathSnippets
      .slice(0, index + 1)
      .join("/")}`;
    console.log(url);
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb className="header-breadcrumb">{breadcrumbItems}</Breadcrumb>
  );
};

export default BreadCrumb;
