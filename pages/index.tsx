import type { NextPage } from "next";
import prismaClient from "../prismaClient";
import { Post, User } from "@prisma/client";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
  styled,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MyListItem from "../src/MyListItem";
import CommentUI from "../src/CommentUI";
import ViewPostUI from "../src/ViewPostUI";
import { PostData } from "../src/types";
import RecursiveListItem from "../src/RecursiveListItem";

// Fetch all posts (in /pages/index.tsx)
export async function getServerSideProps() {
  const posts = await prismaClient.post.findMany({
    include: {
      author: true,
      children: true,
    },
  });

  return {
    props: { posts },
  };
}

type Props = {
  posts: PostData[];
};

const Home: NextPage<Props> = (props) => {
  const [currentReplyOpenId, setCurrentReplyOpenId] = useState<string | null>(
    "root"
  );
  return (
    <Box sx={{ maxWidth: 360 }}>
      <List>
        {currentReplyOpenId === "root" && (
          <MyListItem key="comment" level={0}>
            <CommentUI />
          </MyListItem>
        )}
        {props.posts.map((post) => (
          <RecursiveListItem
            key={post.id}
            post={{ ...post, level: 0 }}
            setCurrentReplyOpenId={setCurrentReplyOpenId}
          />
        ))}
      </List>
    </Box>
  );
};

export default Home;
