import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import {
  useAddGroupMembersMutation,
  useGetAvailableFriendsQuery,
} from "../../redux/reducers/api";

import { useAsyncMutation, useErrors } from "../../hooks/hook";

// child components
import UserItem from "../shared/UserItem";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const { isLoading, data, isError, error } = useGetAvailableFriendsQuery({
    chatId,
  });

  const errors = [{ isError, error }];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentEl) => currentEl !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    addMembers("Adding members...", { chatId, members: selectedMembers });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data.friends.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddMembers}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
