import React, { useState } from "react";
import "../styles/Header.css";
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  ListItemIcon,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { defaultEvent } from "../helper/localData";
import { useNavigate } from "react-router-dom";

function Alert() {
  const [events] = useState([defaultEvent]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectEvent = (id) => {
    handleClose();
    navigate(`/events/${id}`);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="Notifications"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="success"
        sx={{ width: 44, height: 44 }}
      >
        <Badge badgeContent={events.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #eee" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#2e7d32" }}>
            Campus Notifications
          </Typography>
        </Box>

        {events.map((event) => (
          <MenuItem
            key={event.id}
            onClick={() => handleSelectEvent(event.id)}
            sx={{ py: 1.5, px: 2, display: "flex", gap: 1.5, minWidth: 260 }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: "success.main" }}>
              <EmojiEventsIcon fontSize="small" />
            </ListItemIcon>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {event.eventTitle}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Upcoming campus battle event! Click to view details.
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Alert;
