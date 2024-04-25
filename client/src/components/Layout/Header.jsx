import { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Backdrop,
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

// assets
import { orange } from "../../constants/color";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isNotifs, setIsNotifs] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const navigate = useNavigate();

  const handleMobile = () => {
    console.log("handle mobile");
  };

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
    console.log("search mobile");
  };

  const openNewGroup = () => {
    console.log("open new group");
    setIsNewGroup((prev) => !prev);
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };

  const logoutHandler = () => {
    console.log("logout");
  };

  const openNotification = () => {
    setIsNotifs((prev) => !prev);
    console.log("open notification");
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

      {isNotifs && (
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

const IconBtn = ({ title, icon, clickHandler }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={clickHandler}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
