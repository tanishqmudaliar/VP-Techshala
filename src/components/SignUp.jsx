import React, { useState } from "react";
import "../styles/SignUp.css";
import { useUserAuth } from "../context/UserAuthContext.jsx";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Button,
  TextField,
  Alert,
  InputAdornment,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function SignUp() {
  const logo = `${process.env.PUBLIC_URL}/assets/vp-logo.png`;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("user");
  const [department, setDepartment] = useState("Information Technology");
  const [error, setError] = useState("");
  const { signUp, logIn } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [demoRole, setDemoRole] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!displayName || !password || !email || !number || !role) {
      return setError("Please fill in all required fields!");
    }
    try {
      await signUp({
        displayName,
        email,
        password,
        number,
        role,
        dob: "",
        rollno: "",
        department,
        bio: "",
        createdAt: new Date().toISOString(),
      });
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setError("");
    try {
      await logIn(demoEmail, demoPassword);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDemoSelect = (event) => {
    const value = event.target.value;
    setDemoRole(value);
    if (value === "user") {
      handleDemoLogin("user@demo.com", "user123");
    } else if (value === "admin") {
      handleDemoLogin("admin@demo.com", "admin123");
    }
  };

  return (
    <div className="signup">
      <Box sx={{ width: "100%", maxWidth: 560, mb: 1, textAlign: "left" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/home")}
          color="success"
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Back to Portal
        </Button>
      </Box>

      <form className="spform" onSubmit={handleSubmit}>
        <div className="auth-header">
          <img src={logo} alt="VP Techshala Logo" className="logo-login" />
          <h1>Create your account</h1>
          <p className="auth-subtitle">
            Register to participate in campus battles and engineering events.
          </p>
        </div>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <div className="auth-section-title">Instant Demo Access</div>
        <Box sx={{ width: "100%", mb: 2 }}>
          <FormControl fullWidth color="success" size="small">
            <InputLabel id="demo-login-label">Quick Select Demo Account</InputLabel>
            <Select
              labelId="demo-login-label"
              id="demo-login"
              value={demoRole}
              label="Quick Select Demo Account"
              onChange={handleDemoSelect}
            >
              <MenuItem value="user">Demo Student Account (user@demo.com)</MenuItem>
              <MenuItem value="admin">Demo Admin Account (admin@demo.com)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="spform1">
          <TextField
            required
            fullWidth
            type="text"
            color="success"
            id="name"
            label="Full Name"
            variant="outlined"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 2, width: "100%", mb: 2, flexWrap: "wrap" }}>
            <TextField
              required
              type="tel"
              color="success"
              id="number"
              label="Contact Number"
              variant="outlined"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              sx={{ flex: "1 1 200px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                      +91
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl color="success" sx={{ flex: "1 1 200px" }}>
              <InputLabel id="dept-label">Department</InputLabel>
              <Select
                labelId="dept-label"
                id="department"
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="Information Technology">Information Technology</MenuItem>
                <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                <MenuItem value="Electronics And Telecommunication">
                  Electronics & Telecomm
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            required
            fullWidth
            type="email"
            color="success"
            id="email"
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            color="success"
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ width: "100%", textAlign: "left", mb: 2 }}>
            <FormLabel component="legend" sx={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
              Account Role
            </FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="user"
                control={<Radio color="success" />}
                label="Student Participant"
              />
              <FormControlLabel
                value="admin"
                control={<Radio color="success" />}
                label="Campus Admin"
              />
            </RadioGroup>
          </Box>

          <Button
            type="submit"
            color="success"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mb: 2, textTransform: "none", fontWeight: 700, py: 1.2 }}
            startIcon={<LoginIcon />}
          >
            Create Account
          </Button>

          <div className="spfooter">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <RouterLink to="/login" className="auth-link">
                Sign In
              </RouterLink>
            </Typography>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
