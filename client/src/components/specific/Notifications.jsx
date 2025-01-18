import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  ListItem,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";

// apis
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/reducers/api";
import { setIsNotification } from "../../redux/reducers/misc";

// hooks
import { useAsyncMutation, useErrors } from "../../hooks/hook";

const Notifications = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  useErrors([{ error, isError }]);

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    await acceptRequest(accept ? "Accepting..." : "Rejecting...", {
      requestId: _id,
      accept,
    });
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : data?.notifications.length > 0 ? (
          data.notifications.map((i) => (
            <NotificationItem
              key={i._id}
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography>0 notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default Notifications;

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {`${name} sent you a friend request. `}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
