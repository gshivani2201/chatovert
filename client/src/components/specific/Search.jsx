import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useInputValidation } from "6pp";

import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// actions
import { setIsSearch } from "../../redux/reducers/misc";

// api
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/reducers/api";

// hooks
import { useAsyncMutation } from "../../hooks/hook";

// child components
import UserItem from "../shared/UserItem";

const Search = () => {
  const searchVal = useInputValidation("");
  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(searchVal.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchVal.value]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={searchVal.value}
          onChange={searchVal.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              key={i._id}
              user={i}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
