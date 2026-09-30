import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <div className="pc_view">
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
      <div className="mobile_view">
        <h1>Comming Soon</h1>
        This is website is not yet developed for mobile view!
      </div>
    </div>
  );
}

export default App;
