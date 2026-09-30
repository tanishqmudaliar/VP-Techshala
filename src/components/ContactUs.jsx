import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Alert, Button, TextField } from "@mui/material";
import "../styles/ContactUs.css";
import Footer from "./Footer";
import Header from "./Header";
import { useUserAuth } from "../context/UserAuthContext";

function ContactUs() {
  const { userProfile } = useUserAuth();
  const displayName = userProfile?.displayName ?? "";
  const email = userProfile?.email ?? "";
  const role = userProfile?.role ?? "";
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function sendEmail(e) {
    e.preventDefault();
    setError("");
    setSuccess("Message saved locally (demo mode).");
    e.target.reset();
  }

  return (
    <div className="cu">
      <Header />
      <div className="contactus">
        <Form onSubmit={sendEmail} className="cuform">
          <h1>Contact Us</h1>
          <input
            readOnly
            className="sendemail"
            value={role}
            type="text"
            name="role"
          />
          <input
            readOnly
            className="sendemail"
            value={displayName}
            type="text"
            name="displayName"
          />
          <input
            required
            readOnly
            className="sendemail"
            value={email}
            type="text"
            name="user_email"
          />
          <TextField
            required
            multiline
            minRows={6}
            maxRows={10}
            color="success"
            type="text"
            name="message"
            label="Message"
            variant="outlined"
            sx={{ m: 2 }}
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ mx: 2, mb: 2 }}
          >
            Submit
          </Button>
          {error && (
            <Alert severity="error" sx={{ mx: 2, mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mx: 2, mb: 2 }}>
              {success}
            </Alert>
          )}
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
