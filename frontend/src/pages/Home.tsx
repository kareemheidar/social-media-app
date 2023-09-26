import React, { useEffect, useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SaveOutlined,
  UserOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Post from "@/components/Post";

const { Header, Sider, Content } = Layout;

interface Payload {
  token: string;
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface Post {
  title: string;
  description: string;
  id: string;
  createdAt: string;
  userId: string;
  likes: number;
  bookmarks: number;
}

interface Posts {
  posts: Post[];
}

const Homepage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [payload, setPayload] = useState({} as Payload);

  useEffect(() => {
    const payload = localStorage.getItem("payload");
    if (payload) {
      setPayload(JSON.parse(payload));
    }
  }, []);

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sticky left-0 top-0 h-screen"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
              onClick: () => setActive("1"),
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "User",
              onClick: () => setActive("2"),
            },
            {
              key: "3",
              icon: <SaveOutlined />,
              label: "Saved",
              onClick: () => setActive("3"),
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
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
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
          id="1"
          className={`px-24 overflow-y-auto h-["calc(100vh-64px)"] ${
            active === "1" ? "block" : "hidden"
          }`}
        >
          <Post />
          <div
            style={{
              position: "sticky",
              bottom: "0",
              left: "0",
              display: "flex",
              justifyContent: "flex-end",
              margin: "24px 16px",
            }}
          >
            <div className="bg-purple-600 h-14 w-14 rounded-full flex justify-center items-center">
              <span className="text-white text-6xl text-center mb-3">+</span>
            </div>
          </div>
        </Content>

        <Content
          id="2"
          className={`p-24 overflow-y-auto h-["calc(100vh-64px)"] ${
            active === "2" ? "block" : "hidden"
          }`}
        >
          <div
            style={{
              position: "sticky",
              bottom: "0",
              left: "0",
              display: "flex",
              justifyContent: "flex-end",
              margin: "24px 16px",
            }}
          >
            <div className="bg-purple-600 h-14 w-14 rounded-full flex justify-center items-center">
              <span className="text-white text-6xl text-center mb-3">+</span>
            </div>
          </div>
        </Content>

        <Content
          id="3"
          className={`p-24 overflow-y-auto h-["calc(100vh-64px)"] ${
            active === "3" ? "block" : "hidden"
          }`}
        >
          <div
            style={{
              position: "sticky",
              bottom: "0",
              left: "0",
              display: "flex",
              justifyContent: "flex-end",
              margin: "24px 16px",
            }}
          >
            <div className="bg-purple-600 h-14 w-14 rounded-full flex justify-center items-center">
              <span className="text-white text-6xl text-center mb-3">+</span>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Homepage;
