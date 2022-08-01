import { IconButton, ListItemSecondaryAction, TextField } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  onSubmit: (content: string) => void;
};

const CommentUI = ({ onSubmit }: Props) => {
  const [content, setContent] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  return (
    <>
      <TextField
        label="Write something..."
        value={content}
        onChange={handleChange}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="send"
          onClick={() => onSubmit(content)}
        >
          <SendIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};

export default CommentUI;
