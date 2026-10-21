import React, { useState } from "react";
import "../styles/DetailedEvent.css";
import Footer from "./Footer";
import Header from "./Header";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  Button,
  Typography,
  Chip,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate, useParams } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import {
  defaultEvent,
  addParticipant,
  getEventParticipants,
  getEvents,
} from "../helper/localData";

function DetailedEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userProfile, profilePhotoUrl } = useUserAuth();

  const events = getEvents();
  const event = events.find((e) => e.id === id) || events[0] || defaultEvent;
  const participants = getEventParticipants(event.id);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const displayName = userProfile?.displayName ?? (user ? "Student" : "Guest");
  const email = userProfile?.email ?? (user ? user.email : "Not signed in");
  const role = userProfile?.role ?? "guest";

  const isRegistered = Boolean(
    email && participants.some((p) => p.email === email)
  );

  const handleRegister = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (isRegistered) {
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
    setSnackbarMsg("Registration confirmed! See you at the ROBOWAR arena.");
    setSnackbar(true);
  };

  return (
    <div className="detailed-event-page">
      <Header />
      <div className="de-container">
        {/* Left Column: User Status Card */}
        <aside className="de1" aria-label="User profile summary">
          <Card
            sx={{
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#ffffff",
              borderRadius: 3,
              boxShadow: "none",
            }}
          >
            <Avatar
              src={profilePhotoUrl}
              alt={displayName}
              sx={{
                width: 96,
                height: 96,
                border: "3px solid #2e7d32",
                mb: 1.5,
              }}
            />
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

            <Divider sx={{ my: 2, width: "100%" }} />

            <Box sx={{ width: "100%", textAlign: "left" }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                Current Event
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {event.eventTitle}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Registered Participants
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>
                {participants.length} Competitors
              </Typography>
            </Box>
          </Card>
        </aside>

        {/* Right Column: Full Event Showcase */}
        <main className="de2">
          <Box sx={{ mb: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/events")}
              color="success"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Back to Events
            </Button>
          </Box>

          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              backgroundColor: "#ffffff",
            }}
          >
            <CardMedia
              component="img"
              height="340"
              image={event.eventThumbnailURL}
              alt={event.eventTitle}
              sx={{ objectFit: "cover" }}
            />

            <CardContent sx={{ p: { xs: 2.5, sm: 4 }, textAlign: "left" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 2,
                  mb: 2,
                }}
              >
                <div>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontFamily: "Ramaraja, serif",
                      color: "#1b5e20",
                      fontWeight: 700,
                      lineHeight: 1,
                      m: 0,
                    }}
                  >
                    {event.eventTitle}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
                    Flagship Robotics Battle Championship
                  </Typography>
                </div>

                {isRegistered ? (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="You are Registered"
                    color="success"
                    sx={{ fontWeight: 600, py: 2, px: 1 }}
                  />
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={handleRegister}
                    sx={{ textTransform: "none", fontWeight: 700, px: 3 }}
                  >
                    Register for Event
                  </Button>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Event Metadata Badges */}
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  mb: 3,
                  p: 2,
                  backgroundColor: "#f9fafb",
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarMonthIcon color="success" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Schedule
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Date(event.eventTimeStart).toLocaleString()} -{" "}
                      {new Date(event.eventTimeEnd).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon color="success" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Arena Venue
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Campus Arena, Wadala
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GroupIcon color="success" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Participants
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {participants.length} Registered
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Detailed Description */}
              <Typography
                variant="h6"
                sx={{ fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#1f2937", mb: 1 }}
              >
                Challenge Overview
              </Typography>
              <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.8, mb: 3 }}>
                {event.eventDesc}
              </Typography>

              {/* Rules and Categories */}
              <Typography
                variant="h6"
                sx={{ fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#1f2937", mb: 1 }}
              >
                Tournament Rules & Guidelines
              </Typography>
              <Box component="ul" sx={{ pl: 2.5, color: "#374151", lineHeight: 1.8 }}>
                <li>Wireless remote-controlled combat robots designed to battle head-to-head.</li>
                <li>Points awarded for arena ring-outs, structural strikes, and operational mobility.</li>
                <li>Two official weight classes: Featherweight & Lightweight divisions.</li>
                <li>All bots must pass pre-battle safety compliance inspection.</li>
                <li>Winners receive cash prizes, trophies, and MSBTE-recognized certificates.</li>
              </Box>
            </CardContent>
          </Card>
        </main>
      </div>

      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar(false)}
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

export default DetailedEvent;
