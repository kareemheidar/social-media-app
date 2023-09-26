import React, { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SaveOutlined,
  UserOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;

const Homepage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <a href="./Homepage">Home</a>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <a href="./Userpage">User</a>,
            },
            {
              key: "3",
              icon: <SaveOutlined />,
              label: <a href="./Savedpage">Saved</a>,
            },
          ]}
        />
      </Sider>

      <Layout style={{ position: "relative" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {/* <Layout className="Homepage">
        <Header style={{ padding: 0, background: colorBgContainer }}>  */}

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <a href="./Homepage">
            <img
              src="icon.ico"
              style={{ fontSize: "32px", width: 40, height: 40 }}
            />
          </a>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 30,
          }}
        >
          TWEET
        </Content>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 30,
          }}
        >
          Content
        </Content>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 30,
          }}
        >
          Content
        </Content>
        <a>
          <div
            style={{
              position: "sticky",
              bottom: "0",
              left: "0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <PlusCircleOutlined style={{ fontSize: "32px" }} />
          </div>
        </a>
      </Layout>
    </Layout>
  );
};

export default Homepage;