import React, { useState } from "react";
import "../styles/Header.css";
import { IconButton, Menu, ListItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { defaultEvent } from "../helper/localData";

function Alert() {
  const [events] = useState([defaultEvent]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
      >
        <NotificationsIcon />
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
        {events.map((event) => (
          <div key={event.id}>
            <ListItem>
              New event:<h1 className="alertitle">{event.eventTitle}</h1>
            </ListItem>
          </div>
        ))}
      </Menu>
    </div>
  );
}

export default Alert;
