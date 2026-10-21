import React from "react";
import "../styles/HomePage.css";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Carousel from "./Carousel.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const project1 = `${process.env.PUBLIC_URL}/assets/project-robot.jpg`;
  const project2 = `${process.env.PUBLIC_URL}/assets/project-wind.jpg`;
  const campusBuilding = `${process.env.PUBLIC_URL}/assets/campus-building.jpg`;
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <Header />

      {/* Hero Campus Banner */}
      <section className="hero-banner" aria-label="Campus Hero Banner">
        <div
          className="vpbuilding"
          style={{ backgroundImage: `url(${campusBuilding})` }}
        >
          <div className="hero-overlay">
            <div className="hero-badge">
              <span className="hero-badge-tag">Welcome to</span>
              <h1 className="hero-title">Vidyalankar Polytechnic</h1>
              <p className="hero-subtitle">
                Excellence in Technical Education, Innovation & Campus Culture
              </p>
              <Box sx={{ mt: 2, display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<EmojiEventsIcon />}
                  onClick={() => navigate("/events")}
                  sx={{ textTransform: "none", fontWeight: 600, px: 3, py: 1 }}
                >
                  Explore Events
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/gallery/images")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    color: "#ffffff",
                    borderColor: "rgba(255,255,255,0.7)",
                    "&:hover": { borderColor: "#ffffff", backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Campus Gallery
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </section>

      {/* Intro: Tech Glimpse */}
      <section className="intro_text" aria-labelledby="tech-glimpse-heading">
        <h1 id="tech-glimpse-heading">Tech Glimpse</h1>
        <p className="intro-body">
          Vidyalankar is a well-known college for its diploma courses, offering
          disciplines such as Information Technology, Computer Engineering, and
          Electronics & Telecommunication. Situated at Wadala, Mumbai, several
          technical symposiums and competitions are actively conducted by
          Vidyalankar. The core mission is to bring out the true creative
          potential from students, providing hands-on exposure alongside
          distinguished industry mentors. Students earn recognized participation
          certificates and prizes for outstanding projects, unlocking rich career
          opportunities with leading engineering companies.
        </p>
      </section>

      {/* Section: Our Projects */}
      <section className="our_projects" aria-labelledby="projects-heading">
        <h1 id="projects-heading">Our Projects</h1>
        <div className="projects">
          <Card
            className="project-card"
            sx={{
              width: 360,
              maxWidth: "100%",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 14px 32px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={project1}
              alt="Arduino Obstacle Avoider Robot Prototype"
            />
            <CardContent sx={{ textAlign: "left", p: 2.5 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 600,
                  color: "#1f2937",
                }}
              >
                Arduino Obstacle Avoider Robot
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                An intelligent autonomous robotics prototype capable of detecting
                obstacles in its trajectory using ultrasonic sensors and
                dynamically recalculating path navigation.
              </Typography>
            </CardContent>
          </Card>

          <Card
            className="project-card"
            sx={{
              width: 360,
              maxWidth: "100%",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 14px 32px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={project2}
              alt="Wind Energy Power Plant Scale Model"
            />
            <CardContent sx={{ textAlign: "left", p: 2.5 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 600,
                  color: "#1f2937",
                }}
              >
                Wind Energy Power Plant
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                A sustainable energy demonstration unit illustrating the kinetic
                conversion of wind energy into renewable electricity utilizing
                aerodynamic turbine blades and dynamo generators.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Campus Highlights Carousel */}
      <section className="footer_carousel">
        <Carousel />
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
