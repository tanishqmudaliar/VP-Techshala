import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Avatar, IconButton, ListItem, Menu, MenuItem } from "@mui/material";

function AccountPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logOut, userProfile, profilePhotoUrl } = useUserAuth();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const displayName = userProfile?.displayName ?? "";
  const email = userProfile?.email ?? "";

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigateProfile = () => {
    navigate("/profile/" + email);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="success"
        sx={{ width: 50, height: 50 }}
        onClick={handleClick}
      >
        <Avatar alt={displayName} src={profilePhotoUrl} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <ListItem sx={{ color: "black" }}>{displayName}</ListItem>
        <MenuItem
          sx={{ "&:hover": { color: "green" } }}
          onClick={navigateProfile}
        >
          My account
        </MenuItem>
        <MenuItem sx={{ "&:hover": { color: "green" } }} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AccountPopover;
