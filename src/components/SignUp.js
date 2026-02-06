import React, { useState } from "react";
import "../styles/SignUp.css";
import { useUserAuth } from "../context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  Button,
  TextField,
  Link,
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
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignUp() {
  const logo = `${process.env.PUBLIC_URL}/assets/vp-logo.png`;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const { signUp, logIn } = useUserAuth();
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [demoRole, setDemoRole] = useState("");
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

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (
        displayName === "" ||
        password === "" ||
        email === "" ||
        number === "" ||
        role === ""
      ) {
        return setError("Please fill every field!");
      }
      await signUp({
        displayName,
        email,
        password,
        number,
        role,
        dob: "",
        rollno: "",
        department: " ",
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
    }
    if (value === "admin") {
      handleDemoLogin("admin@demo.com", "admin123");
    }
  };

  return (
    <div className="signup">
      <Form className="spform" onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ width: "90%", ml: "2.5%" }}>
            {error}
          </Alert>
        )}
        <div className="auth-header">
          <img src={logo} alt="logo" className="logo-login" />
          <h1>Create your account</h1>
          <p className="auth-subtitle">
            Set up your profile to explore the demo.
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
        <div className="spform1">
          <TextField
            required
            type="text"
            color="success"
            id="name"
            label="Name"
            variant="outlined"
            onChange={(e) => setDisplayName(e.target.value)}
            sx={{ width: "90%", my: 2 }}
          />
          <TextField
            required
            type="number"
            color="success"
            id="number"
            label="Number"
            variant="outlined"
            onChange={(e) => setNumber(e.target.value)}
            sx={{ width: "90%", mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography sx={{ mx: -2 }}>+91</Typography>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            type="email"
            color="success"
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "90%", mb: 2 }}
          />
          <TextField
            required
            type={values.showPassword ? "text" : "password"}
            color="success"
            id="password"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "90%" }}
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
          <RadioGroup row>
            <FormControlLabel
              onChange={handleChange}
              value="admin"
              control={<Radio color="success" />}
              label="Admin"
            />
            <FormControlLabel
              onChange={handleChange}
              value="user"
              control={<Radio color="success" />}
              label="User"
            />
          </RadioGroup>
          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ width: "90%", mb: 1 }}
            startIcon={<LoginIcon />}
          >
            Submit
          </Button>
          <div className="spfooter">
            Already have an account?
            <Link
              href="/login"
              underline="hover"
              sx={{ color: "green", ml: 1 }}
            >
              Login
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
