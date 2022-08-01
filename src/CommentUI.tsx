import { IconButton, ListItemSecondaryAction, TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

type Props = {};

const CommentUI = (props: Props) => {
  return (
    <>
      <TextField />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="send">
          <SendIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};

export default CommentUI;
