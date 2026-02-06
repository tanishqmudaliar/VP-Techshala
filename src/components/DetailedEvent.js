import React, { useState } from "react";
import "../styles/DetailedEvent.css";
import Footer from "./Footer";
import Header from "./Header";
import { Card, CardContent, Avatar, Box } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import { defaultEvent } from "../helper/localData";

function DetailedEvent() {
  const [events] = useState([defaultEvent]);
  const { userProfile, profilePhotoUrl } = useUserAuth();
  const displayName = userProfile?.displayName ?? "";
  const email = userProfile?.email ?? "";
  const role = userProfile?.role ?? "";

  return (
    <div>
      <Header />
      <div className="de">
        <div className="de1">
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
        </div>
        <div className="de2">
          {events.map((event) => (
            <li key={event.id}>{event.eventTitle}</li>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailedEvent;
