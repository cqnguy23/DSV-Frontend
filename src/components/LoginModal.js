import { Modal, Button, Input, Form, Checkbox } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import userActions from "../redux/actions/user.actions";

const LoginModal = ({
  isLogInModalVisible,
  setIsLogInModalVisible,
  setIsRegisterModalVisible,
}) => {
  const dispatch = useDispatch();

  const handleLogInOk = () => {
    setIsLogInModalVisible(false);
  };

  const handleLogInCancel = () => {
    setIsLogInModalVisible(false);
  };
  const onLogInFinish = (values) => {
    const { email, password } = values;
    dispatch(userActions.login(email, password, setIsLogInModalVisible));
  };
  const handleOpenRegister = () => {
    setIsLogInModalVisible(false);
    setIsRegisterModalVisible(true);
  };
  const onLogInFinishFailed = (errorInfo) => {};

  return (
    <Modal
      centered
      bodyStyle={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      width="555px"
      visible={isLogInModalVisible}
      onOk={handleLogInOk}
      footer={[
        <div className="modal-footer">
          Don't have an account?{" "}
          <span onClick={handleOpenRegister}>Register</span>
        </div>,
      ]}
      onCancel={handleLogInCancel}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onLogInFinish}
        onFinishFailed={onLogInFinishFailed}
        autoComplete="off"
        className="register-login-form"
      >
        <h1 style={{ textAlign: "center" }}>
          {" "}
          <strong>Log In</strong>
        </h1>
        <div> Email </div>

        <Form.Item name="email">
          <Input />
        </Form.Item>
        <div> Password </div>

        <Form.Item name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember password</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
