import type { NextPage } from "next";
import prismaClient from "../prismaClient";
import { Post, User } from "@prisma/client";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

// Fetch all posts (in /pages/index.tsx)
export async function getServerSideProps() {
  const posts = await prismaClient.post.findMany({
    include: {
      author: true,
    },
  });

  return {
    props: { posts },
  };
}

interface Props {
  posts: (Post & {
    author: User;
  })[];
}
const Home: NextPage<Props> = (props) => {
  return (
    <Box>
      <List>
        {props.posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemAvatar>
              <Avatar src={post.author.image} />
            </ListItemAvatar>
            <ListItemText>
              <Typography>{post.content}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Home;
