import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import Events from "./components/Events";
import Images from "./components/Images";
import Videos from "./components/Videos";
import ContactUs from "./components/ContactUs";
import CreateEditEvents from "./components/CreateEditEvents";
import DetailedEvent from "./components/DetailedEvent";

function App() {
  return (
    <div className="App">
      <div className="pc_view">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/events" element={<Events />} />
          <Route
            exact
            path="/events/create-edit-events"
            element={<CreateEditEvents />}
          />
          <Route exact path="/gallery/images" element={<Images />} />
          <Route exact path="/gallery/videos" element={<Videos />} />
          <Route exact path="/contactus" element={<ContactUs />} />
          <Route path={"/events/:id"} element={<DetailedEvent />} />
          <Route exact path="/404" element={<PageNotFound />} />
          <Route exact path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
      <div className="mobile_view">
        <h1>Comming Soon</h1>
        This is website is not yet developed for mobile view!
      </div>
    </div>
  );
}

export default App;
