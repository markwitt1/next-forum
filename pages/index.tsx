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
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

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

interface StyledListItemProps extends ListItemProps {
  level: number;
}
const StyledListItem = styled(ListItem)<StyledListItemProps>(
  ({ theme, level }) => ({
    paddingLeft: theme.spacing(1 + level * 2),
  })
);

const Home: NextPage<Props> = (props) => {
  const [currentReplyOpenId, setCurrentReplyOpenId] = useState<string | null>(
    "root"
  );
  return (
    <Box>
      <List>
        {currentReplyOpenId === "root" && (
          <StyledListItem
            level={0}
            key="comment"
            secondaryAction={
              <IconButton edge="end" aria-label="send">
                <SendIcon />
              </IconButton>
            }
          >
            <TextField />
          </StyledListItem>
        )}
        {props.posts.map((post) => (
          <ListItem
            key={post.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comment">
                <QuestionAnswerIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar src={post.author.image ?? ""} />
            </ListItemAvatar>
            <ListItemText
              primary={post.content}
              secondary={`by ${post.author.name}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Home;
