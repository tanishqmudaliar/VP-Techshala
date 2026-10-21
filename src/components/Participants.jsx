import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import { defaultEvent, getEventParticipants } from "../helper/localData";

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [eventID, setEventID] = useState(defaultEvent.id);

  const fetchParticipants = (id) => {
    setParticipants(getEventParticipants(id || defaultEvent.id));
  };

  useEffect(() => {
    fetchParticipants(eventID);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchParticipants(eventID);
  };

  return (
    <Box sx={{ mt: 2, textAlign: "left" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <GroupIcon color="success" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1f2937" }}>
          Registered Participants ({participants.length})
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Event ID"
          color="success"
          variant="outlined"
          value={eventID}
          onChange={(e) => setEventID(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="success"
          size="small"
          startIcon={<SearchIcon />}
          sx={{ mt: 1, textTransform: "none", fontWeight: 600 }}
        >
          Filter by Event ID
        </Button>
      </Box>

      {participants.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
          No registered participants found for "{eventID}".
        </Typography>
      ) : (
        participants.map((p) => (
          <Card
            key={p.email}
            sx={{
              mt: 1.5,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Avatar
                alt={p.displayName}
                src={p.profile}
                sx={{ width: 42, height: 42, border: "2px solid #2e7d32" }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                  {p.displayName || "Anonymous Student"}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  {p.email}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.6 }}>
              {p.rollno && (
                <div>
                  <strong>Roll No:</strong> {p.rollno}
                </div>
              )}
              {p.department && (
                <div>
                  <strong>Dept:</strong> {p.department}
                </div>
              )}
              {p.number && (
                <div>
                  <strong>Phone:</strong> {p.number}
                </div>
              )}
              {p.dob && (
                <div>
                  <strong>DOB:</strong> {p.dob}
                </div>
              )}
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Participants;
