// import React from 'react'

import { Stack, AvatarGroup, Box, Avatar } from "@mui/material";

// Todo Transform
const Aavatar = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={"0.5"}>
      <AvatarGroup max={max}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={i}
              alt={`Avatar ${index}`}
              style={{
                width: "2rem",
                height: "2rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + index} rem`,
                  sm: `${index} rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default Aavatar;
