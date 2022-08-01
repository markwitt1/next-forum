import type { NextPage } from "next";
import prismaClient from "../prismaClient";
import { Post, User } from "@prisma/client";
import { Avatar, Box, Fab, IconButton, List } from "@mui/material";
import { useState } from "react";
import MyListItem from "../src/MyListItem";
import CommentUI from "../src/CommentUI";
import ViewPostUI from "../src/ViewPostUI";
import { PostData, RecursivePost } from "../src/types";
import RecursiveListItem from "../src/RecursiveListItem";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";

// Fetch all posts (in /pages/index.tsx)
export async function getServerSideProps() {
  const getChildren = async (parentId: string) => {
    const children = await prismaClient.post.findMany({
      where: {
        parentId,
      },
      include: {
        author: true,
      },
    });
    return children;
  };

  const getTree = async (post: PostData): Promise<RecursivePost> => {
    let childPosts = await getChildren(post.id);

    const childPostTrees = await Promise.all(
      childPosts.map(
        async (child): Promise<RecursivePost> =>
          getTree({ ...child, level: post.level + 1, children: [] })
      )
    );

    post.children = childPostTrees;

    return post as RecursivePost;
  };

  const rootPosts = (
    await prismaClient.post.findMany({
      include: {
        author: true,
        children: true,
      },
      where: {
        parentId: null,
      },
    })
  ).map((post) => ({
    ...post,
    level: 0,
  }));

  const rootPostTrees = await Promise.all(
    rootPosts.map(
      async (post): Promise<RecursivePost> =>
        getTree({ ...post, level: post.level + 1 })
    )
  );

  return {
    props: {
      posts: rootPostTrees,
    },
  };
}

type Props = {
  posts: RecursivePost[];
};

const Home: NextPage<Props> = (props) => {
  const [currentReplyOpenId, setCurrentReplyOpenId] = useState<string | null>(
    "root"
  );

  const submitPost = async (content: string) => {
    if (currentReplyOpenId === null) return;
    const parentId =
      currentReplyOpenId === "root" ? undefined : currentReplyOpenId;
    try {
      const body = { content, parentId };
      const res = await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) window?.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p>Access Denied. Please click on the top right button to login :</p>
    );
  }

  return (
    <>
      <Box sx={{ maxWidth: 360 }}>
        <List>
          {currentReplyOpenId === "root" && (
            <MyListItem key="comment" level={0}>
              <CommentUI onSubmit={submitPost} />
            </MyListItem>
          )}

          {props.posts.map((post) => (
            <RecursiveListItem
              key={post.id}
              post={{ ...post, level: 0 }}
              currentReplyOpenId={currentReplyOpenId}
              setCurrentReplyOpenId={setCurrentReplyOpenId}
              submitComment={submitPost}
            />
          ))}
        </List>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setCurrentReplyOpenId("root")}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Home;
