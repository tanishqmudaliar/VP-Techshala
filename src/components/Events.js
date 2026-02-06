import React, { useState } from "react";
import "../styles/Events.css";
import "../styles/DetailedEvent.css";
import Header from "./Header";
import Footer from "./Footer";
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  Button,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Participants from "./Participants";
import { defaultEvent, addParticipant } from "../helper/localData";

function Events() {
  const { user, userProfile, profilePhotoUrl } = useUserAuth();
  const [events] = useState([defaultEvent]);
  const displayName = userProfile?.displayName ?? "";
  const email = userProfile?.email ?? "";
  const number = userProfile?.number ?? "";
  const dob = userProfile?.dob ?? "";
  const rollno = userProfile?.rollno ?? "";
  const department = userProfile?.department ?? "";
  const role = userProfile?.role ?? "";
  const [values, setValues] = useState({
    desc: "",
    showDesc: false,
  });
  const [snackbar, setSnackbar] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showDesc: !values.showDesc,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function registerLocal() {
    addParticipant(defaultEvent.id, {
      userID: user?.uid ?? "",
      profile: profilePhotoUrl,
      displayName,
      email,
      number,
      dob,
      rollno,
      department,
      participatedAt: new Date().toISOString(),
    });
    setSnackbar(true);
  }

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCloseSnackBar = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  return (
    <div>
      <Header />
      <div className="events">
        <div className="ep1">
          <Card
            sx={{
              m: 1,
              display: "flex",
              pb: 2,
              borderBottom: "1px solid black",
            }}
          >
            <Avatar
              src={profilePhotoUrl}
              alt={displayName}
              sx={{ width: "3cm", height: "3cm", ml: "1vw", mt: 4 }}
            />
            <Box sx={{ display: "grid", textAlign: "left" }}>
              <CardContent
                sx={{
                  fontSize: "20px",
                  height: "40px",
                  p: 0,
                  pt: 3,
                  pl: 2,
                  color: "black",
                }}
              >
                Name: {displayName}
              </CardContent>
              <CardContent
                sx={{
                  fontSize: "20px",
                  height: "40px",
                  p: 0,
                  pl: 2,
                  color: "black",
                }}
              >
                Role: {role}
              </CardContent>
              <CardContent
                sx={{
                  fontSize: "20px",
                  height: "fit-content",
                  p: 0,
                  pl: 2,
                  pb: 1,
                  color: "black",
                }}
              >
                Email: {email}
              </CardContent>
            </Box>
          </Card>
          {role === "admin" && (
            <Button
              href="/events/create-edit-events"
              variant="contained"
              color="success"
              sx={{ mx: 1, width: "96%" }}
            >
              Create/Edit Events
            </Button>
          )}
          {role === "admin" && <Participants />}
        </div>
        <div className="ep2">
          {events.map((event) => (
            <div key={event.id}>
              <Card sx={{ m: 1, display: "flex", height: "210px" }}>
                <CardMedia
                  component="img"
                  sx={{ width: "300px" }}
                  image={event.eventThumbnailURL}
                  alt={event.eventTitle}
                />
                <CardContent
                  sx={{ flex: "1 0 auto", textAlign: "left", mt: -1 }}
                >
                  <div className="etitle">
                    <CardContent
                      className="event_title"
                      sx={{ fontSize: "40px", height: "40px", p: 0 }}
                    >
                      {event.eventTitle}
                    </CardContent>
                    {role === "user" && (
                      <Button
                        color="success"
                        variant="contained"
                        onClick={registerLocal}
                      >
                        Register
                      </Button>
                    )}
                    {!user && (
                      <Button
                        onClick={handleLogin}
                        color="success"
                        variant="contained"
                      >
                        Register
                      </Button>
                    )}
                  </div>
                  <div className="eventDesc">
                    <h1 onChange={handleChange("desc")}>
                      {values.showDesc ? event.eventDesc : event.eventBrief}
                    </h1>
                  </div>
                  <div className="efooter">
                    <CardContent
                      className="event_footer"
                      sx={{
                        p: 0,
                        pt: 1,
                        fontStyle: "italic",
                        width: "fit-content",
                      }}
                    >
                      From {event.eventTimeStart} to {event.eventTimeEnd}
                      <Link
                        underline="none"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{ color: "green", ml: 1, cursor: "pointer" }}
                      >
                        {values.showDesc ? "Less Details" : "More Details"}
                      </Link>
                    </CardContent>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <Snackbar
          open={snackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Registeration successful!
          </Alert>
        </Snackbar>
      </div>
      <Footer />
    </div>
  );
}

export default Events;
