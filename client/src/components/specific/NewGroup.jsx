import { useState } from "react";
import { useDispatch } from "react-redux";

import { useInputValidation } from "6pp";

import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";

import { useErrors } from "../../hooks/hook";

// child components
import UserItem from "../shared/UserItem";
import { useGetAvailableFriendsQuery } from "../../redux/reducers/api";

const NewGroup = () => {
  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useGetAvailableFriendsQuery({});

  const errors = [{ isError: isError, error: error }];

  useErrors(errors);

  console.log(data);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currentEl) => currentEl !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {};

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
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
          <Button variant="text" color="error" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
