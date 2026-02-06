import React, { useState } from "react";
import "../styles/Login.css";
import { useUserAuth } from "../context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  Button,
  TextField,
  Link,
  Alert,
  IconButton,
  Snackbar,
  InputAdornment,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [values, setValues] = useState({
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const sendforgotPasswordLink = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await forgotPassword(email);
      setSuccess("Password reset link sent successfully");
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

  const handleCloseError = (_, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  const handleCloseSuccess = (_, reason) => {
    if (reason === "clickaway") return;
    setSuccessOpen(false);
  };

  const handleDemoSelect = (event) => {
    const value = event.target.value;
    setDemoRole(value);
    if (value === "user") {
      handleDemoLogin("user@demo.com", "user123");
    }
    if (value === "admin") {
      handleDemoLogin("admin@demo.com", "admin123");
    }
  };

  return (
    <div className="login">
      <Form className="lgform" onSubmit={handleSubmit}>
        <Snackbar
          open={errorOpen && Boolean(error)}
          autoHideDuration={4000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            onClose={handleCloseError}
            variant="filled"
            sx={{ borderRadius: 2, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            {error}
          </Alert>
        </Snackbar>
        <Snackbar
          open={successOpen && Boolean(success)}
          autoHideDuration={4000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            onClose={handleCloseSuccess}
            variant="filled"
            sx={{ borderRadius: 2, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            {success}
          </Alert>
        </Snackbar>
        <div className="auth-header">
          <img src={logo} alt="logo" className="logo-login" />
          <h1>Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to continue your demo experience.
          </p>
        </div>
        <div className="auth-section-title">Demo Access</div>
        <Box sx={{ width: "90%", mb: 0.5, mx: "auto" }}>
          <FormControl fullWidth color="success">
            <InputLabel id="demo-login-label">Demo Login</InputLabel>
            <Select
              labelId="demo-login-label"
              id="demo-login"
              value={demoRole}
              label="Demo Login"
              onChange={handleDemoSelect}
            >
              <MenuItem value="user">User (demo)</MenuItem>
              <MenuItem value="admin">Admin (demo)</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="lgform1">
          <TextField
            required
            type="email"
            color="success"
            id="user-email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "90%", my: 2 }}
          />
          <TextField
            required
            type={values.showPassword ? "text" : "password"}
            color="success"
            id="user-password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "90%", mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ width: "90%", mb: 1 }}
            startIcon={<LoginIcon />}
          >
            Submit
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={sendforgotPasswordLink}
            sx={{ width: "90%" }}
            startIcon={<LockResetIcon />}
          >
            Forgot Password
          </Button>
          <div className="lgfooter">
            Don't have an account?
            <Link
              href="/signup"
              underline="hover"
              sx={{ color: "green", ml: 1 }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
