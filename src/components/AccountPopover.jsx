import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemIcon,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function AccountPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logOut, userProfile, profilePhotoUrl } = useUserAuth();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const displayName = userProfile?.displayName ?? "User";
  const email = userProfile?.email ?? "";
  const role = userProfile?.role ?? "user";

  const handleLogout = async () => {
    handleClose();
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  const navigateProfile = () => {
    handleClose();
    navigate(`/profile/${email || user?.uid || "me"}`);
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
        aria-label="Account settings"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ width: 44, height: 44, p: 0.5 }}
        onClick={handleClick}
      >
        <Avatar
          alt={displayName}
          src={profilePhotoUrl}
          sx={{ width: 34, height: 34, border: "2px solid #2e7d32" }}
        />
      </IconButton>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1f2937" }}>
            {displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
            {email}
          </Typography>
          <Box
            sx={{
              display: "inline-block",
              mt: 0.5,
              px: 1,
              py: 0.2,
              borderRadius: 1,
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              backgroundColor: role === "admin" ? "#e8f5e9" : "#f3f4f6",
              color: role === "admin" ? "#2e7d32" : "#4b5563",
            }}
          >
            {role}
          </Box>
        </Box>

        <Divider />

        <MenuItem onClick={navigateProfile} sx={{ py: 1.2 }}>
          <ListItemIcon sx={{ color: "success.main" }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem onClick={handleLogout} sx={{ py: 1.2, color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AccountPopover;
