import React, { useState } from "react";
import "../styles/Events.css";
import Header from "./Header";
import Footer from "./Footer";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  Button,
  Snackbar,
  Alert,
  Typography,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Participants from "./Participants";
import { defaultEvent, addParticipant, getEventParticipants, getEvents } from "../helper/localData";

function Events() {
  const { user, userProfile, profilePhotoUrl } = useUserAuth();
  const [events, setEvents] = useState(() => getEvents());
  const [expandedDesc, setExpandedDesc] = useState({});
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const navigate = useNavigate();

  const displayName = userProfile?.displayName ?? (user ? "Student" : "Guest Visitor");
  const email = userProfile?.email ?? (user ? user.email : "Not signed in");
  const role = userProfile?.role ?? "guest";

  const toggleDesc = (eventId) => {
    setExpandedDesc((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleRegister = (event) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const participants = getEventParticipants(event.id);
    const alreadyRegistered = participants.some((p) => p.email === email);

    if (alreadyRegistered) {
      setSnackbarMsg("You are already registered for this event!");
      setSnackbar(true);
      return;
    }

    addParticipant(event.id, {
      userID: user.uid,
      profile: profilePhotoUrl,
      displayName: userProfile?.displayName || "Student",
      email: userProfile?.email || user.email,
      number: userProfile?.number || "",
      dob: userProfile?.dob || "",
      rollno: userProfile?.rollno || "",
      department: userProfile?.department || "",
      participatedAt: new Date().toISOString(),
    });

    setSnackbarMsg("Registration successful! We look forward to seeing your bot in the arena.");
    setSnackbar(true);
  };

  const isUserRegistered = (eventId) => {
    if (!email) return false;
    const participants = getEventParticipants(eventId);
    return participants.some((p) => p.email === email);
  };

  const handleCloseSnackBar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar(false);
  };

  return (
    <div className="events-page">
      <Header />
      <div className="events-container">
        {/* Sidebar: Profile Summary */}
        <aside className="ep1" aria-label="Participant status">
          <Card
            sx={{
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "column" },
              alignItems: "center",
              gap: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              boxShadow: "none",
            }}
          >
            <Avatar
              src={profilePhotoUrl}
              alt={displayName}
              sx={{
                width: 88,
                height: 88,
                border: "3px solid #2e7d32",
              }}
            />
            <Box sx={{ textAlign: { xs: "center", sm: "left", md: "center" }, width: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1f2937" }}>
                {displayName}
              </Typography>
              <Chip
                label={role.toUpperCase()}
                size="small"
                color={role === "admin" ? "success" : "default"}
                sx={{ my: 0.5, fontWeight: 600, fontSize: "11px" }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
                {email}
              </Typography>
            </Box>
          </Card>

          {role === "admin" && (
            <Box sx={{ p: 1.5, pt: 0 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => navigate("/events/create-edit-events")}
                sx={{ mb: 1.5, textTransform: "none", fontWeight: 600 }}
              >
                Create / Edit Events
              </Button>
              <Participants />
            </Box>
          )}
        </aside>

        {/* Main Section: Events List */}
        <main className="ep2">
          <Box sx={{ mb: 2, textAlign: "left", px: 1 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                color: "#2e7d32",
              }}
            >
              Upcoming Campus Events
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Browse technical symposiums, robotic competitions, and register online.
            </Typography>
          </Box>

          {events.map((event) => {
            const registered = isUserRegistered(event.id);
            const isExpanded = Boolean(expandedDesc[event.id]);

            return (
              <Card
                key={event.id}
                className="event-card"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                  mb: 3,
                  backgroundColor: "#ffffff",
                }}
              >
                <CardMedia
                  component="img"
                  image={event.eventThumbnailURL}
                  alt={event.eventTitle}
                  sx={{
                    width: { xs: "100%", md: 280 },
                    height: { xs: 200, md: "auto" },
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    flex: "1 1 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: { xs: 2, sm: 3 },
                    textAlign: "left",
                  }}
                >
                  <div>
                    <div className="etitle">
                      <Typography
                        variant="h4"
                        component="h2"
                        className="event_title"
                        sx={{
                          fontFamily: "Ramaraja, serif",
                          fontSize: { xs: "28px", sm: "36px" },
                          color: "#1b5e20",
                          margin: 0,
                          lineHeight: 1.1,
                        }}
                      >
                        {event.eventTitle}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {registered ? (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="Registered"
                            color="success"
                            variant="filled"
                            sx={{ fontWeight: 600 }}
                          />
                        ) : (
                          <Button
                            color="success"
                            variant="contained"
                            size="medium"
                            onClick={() => handleRegister(event)}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                          >
                            Register Now
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          color="success"
                          size="medium"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => navigate(`/events/${event.id}`)}
                          sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </div>

                    <div className="eventDesc">
                      <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.6 }}>
                        {isExpanded ? event.eventDesc : event.eventBrief}
                      </Typography>
                    </div>
                  </div>

                  <div className="efooter">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "text.secondary",
                        fontSize: "13px",
                        flexWrap: "wrap",
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: 16, color: "success.main" }} />
                      <span>
                        From {new Date(event.eventTimeStart).toLocaleDateString()} to{" "}
                        {new Date(event.eventTimeEnd).toLocaleDateString()}
                      </span>
                      <Button
                        size="small"
                        color="success"
                        onClick={() => toggleDesc(event.id)}
                        sx={{ textTransform: "none", p: 0, minWidth: "auto", ml: 1, fontWeight: 600 }}
                      >
                        {isExpanded ? "Show Less" : "Read Full Story"}
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </main>
      </div>

      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={snackbarMsg.includes("already") ? "info" : "success"}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
}

export default Events;
