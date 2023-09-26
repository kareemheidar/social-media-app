import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  HeartOutlined,
  CommentOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  userImg: string;
  likes: number;
  bookmarks: number;
  userId: string;
};

const { Meta } = Card;

const Post = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
    

  const addBookmark = async () => {
    try {
      const response = await fetch("http://localhost:3000/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: props.userId, list: props.id }),
      });

      console.log(response);
      if (response.ok) {
        console.log("Bookmark successful");
      } else {
        console.log("Bookmark failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        actions={[
          <HeartOutlined key="heart" />,
          <CommentOutlined key="comment" />,
          <BookOutlined key="book" onClick={addBookmark} />,
        ]}
        className="w-full mt-5"
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            }
            title={props.firstName + " " + props.lastName}
            description={props.description}
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default Post;
