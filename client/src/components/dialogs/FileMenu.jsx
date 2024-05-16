// import React from "react";

// third party lib
import { Menu } from "@mui/material";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu open={false} anchorEl={anchorE1}>
      <div style={{ width: "10rem" }}>
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam
        sint at harum sapiente explicabo culpa porro autem tenetur atque eius,
        repellendus tempora quisquam. Nobis eveniet deleniti exercitationem
        voluptate laudantium?{" "}
      </div>
    </Menu>
  );
};

export default FileMenu;
