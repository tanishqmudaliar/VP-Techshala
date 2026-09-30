import React from "react";
import "../styles/CreateEditEvents.css";
import Footer from "./Footer";
import Header from "./Header";
import { Box, Alert } from "@mui/material";

function CreateEditEvents() {
  return (
    <div>
      <Header />
      <div className="ceevents">
        <div className="cee1">
          <h1>Create / Edit Events</h1>
          <Box sx={{ mx: 2, mb: 2 }}>
            <Alert severity="info">
              Demo mode is enabled. Event creation/editing is disabled to keep
              the project fully local and showcase-only.
            </Alert>
          </Box>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateEditEvents;
