import { Post, User } from "@prisma/client";
import React from "react";
import CommentUI from "./CommentUI";
import MyListItem from "./MyListItem";
import { PostData, RecursivePost } from "./types";
import ViewPostUI from "./ViewPostUI";

type Props = {
  post: RecursivePost;
  currentReplyOpenId: string | null;
  setCurrentReplyOpenId: (id: string) => void;
  submitComment: (content: string) => void;
};

const RecursiveListItem = ({
  post,
  currentReplyOpenId,
  setCurrentReplyOpenId,
  submitComment,
}: Props) => {
  return (
    <>
      <MyListItem key={post.id} level={post.level}>
        <ViewPostUI
          post={post}
          onPressReply={() => setCurrentReplyOpenId(post.id)}
        />
      </MyListItem>
      {post.children?.map((child) => (
        <RecursiveListItem
          key={child.id}
          post={{ ...child, level: post.level + 1 }}
          currentReplyOpenId={currentReplyOpenId}
          setCurrentReplyOpenId={setCurrentReplyOpenId}
          submitComment={submitComment}
        />
      ))}
      {currentReplyOpenId === post.id && (
        <MyListItem level={post.level + 1}>
          <CommentUI onSubmit={submitComment} />
        </MyListItem>
      )}
    </>
  );
};

export default RecursiveListItem;
