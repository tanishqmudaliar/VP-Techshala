import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import Header from "./Header.jsx";
import { useUserAuth } from "../context/UserAuthContext";
import {
  Divider,
  Box,
  TextField,
  Stack,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  Avatar,
  Typography,
  Chip,
  Card,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Footer from "./Footer";

function Profile() {
  const { user, userProfile, profilePhotoUrl, updateProfile } = useUserAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [rollno, setRollno] = useState("");
  const [department, setDepartment] = useState("Information Technology");
  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!userProfile) return;
    setDisplayName(userProfile.displayName ?? "");
    setEmail(userProfile.email ?? "");
    setNumber(userProfile.number ?? "");
    setRollno(userProfile.rollno ?? "");
    setDob(userProfile.dob ?? "");
    setDepartment(userProfile.department?.trim() || "Information Technology");
    setBio(userProfile.bio ?? "");
  }, [userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.uid) return;
    updateProfile({
      displayName,
      number,
      dob,
      rollno,
      department,
      bio,
      updatedAt: new Date().toISOString(),
    });
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const role = userProfile?.role ?? "user";

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-container">
        <div className="profile-layout">
          {/* Section 1: Avatar & Summary */}
          <aside className="profile-sidebar" aria-label="Profile Avatar Summary">
            <Card
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                backgroundColor: "#ffffff",
              }}
            >
              <Avatar
                alt={displayName}
                src={profilePhotoUrl}
                sx={{
                  width: 140,
                  height: 140,
                  borderRadius: 3,
                  mb: 2,
                  border: "4px solid #2e7d32",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#1f2937" }}>
                {displayName || "Student Participant"}
              </Typography>
              <Chip
                label={role.toUpperCase()}
                color={role === "admin" ? "success" : "default"}
                size="small"
                sx={{ my: 1, fontWeight: 700, fontSize: "11px" }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
                {email}
              </Typography>

              <Divider sx={{ my: 2, width: "100%" }} />

              <Box sx={{ width: "100%", textAlign: "left" }}>
                <Typography variant="caption" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  {department}
                </Typography>
                {rollno && (
                  <>
                    <Typography variant="caption" color="text.secondary">
                      Roll Number
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      {rollno}
                    </Typography>
                  </>
                )}
                {bio && (
                  <>
                    <Typography variant="caption" color="text.secondary">
                      Bio
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                      {bio}
                    </Typography>
                  </>
                )}
              </Box>
            </Card>
          </aside>

          {/* Section 2: Account Details Form */}
          <section className="profile-main">
            <Card
              sx={{
                p: { xs: 2.5, sm: 4 },
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                backgroundColor: "#ffffff",
                textAlign: "left",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  color: "#2e7d32",
                  mb: 0.5,
                }}
              >
                Account Details
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Update your personal information and campus department credentials.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    variant="outlined"
                    color="success"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />

                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    variant="outlined"
                    color="success"
                    type="email"
                    InputProps={{ readOnly: true }}
                    value={email}
                    helperText="Email cannot be changed in local demo mode."
                  />

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      required
                      type="tel"
                      id="number"
                      label="Contact Number"
                      variant="outlined"
                      color="success"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      sx={{ flex: "1 1 240px" }}
                    />
                    <TextField
                      required
                      id="date"
                      label="Date Of Birth"
                      type="date"
                      color="success"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      sx={{ flex: "1 1 240px" }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                      required
                      id="rollno"
                      label="Roll Number / ID"
                      variant="outlined"
                      color="success"
                      value={rollno}
                      onChange={(e) => setRollno(e.target.value)}
                      sx={{ flex: "1 1 240px" }}
                    />
                    <FormControl sx={{ flex: "1 1 240px" }} color="success">
                      <InputLabel id="dept-select-label">Department</InputLabel>
                      <Select
                        labelId="dept-select-label"
                        id="department"
                        label="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <MenuItem value="Information Technology">Information Technology</MenuItem>
                        <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                        <MenuItem value="Electronics And Telecommunication">
                          Electronics And Telecommunication
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <TextField
                    id="bio"
                    label="Biography"
                    rows={4}
                    color="success"
                    multiline
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about your technical interests, projects, or diploma year..."
                  />

                  <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="success"
                      size="large"
                      startIcon={<SaveIcon />}
                      sx={{ textTransform: "none", fontWeight: 700, px: 3 }}
                    >
                      Save Profile
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Card>
          </section>
        </div>
      </main>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%", borderRadius: 2 }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
}

export default Profile;
