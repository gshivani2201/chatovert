import { useNavigate } from "react-router-dom";

import { Box, Drawer, Grid, IconButton, Tooltip } from "@mui/material";
import {
  KeyboardBackspace as KeyboardBackSpaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

// assets
import { matteBlack, orange } from "../constants/color";
import { useState } from "react";

const Groups = () => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip
        title="back"
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: matteBlack,
          color: "white",
          ":hover": {
            bgcolor: "rgba(0, 0, 0, 0.7)",
          },
        }}
        onClick={navigateBack}
      >
        <IconButton>
          <KeyboardBackSpaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={orange}
      >
        Groups List
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
      </Grid>

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        Groups List
      </Drawer>
    </Grid>
  );
};

export default Groups;
