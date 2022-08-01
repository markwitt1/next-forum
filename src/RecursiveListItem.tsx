import { Post, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import prismaClient from "../prismaClient";
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

const deletePost = async (id: string) => {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  window?.location.reload();
};

const RecursiveListItem = ({
  post,
  currentReplyOpenId,
  setCurrentReplyOpenId,
  submitComment,
}: Props) => {
  const { data: session } = useSession();

  return (
    <>
      <MyListItem key={post.id} level={post.level}>
        <ViewPostUI
          isOwn={post.author.email === session?.user?.email}
          post={post}
          onPressReply={() => setCurrentReplyOpenId(post.id)}
          onDelete={() => deletePost(post.id)}
        />
      </MyListItem>
      {currentReplyOpenId === post.id && (
        <MyListItem level={post.level + 1}>
          <CommentUI onSubmit={submitComment} />
        </MyListItem>
      )}
      {post.children?.map((child) => (
        <RecursiveListItem
          key={child.id}
          post={{ ...child, level: post.level + 1 }}
          currentReplyOpenId={currentReplyOpenId}
          setCurrentReplyOpenId={setCurrentReplyOpenId}
          submitComment={submitComment}
        />
      ))}
    </>
  );
};

export default RecursiveListItem;
