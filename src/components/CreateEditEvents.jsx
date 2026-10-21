import React, { useState } from "react";
import "../styles/CreateEditEvents.css";
import Footer from "./Footer";
import Header from "./Header";
import {
  Box,
  Alert,
  TextField,
  Button,
  Stack,
  Typography,
  Snackbar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getEvents, updateEvent } from "../helper/localData";

function CreateEditEvents() {
  const navigate = useNavigate();
  const { userProfile } = useUserAuth();
  const events = getEvents();
  const activeEvent = events[0] || {};

  const [title, setTitle] = useState(activeEvent.eventTitle || "");
  const [brief, setBrief] = useState(activeEvent.eventBrief || "");
  const [desc, setDesc] = useState(activeEvent.eventDesc || "");
  const [startTime, setStartTime] = useState(activeEvent.eventTimeStart || "");
  const [endTime, setEndTime] = useState(activeEvent.eventTimeEnd || "");
  const [thumbnail, setThumbnail] = useState(activeEvent.eventThumbnailURL || "");
  const [snackbar, setSnackbar] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateEvent({
      ...activeEvent,
      eventTitle: title,
      eventBrief: brief,
      eventDesc: desc,
      eventTimeStart: startTime,
      eventTimeEnd: endTime,
      eventThumbnailURL: thumbnail,
    });
    setSnackbar(true);
  };

  const isAdmin = userProfile?.role === "admin";

  return (
    <div className="create-edit-page">
      <Header />
      <div className="ceevents">
        <div className="cee1">
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                color: "#2e7d32",
              }}
            >
              Event Management Portal
            </Typography>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/events")}
              color="success"
              sx={{ textTransform: "none" }}
            >
              Back to Events
            </Button>
          </Box>

          {!isAdmin && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              You are currently viewing this page as a guest/student. Only users with the
              <strong> Admin</strong> role can permanently modify event records.
            </Alert>
          )}

          <Alert severity="info" sx={{ mb: 3 }}>
            Changes made in this local demo portal update the browser cache immediately for the
            homepage, events page, and detailed event view.
          </Alert>

          <Box component="form" onSubmit={handleSave} className="cform">
            <Stack spacing={2.5}>
              <TextField
                required
                fullWidth
                label="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                color="success"
              />

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  required
                  label="Start Date & Time"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  color="success"
                  sx={{ flex: "1 1 240px" }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  required
                  label="End Date & Time"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  color="success"
                  sx={{ flex: "1 1 240px" }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              <TextField
                required
                fullWidth
                label="Thumbnail Asset Path"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                color="success"
                helperText="Path to image asset, e.g. /assets/robowar.png"
              />

              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="Event Brief Summary"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                color="success"
              />

              <TextField
                required
                fullWidth
                multiline
                rows={6}
                label="Full Event Description & Rules"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                color="success"
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 1 }}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => navigate("/events")}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  sx={{ textTransform: "none", fontWeight: 700, px: 3 }}
                >
                  Save Changes
                </Button>
              </Box>
            </Stack>
          </Box>
        </div>
      </div>

      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          Event updated successfully!
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
}

export default CreateEditEvents;
