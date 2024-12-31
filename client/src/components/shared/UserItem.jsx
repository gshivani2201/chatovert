import { memo } from "react";

import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";

// helpers
import { transformImage } from "../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling,
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        {avatar && avatar[0] && <Avatar src={transformImage(avatar[0])} />}
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-flex",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>
        {isAdded ? (
          <IconButton
            size="small"
            sx={{
              bgcolor: "error.main",
              color: "white",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
            onClick={() => handler(_id)}
            disabled={handlerIsLoading}
          >
            <RemoveIcon />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
            onClick={() => handler(_id)}
            disabled={handlerIsLoading}
          >
            <AddIcon />
          </IconButton>
        )}
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
