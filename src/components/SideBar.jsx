import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  render() {
    return (
      <Sider
        theme="light"
        style={{
          minHeight: "100vh",
          position: "relative",
          top: "8vh",
          position: "fixed",
          paddingTop: "1em"
        }}
      >
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <NavLink to="/dashboard/feeds">
              {" "}
              <PieChartOutlined />
              <span>Feed</span>
            </NavLink>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <DesktopOutlined />
                <span>My study room</span>
              </span>
            }
          >
            <Menu.Item key="2">
              <NavLink to="/dashboard/classes">
                <span>My classes</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/dashboard/announcements">
                <span>Announcements</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/dashboard/homework">
                <span>Homework</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={
              <span>
                <SettingOutlined />
                <span>Admin</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <NavLink to="/dashboard/admin/classes">
                <span>Classes</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/dashboard/admin/create">
                <span>Create Class</span>
              </NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
