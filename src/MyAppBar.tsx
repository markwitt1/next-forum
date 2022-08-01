import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {};

const MyAppBar = (props: Props) => {
  const session = useSession();
  const profilePic = session.data?.user?.image;
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CODE Forum
        </Typography>
        {session.status === "authenticated" ? (
          <>
            <IconButton color="inherit" onClick={() => signOut()}>
              <LogoutIcon />
            </IconButton>
            {profilePic && <Avatar src={profilePic} />}
          </>
        ) : session.status === "loading" ? (
          <CircularProgress />
        ) : (
          <IconButton color="inherit" onClick={() => signIn()}>
            <LoginIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
