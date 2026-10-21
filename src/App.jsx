import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const HomePage = lazy(() => import("./components/HomePage"));
const Profile = lazy(() => import("./components/Profile"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Events = lazy(() => import("./components/Events"));
const Images = lazy(() => import("./components/Images"));
const Videos = lazy(() => import("./components/Videos"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const CreateEditEvents = lazy(() => import("./components/CreateEditEvents"));
const DetailedEvent = lazy(() => import("./components/DetailedEvent"));

function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 2,
        color: "success.main",
      }}
    >
      <CircularProgress color="success" size={40} />
      <span style={{ fontSize: "14px", color: "#555" }}>Loading...</span>
    </Box>
  );
}

function App() {
  return (
    <div className="App">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route
            path="/events/create-edit-events"
            element={<CreateEditEvents />}
          />
          <Route path="/events/:id" element={<DetailedEvent />} />
          <Route path="/gallery/images" element={<Images />} />
          <Route path="/gallery/videos" element={<Videos />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
