import { DownOutlined } from "@ant-design/icons";
import { Row, Menu, Dropdown, Button, Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import adminActions from "../redux/actions/admin.actions";

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
        <Row>
          <Avatar
            style={{
              backgroundColor: "",
              border: "2px solid #ffa15f",
              cursor: "pointer",
            }}
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            size="large"
          />
          <Button
            type="text"
            className="ant-dropdown-link"
            style={{ fontWeight: "bold" }}
            onClick={(e) => e.preventDefault()}
          >
            {userName} <DownOutlined />
          </Button>
        </Row>
      </Dropdown>
    </Row>
  );
};

export default AdminInfo;
