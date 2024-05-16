// import React from "react";
import { Box, Typography } from "@mui/material";

// assets
import { gray } from "../constants/color";

// Child components
import AppLayout from "../components/Layout/AppLayout";

const Home = () => {
  return (
    <Box bgcolor={gray} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
