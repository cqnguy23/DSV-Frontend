import { Modal, Form, Input, Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import userActions from "../redux/actions/user.actions";

const RegisterModal = ({
  isRegisterModalVisible,
  setIsRegisterModalVisible,
  setIsLogInModalVisible,
}) => {
  const dispatch = useDispatch();
  const handleRegisterOk = () => {
    setIsRegisterModalVisible(false);
  };
  const handleRegisterCancel = () => {
    setIsRegisterModalVisible(false);
  };
  const onRegisterFinish = (values) => {
    const { email, password, name } = values;
    dispatch(
      userActions.resgister(email, password, name, setIsRegisterModalVisible)
    );
  };
  const handleOpenLogin = () => {
    setIsLogInModalVisible(true);
    setIsRegisterModalVisible(false);
  };
  const onRegisterFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      centered
      bodyStyle={{ height: "70vh" }}
      width="555px"
      visible={isRegisterModalVisible}
      onOk={handleRegisterOk}
      footer={[
        <div className="modal-footer">
          Do you have an account? <span onClick={handleOpenLogin}>Log In</span>
        </div>,
      ]}
      onCancel={handleRegisterCancel}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onRegisterFinish}
        onFinishFailed={onRegisterFinishFailed}
        autoComplete="off"
        className="register-login-form"
      >
        <h1 style={{ textAlign: "center" }}>
          {" "}
          <strong>Register</strong>
        </h1>

        <div> Name </div>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            {
              type: "string",
              message: "Please enter a valid name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div> Email </div>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div> Password </div>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              min: 6,
              message: "Password must be more than 6 characters",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div style={{ textAlign: "center", fontSize: "12px" }}>
          By creating an account you agree to the Terms of Service and Privacy
          Policy
        </div>
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
