import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import Header from "./Header.js";
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
} from "@mui/material";
import { Form } from "react-bootstrap";
import Footer from "./Footer";

function Profile() {
  const { user, userProfile, profilePhotoUrl, updateProfile } = useUserAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [rollno, setRollno] = useState("");
  const [department, setDepartment] = useState(" ");
  const [bio, setBio] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!userProfile) return;
    setDisplayName(userProfile.displayName ?? "");
    setEmail(userProfile.email ?? "");
    setNumber(userProfile.number ?? "");
    setRollno(userProfile.rollno ?? "");
    setDob(userProfile.dob ?? "");
    setDepartment(userProfile.department ?? "");
    setBio(userProfile.bio ?? "");
  }, [userProfile]);

  const handleSubmit = async (e) => {
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

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="profile">
        <div className="section1">
          <Avatar
            className="avatar"
            alt={displayName}
            src={profilePhotoUrl}
            sx={{ width: "30vw", height: "30vw", borderRadius: "10px", mb: 3 }}
          />
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className="sectionh1">Profile Photo</h1>
            <div>Demo mode uses local avatars (user/admin).</div>
          </Box>
        </div>
        <div className="section2">
          <h1>Account Details</h1>
          <Form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                color="success"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                color="success"
                type="email"
                InputProps={{
                  readOnly: true,
                }}
                value={email}
              />
              <Box>
                <TextField
                  required
                  type="number"
                  id="number"
                  label="Number"
                  variant="outlined"
                  color="success"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  sx={{ width: "49%", mr: "2%" }}
                />
                <TextField
                  required
                  id="date"
                  label="Date Of Birth"
                  type="date"
                  color="success"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  sx={{ width: "49%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box>
                <TextField
                  required
                  fullWidth
                  id="rollno"
                  label="Roll No"
                  variant="outlined"
                  color="success"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  sx={{ width: "49%", mr: "2%" }}
                />
                <FormControl sx={{ width: "49%" }}>
                  <InputLabel id="demo-simple-select-label" color="success">
                    Department
                  </InputLabel>
                  <Select
                    required
                    displayEmpty
                    labelId="dpeartment"
                    id="department"
                    label="Department"
                    color="success"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <MenuItem value=" " disabled>
                      Select Department
                    </MenuItem>
                    <MenuItem value="Electronics And Telecommunication">
                      Electronics And Telecommunication
                    </MenuItem>
                    <MenuItem value="Information Technology">
                      Information Technology
                    </MenuItem>
                    <MenuItem value="Computer Engineering">
                      Computer Engineering
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                id="outlined-textarea"
                label="Biography"
                rows={6.9}
                color="success"
                multiline
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <Button variant="contained" type="submit" color="success">
                Submit
              </Button>
            </Stack>
          </Form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Account Successfully Updated! Please wait for a few seconds before
              reloading the site
            </Alert>
          </Snackbar>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
