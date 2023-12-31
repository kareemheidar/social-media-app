import React, { use, useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SaveOutlined,
  UserOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal, Form, Input } from "antd";
import Post from "@/components/Post";

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

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
  _id: string;
  createdAt: string;
  userId: string;
  likes: number;
  bookmarks: number;
  firstName: string;
  lastName: string;
  bookmarked: boolean;
  liked: boolean;
}

interface Posts {
  posts: Post[];
}

const Homepage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [payload, setPayload] = useState({} as Payload);
  const [allPosts, setAllPosts] = useState([] as Posts["posts"]);
  const [myPosts, setMyPosts] = useState([] as Posts["posts"]);
  const [savedPosts, setSavedPosts] = useState([] as Posts["posts"]);

  useEffect(() => {
    const payload = localStorage.getItem("payload");
    if (payload) {
      setPayload(JSON.parse(payload));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/bookmarks/user/${payload.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA OF POSTSSSS", allPosts);
        allPosts.map((post) => {
          console.log(" DATA OF BOOKMARKS");
          console.log(data);
          console.log("POST ID", post._id);
          data.map((bookmark: {user: string, list: string, id: string}) => {
            if (post._id === bookmark.list) {
              console.log("BOOKMARK ID", bookmark.list);
              post.bookmarked = true;
              setSavedPosts([...savedPosts, post]);
            }
          });
        });
        console.log("SAVED THREE");
        console.log(savedPosts);
      })
      .catch((err) => console.log(err));
  }, [allPosts]);

  

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
          <a href="./Home">
            <img
              src="icon.ico"
              style={{ fontSize: "32px", width: 40, height: 40 }}
            />
          </a>
        </Header>

        <Content
          id="1"
          className={`px-24 overflow-y-auto h-["calc(100vh-64px)"] ${active === "1" ? "block" : "hidden"
            }`}
        >
          {allPosts.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              description={post.description}
              createdAt={post.createdAt}
              likes={post.likes}
              bookmarks={post.bookmarks}
              userId={post.userId}
              id={post._id}
              firstName={post.firstName}
              lastName={post.lastName}
              userImg="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
            />
          ))}
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
            {/* <Button icon={<PlusOutlined />}
              className="bg-purple-600 h-14 w-14 rounded-full flex justify-center items-center"
              onClick={showModal}
            > */}
            {/* <span   className="text-white text-6xl text-center mb-3">+</span> */}
            {/* </Button> */}
            <Button className="float bg-purple-600 h-14 w-14 rounded-full flex justify-center items-center" onClick={showModal}>
              <span className="text-white text-lg "> <PlusOutlined /></span>
            </Button>

            <Modal
              title="List your posts!"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Post"
              okButtonProps={{
                style: {
                  color: "white",
                  border: "1px solid lightgray ",
                  background: "rgb(147 51 234)",
                },
              }}
            >
              <Input className="title" size="small" placeholder="Title" />

              <TextArea
                className="list"
                rows={4}
                style={{ height: 120, resize: "none" }}
                placeholder="Type something..."
              />
            </Modal>
          </div>
        </Content>

        <Content
          id="2"
          className={`p-24 overflow-y-auto h-["calc(100vh-64px)"] ${active === "2" ? "block" : "hidden"
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

            <Button className="float bg-purple-600 h-14 w-14 rounded-full flex justify-center items-center" onClick={showModal}>
              <span className="text-white text-lg "> <PlusOutlined /></span>

            </Button>
            <Modal
              title="List your posts!"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Post"
              okButtonProps={{
                style: {
                  color: "white",
                  border: "1px solid lightgray ",
                  background: "rgb(147 51 234)",
                },
              }}
            >
              <Input className="title" size="small" placeholder="Title" />

              <TextArea
                className="list"
                rows={4}
                style={{ height: 120, resize: "none" }}
                placeholder="Type something..."
              />
            </Modal>
          </div>
        </Content>

        <Content
          id="3"
          className={`p-24 overflow-y-auto h-["calc(100vh-64px)"] ${active === "3" ? "block" : "hidden"
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

            <Button className="float bg-purple-600 h-14 w-14 rounded-full flex justify-center items-center" onClick={showModal}>
              <span className="text-white text-lg "> <PlusOutlined /></span>
            </Button>


            <Modal
              title="List your posts!"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Post"
              okButtonProps={{
                style: {
                  color: "white",
                  border: "1px solid lightgray ",
                  background: "rgb(147 51 234)",
                },
              }}
            >
              <Input className="title" size="small" placeholder="Title" />

              <TextArea
                className="list"
                rows={4}
                style={{ height: 120, resize: "none" }}
                placeholder="Type something..."
              />
            </Modal>

          </div>
        </Content>
      </Layout>
    </Layout >
  );
};

export default Homepage;
