import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobileMenu,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";

// assets
import { orange } from "../../constants/color";
import { server } from "../../constants/config";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => {
    dispatch(setIsMobileMenu(true));
  };

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });

      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chatovert
            </Typography>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon></MenuIcon>
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Search */}
            <IconBtn
              title={"Search"}
              icon={<SearchIcon />}
              clickHandler={openSearchDialog}
            />

            {/* Add new group */}
            <IconBtn
              title={"New Group"}
              icon={<AddIcon />}
              clickHandler={openNewGroup}
            />

            {/* Manage Groups */}
            <IconBtn
              title={"Manage Groups"}
              icon={<GroupIcon />}
              clickHandler={navigateToGroup}
            />

            {/* Notifications */}
            <IconBtn
              title={"Notifications"}
              icon={<NotificationsIcon />}
              clickHandler={openNotification}
              value={notificationCount}
            />

            {/* Logout */}
            <IconBtn
              title={"Log out"}
              icon={<LogoutIcon />}
              clickHandler={logoutHandler}
            />
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, clickHandler, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={clickHandler}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
