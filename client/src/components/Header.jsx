import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import IconButton from "@mui/material/IconButton";
import "../styles/header.css";
function Header() {
  return (
    <div className="container">
      <IconButton>
        <PersonIcon fontSize="large" />
      </IconButton>
      <img src="/images/tinder-icon.png" alt="" className="tinder__icon" />
      <IconButton>
        <ForumIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default Header;
