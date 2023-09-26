import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import React from 'react';
import { useState } from 'react';

type Props = {
    id: string
    title: string
    content: string
    firstName: string
    lastName: string
    createdAt: string
    userImg: string
    likes: number
    liked: boolean
    bookmarks: number
    bookmarked: boolean
    userId: string
}

const { Meta } = Card;

const Post = () => {
  const [loading, setLoading] = useState(false);


  return (
    <>
      <Card
        actions={[
          <SettingOutlined key="setting" onClick={() => console.log("HELLLOOO")} />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        className='w-full mt-5'
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default Post;