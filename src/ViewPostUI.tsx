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
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  post: Post & {
    author: User;
  };
  onPressReply: () => void;
  isOwn: boolean;
  onDelete: () => void;
};

const ViewPostUI = ({ post, onPressReply, isOwn, onDelete }: Props) => {
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
        {isOwn && (
          <IconButton edge="end" aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </>
  );
};

export default ViewPostUI;
