import { DownOutlined } from "@ant-design/icons";
import { Row, Menu, Dropdown, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import adminActions from "../redux/actions/admin.actions";
import userActions from "../redux/actions/user.actions";

const AdminInfo = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.admin.name);
  const handleLogOut = () => {
    dispatch(adminActions.logout());
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="text" onClick={handleLogOut}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Row style={{ alignItems: "center" }}>
      <Dropdown overlay={menu}>
        <Button
          type="text"
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          {userName} <DownOutlined />
        </Button>
      </Dropdown>
      ,
    </Row>
  );
};

export default AdminInfo;
