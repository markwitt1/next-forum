import { Post, User } from "@prisma/client";
import React from "react";
import MyListItem from "./MyListItem";
import { PostData } from "./types";
import ViewPostUI from "./ViewPostUI";

type Props = {
  post: PostData;
  setCurrentReplyOpenId: (id: string) => void;
};

const RecursiveListItem = ({ post, setCurrentReplyOpenId }: Props) => {
  return (
    <>
      <MyListItem key={post.id} level={post.level}>
        <ViewPostUI
          post={post}
          onPressReply={() => setCurrentReplyOpenId(post.id)}
        />
      </MyListItem>
      {post.children.map((child) => (
        <RecursiveListItem
          key={child.id}
          post={child}
          setCurrentReplyOpenId={setCurrentReplyOpenId}
        />
      ))}
    </>
  );
};

export default RecursiveListItem;
