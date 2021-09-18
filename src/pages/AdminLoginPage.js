import React, { useEffect } from "react";
import { Form, Input, Button, Layout } from "antd";
import userActions from "../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import adminActions from "../redux/actions/admin.actions";
const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const role = useSelector((state) => state.admin.role);
  const onLogInFinish = (values) => {
    const { email, password } = values;
    dispatch(adminActions.login(email, password));
  };
  useEffect(() => {
    if (isLoggedIn && role === "seller") {
      history.push("/admin/dashboard");
    }
  }, [isLoggedIn, role, history]);
  const onLogInFinishFailed = (errorInfo) => {};
  return (
    <Layout className="admin-login-layout">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onLogInFinish}
        onFinishFailed={onLogInFinishFailed}
        autoComplete="off"
        className="admin-login-form"
      >
        <h1
          style={{
            textAlign: "center",
            color: "#ffa15f",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Log In
        </h1>
        <div style={{ fontSize: "12px" }}> EMAIL </div>

        <Form.Item name="email">
          <Input className="admin-input" placeholder="email@sample.com" />
        </Form.Item>
        <div style={{ fontSize: "12px" }}> PASSWORD </div>

        <Form.Item name="password">
          <Input.Password
            className="admin-input"
            placeholder="Enter password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", height: "48px", marginTop: "10px" }}
          >
            Log In
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="text"
            size="small"
            htmlType="submit"
            style={{ width: "100%", color: "white", fontWeight: "600" }}
          >
            Forgot password?
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default AdminLoginPage;
