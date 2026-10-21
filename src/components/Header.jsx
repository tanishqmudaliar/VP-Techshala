import React, { useState } from "react";
import "../styles/Header.css";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import {
  styled,
  Box,
  Drawer,
  Button,
  Toolbar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Breadcrumbs,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  emphasize,
  Chip,
  Collapse,
  AppBar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CollectionsIcon from "@mui/icons-material/Collections";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ImageIcon from "@mui/icons-material/Image";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountPopover from "./AccountPopover";
import Alert from "./Alert";

const drawerWidth = 260;

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3.5),
    cursor: "pointer",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.08),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.14),
    },
  };
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default function Header() {
  const logo = `${process.env.PUBLIC_URL}/assets/vp-logo.png`;
  const { user, userProfile, logOut } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openGallery, setOpenGallery] = useState(false);
  const navigate = useNavigate();

  const handleOpenGallery = () => {
    setOpenGallery((prev) => !prev);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (path) => {
    navigate(path);
    handleDrawerClose();
    handleClose();
  };

  const handleDrawerLogout = async () => {
    handleDrawerClose();
    try {
      await logOut();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="header-wrapper">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            backgroundColor: "#ffffff",
            color: "#1f2937",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, sm: 3 } }}>
            {/* Left: Hamburger & Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="large"
                edge="start"
                color="success"
                aria-label="open navigation menu"
                onClick={handleDrawerOpen}
                sx={{ width: 44, height: 44 }}
              >
                <MenuRoundedIcon />
              </IconButton>
              <Box
                component="button"
                onClick={() => goTo("/home")}
                sx={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="VP Techshala Home"
              >
                <img src={logo} className="logo_mainpage" alt="VP Techshala Logo" />
              </Box>
            </Box>

            {/* Center: Desktop Navigation Breadcrumbs */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                mx: 2,
              }}
            >
              <Breadcrumbs aria-label="site navigation">
                <StyledBreadcrumb
                  label="Home"
                  icon={<HomeRoundedIcon fontSize="small" />}
                  onClick={() => goTo("/home")}
                />
                <StyledBreadcrumb
                  label="Events"
                  icon={<EmojiEventsIcon fontSize="small" />}
                  onClick={() => goTo("/events")}
                />
                <StyledBreadcrumb
                  label="Gallery"
                  icon={<CollectionsIcon fontSize="small" />}
                  onClick={handleMenu}
                />
              </Breadcrumbs>
            </Box>

            {/* Right: Notifications & User Auth */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Alert />

              {user ? (
                <div className="topcorner">
                  <AccountPopover />
                </div>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => goTo("/login")}
                    sx={{ minWidth: 76, textTransform: "none", fontWeight: 600 }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => goTo("/signup")}
                    sx={{
                      minWidth: 76,
                      textTransform: "none",
                      fontWeight: 600,
                      display: { xs: "none", sm: "inline-flex" },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Gallery Dropdown Menu for Desktop */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ mt: 1 }}
        >
          <MenuItem onClick={() => goTo("/gallery/images")}>
            <ListItemIcon>
              <ImageIcon fontSize="small" color="success" />
            </ListItemIcon>
            Images
          </MenuItem>
          <MenuItem onClick={() => goTo("/gallery/videos")}>
            <ListItemIcon>
              <VideoLibraryIcon fontSize="small" color="success" />
            </ListItemIcon>
            Videos
          </MenuItem>
        </Menu>

        {/* Slide-out Navigation Drawer */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
            },
          }}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
        >
          <DrawerHeader>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src={logo}
                alt="VP Techshala Logo"
                style={{ width: 36, height: "auto" }}
              />
              <span
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#2e7d32",
                }}
              >
                VP Techshala
              </span>
            </Box>
            <IconButton onClick={handleDrawerClose} color="success" aria-label="close drawer">
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List sx={{ px: 1, py: 1.5 }}>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => goTo("/home")}
                sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
              >
                <ListItemIcon sx={{ color: "success.main", minWidth: 40 }}>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => goTo("/events")}
                sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
              >
                <ListItemIcon sx={{ color: "success.main", minWidth: 40 }}>
                  <EmojiEventsIcon />
                </ListItemIcon>
                <ListItemText primary="Events" />
              </ListItemButton>
            </ListItem>

            {/* Expandable Gallery Option */}
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={handleOpenGallery}
                sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
              >
                <ListItemIcon sx={{ color: "success.main", minWidth: 40 }}>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Gallery" />
                {openGallery ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>

            <Collapse in={openGallery} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 2 }}>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => goTo("/gallery/images")}
                    sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
                  >
                    <ListItemIcon sx={{ color: "success.main", minWidth: 36 }}>
                      <ImageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Images" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => goTo("/gallery/videos")}
                    sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
                  >
                    <ListItemIcon sx={{ color: "success.main", minWidth: 36 }}>
                      <VideoLibraryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Videos" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => goTo("/contactus")}
                sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
              >
                <ListItemIcon sx={{ color: "success.main", minWidth: 40 }}>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider sx={{ my: 1 }} />

          {/* User Account Section in Drawer */}
          <List sx={{ px: 1 }}>
            {user ? (
              <>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => goTo(`/profile/${userProfile?.email || user.uid}`)}
                    sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
                  >
                    <ListItemIcon sx={{ color: "success.main", minWidth: 40 }}>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={userProfile?.displayName || "My Profile"}
                      secondary={userProfile?.role === "admin" ? "Admin" : "Student"}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={handleDrawerLogout}
                    sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#ffebee" } }}
                  >
                    <ListItemIcon sx={{ color: "error.main", minWidth: 40 }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: "error.main" }} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => goTo("/login")}
                    sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
                  >
                    <ListItemIcon sx={{ color: "success.main", minWidth: 40 }}>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => goTo("/signup")}
                    sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#e8f5e9" } }}
                  >
                    <ListItemIcon sx={{ color: "success.main", minWidth: 40 }}>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Box>
    </header>
  );
}
