import React, { useState } from "react";
import "../styles/Login.css";
import { useUserAuth } from "../context/UserAuthContext.jsx";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Button,
  TextField,
  Alert,
  IconButton,
  Snackbar,
  InputAdornment,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const logo = `${process.env.PUBLIC_URL}/assets/vp-logo.png`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { logIn, forgotPassword } = useUserAuth();
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [demoRole, setDemoRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const sendForgotPasswordLink = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter your email to request a password reset.");
      setErrorOpen(true);
      return;
    }
    try {
      await forgotPassword(email);
      setSuccess("Password reset instructions simulated for demo mode.");
      setSuccessOpen(true);
    } catch (err) {
      setError(err.message);
      setErrorOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      setErrorOpen(true);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setError("");
    try {
      await logIn(demoEmail, demoPassword);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      setErrorOpen(true);
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
    <div className="login">
      <Box sx={{ width: "100%", maxWidth: 520, mb: 1, textAlign: "left" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/home")}
          color="success"
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Back to Portal
        </Button>
      </Box>

      <form className="lgform" onSubmit={handleSubmit}>
        <div className="auth-header">
          <img src={logo} alt="VP Techshala Logo" className="logo-login" />
          <h1>Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to explore campus events, registrations, and student profiles.
          </p>
        </div>

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

        <div className="lgform1">
          <TextField
            required
            fullWidth
            type="email"
            color="success"
            id="user-email"
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
            id="user-password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2.5 }}
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

          <Button
            type="submit"
            color="success"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mb: 1.5, textTransform: "none", fontWeight: 700, py: 1.2 }}
            startIcon={<LoginIcon />}
          >
            Sign In
          </Button>

          <Button
            color="success"
            variant="text"
            fullWidth
            onClick={sendForgotPasswordLink}
            sx={{ mb: 2, textTransform: "none" }}
            startIcon={<LockResetIcon />}
          >
            Forgot Password?
          </Button>

          <div className="lgfooter">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <RouterLink to="/signup" className="auth-link">
                Sign Up
              </RouterLink>
            </Typography>
          </div>
        </div>
      </form>

      <Snackbar
        open={errorOpen && Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setErrorOpen(false)}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={successOpen && Boolean(success)}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setSuccessOpen(false)}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {success}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
