import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Post, User } from "@prisma/client";

type Props = {
  post: Post & {
    author: User;
  };
  onPressReply: () => void;
};

const ViewPostUI = ({ post, onPressReply }: Props) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar src={post.author?.image ?? ""} />
      </ListItemAvatar>
      <ListItemText
        primary={post.content}
        secondary={`by ${post.author?.name}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comment" onClick={onPressReply}>
          <QuestionAnswerIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};

export default ViewPostUI;
