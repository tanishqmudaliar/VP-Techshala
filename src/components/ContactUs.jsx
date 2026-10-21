import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
  MenuItem,
  Stack,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../styles/ContactUs.css";
import Footer from "./Footer";
import Header from "./Header";
import { useUserAuth } from "../context/UserAuthContext";

function ContactUs() {
  const { user, userProfile } = useUserAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Event Inquiry");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.displayName || "");
      setEmail(userProfile.email || "");
    }
  }, [userProfile]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!message.trim()) {
      setError("Please enter a message before submitting.");
      return;
    }

    try {
      const messages = JSON.parse(
        localStorage.getItem("vp_contact_messages") || "[]"
      );
      messages.push({
        id: `msg-${Date.now()}`,
        name: name || "Anonymous Visitor",
        email: email || "No email provided",
        category,
        message,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("vp_contact_messages", JSON.stringify(messages));
      setSuccess(true);
      setMessage("");
    } catch {
      setError("Failed to save message. Please try again.");
    }
  }

  return (
    <div className="contact-page">
      <Header />

      <main className="contactus">
        <div className="contact-wrapper">
          {/* Contact Details Card */}
          <aside className="contact-info-card" aria-label="Campus Contact Info">
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                color: "#ffffff",
                mb: 1.5,
              }}
            >
              Get in Touch
            </Typography>
            <Typography variant="body2" sx={{ color: "#d1fae5", mb: 3, lineHeight: 1.6 }}>
              Have questions regarding event registrations, student symposiums, or campus visits?
              Send us a message or reach out through our official channels.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <LocationOnIcon sx={{ color: "#a7f3d0", mt: 0.3 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#ffffff", fontWeight: 600 }}>
                    Campus Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#d1fae5" }}>
                    Vidyalankar Polytechnic, Wadala (East), Mumbai 400037
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon sx={{ color: "#a7f3d0" }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#ffffff", fontWeight: 600 }}>
                    Telephone
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#d1fae5" }}>
                    +91 22241 61126
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailIcon sx={{ color: "#a7f3d0" }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#ffffff", fontWeight: 600 }}>
                    Official Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#d1fae5" }}>
                    principal@vpt.edu.in
                  </Typography>
                </Box>
              </Box>
            </Box>
          </aside>

          {/* Contact Form */}
          <Card className="cuform" component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                color: "#2e7d32",
                textAlign: "center",
                mb: 0.5,
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 3 }}>
              Leave your feedback or query below.
            </Typography>

            <Stack spacing={2.5}>
              <TextField
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                color="success"
              />

              <TextField
                required
                fullWidth
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color="success"
              />

              <TextField
                select
                fullWidth
                label="Inquiry Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                color="success"
              >
                <MenuItem value="Event Inquiry">Campus Event Inquiry</MenuItem>
                <MenuItem value="ROBOWAR Registration">ROBOWAR Registration Support</MenuItem>
                <MenuItem value="Admissions">Diploma Admissions</MenuItem>
                <MenuItem value="General">General Feedback</MenuItem>
              </TextField>

              <TextField
                required
                fullWidth
                multiline
                rows={5}
                label="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                color="success"
                placeholder="Write your question or feedback here..."
              />

              {error && <Alert severity="error">{error}</Alert>}

              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                startIcon={<SendIcon />}
                sx={{ textTransform: "none", fontWeight: 700, py: 1.2 }}
              >
                Send Message
              </Button>
            </Stack>
          </Card>
        </div>
      </main>

      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          Thank you! Your message has been saved successfully.
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
}

export default ContactUs;
