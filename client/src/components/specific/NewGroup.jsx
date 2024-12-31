import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useCreateNewGroupMutation,
  useGetAvailableFriendsQuery,
} from "../../redux/reducers/api";
import { setIsNewGroup } from "../../redux/reducers/misc";

import { useInputValidation } from "6pp";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";

import { useAsyncMutation, useErrors } from "../../hooks/hook";

// child components
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const { isNewGroup } = useSelector((state) => state.misc);

  const { isError, isLoading, error, data } = useGetAvailableFriendsQuery({});
  const [createNewGroup, isLoadingNewGroup] = useAsyncMutation(
    useCreateNewGroupMutation
  );

  const errors = [{ isError: isError, error: error }];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentEl) => currentEl !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2) {
      return toast.error("Please select at least 3 members");
    }

    createNewGroup(`Creating ${groupName.value}...`, {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          {" "}
          New Groups
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant="body1" justifyContent={"space-between"}>
          Members
        </Typography>

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data.friends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
