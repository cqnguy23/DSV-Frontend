import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector((state) => state.user.role);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && role === "seller" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
