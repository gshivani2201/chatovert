// import React from "react";

import { Stack, Avatar, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white ",
        }}
      />
      <ProfileCard heading={"Bio"} text={"I am a web developer"} />
      <ProfileCard
        heading={"Username"}
        text={"shivani"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Shivani"} Icon={<FaceIcon />} />
    </Stack>
  );
};

export default Profile;

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>

      <Typography variant="caption" color={"gray"}>
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
