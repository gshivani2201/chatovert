// import React from "react";

import moment from "moment";

import { Stack, Avatar, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

// helpers
import { transformImage } from "../lib/features";

const Profile = ({ user }) => {
  const { avatar, bio, username, createdAt, name } = user;
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
        src={transformImage(avatar?.url)}
      />
      <ProfileCard heading={"Bio"} text={bio} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Username"}
        text={username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment(createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
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
