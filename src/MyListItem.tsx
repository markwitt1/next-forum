import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  TextField,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";

interface Props {
  level: number;
  children: React.ReactNode;
}

const MyListItem: FC<Props> = ({ children, level }) => {
  const theme = useTheme();

  const styles = {
    root: {
      paddingLeft: theme.spacing(1 + level * 2),
    },
  };

  return (
    <ListItem style={styles.root} key="comment">
      {children}
    </ListItem>
  );
};

export default MyListItem;
