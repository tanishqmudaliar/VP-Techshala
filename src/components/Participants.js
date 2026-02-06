import React, { useEffect, useState } from "react";
import "../styles/ParticipantDetails.css";
import { Avatar, Box, Button, Card, TextField } from "@mui/material";
import { defaultEvent, getEventParticipants } from "../helper/localData";

function Participants() {
  const [participants, setParticipants] = useState([]);
  const [eventID, setEventID] = useState(defaultEvent.id);
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (sendRequest) {
      setParticipants(getEventParticipants(eventID));
      setSendRequest(false);
    }
  }, [sendRequest, eventID]);

  const handleChangeOne = (e) => {
    e.preventDefault();
    setEventID(e.target.value);
  };

  return (
    <div>
      <Box sx={{ m: 1 }}>
        <Box sx={{ mb: 1 }}>Check Participants</Box>
        <TextField
          fullWidth
          onChange={handleChangeOne}
          label="Event ID"
          color="success"
          variant="outlined"
          value={eventID}
        />
        <Button
          variant="contained"
          fullWidth
          color="success"
          sx={{ mt: 1 }}
          onClick={() => setSendRequest(true)}
        >
          Submit
        </Button>
        {participants.map((event) => (
          <Card
            key={event.email}
            sx={{ mt: 1, textAlign: "left", pl: 2, py: 1, display: "flex" }}
          >
            <Avatar
              alt={event.displayName}
              src={event.profile}
              sx={{ mr: 2, mt: 1 }}
            />
            <div>
              <li>User ID: {event.userID}</li>
              <li>Email: {event.email}</li>
              <li>Name: {event.displayName}</li>
              <li>Phone Number: {event.number}</li>
              <li>Roll No: {event.rollno}</li>
              <li>Date Of Birth: {event.dob}</li>
              <li>Department: {event.department}</li>
            </div>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default Participants;
