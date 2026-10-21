import React from "react";
import ReactPlayer from "react-player";
import "../styles/Videos.css";
import Footer from "./Footer";
import Header from "./Header";
import { Typography, Card, CardContent, Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const videoList = [
  {
    id: 1,
    url: "https://youtu.be/uy9F3Dmeic8",
    title: "Vidyalankar Polytechnic Campus Tour",
    subtitle: "Explore college infrastructure, research labs, and green campus.",
  },
  {
    id: 2,
    url: "https://youtu.be/Me0Pc8xD4wQ",
    title: "ROBOWAR Combat Highlights",
    subtitle: "High-octane wireless battle robotics tournament action.",
  },
  {
    id: 3,
    url: "https://youtu.be/xfXwAWUrDcg",
    title: "Technical Project Showcase",
    subtitle: "Student engineering inventions and IoT hardware demos.",
  },
  {
    id: 4,
    url: "https://youtu.be/DVBVrN6A19E",
    title: "Vidyalankar Annual Day & Cultural Fest",
    subtitle: "Celebrations, performances, and student talent showcases.",
  },
  {
    id: 5,
    url: "https://youtu.be/mph3EV0_Si0",
    title: "Department of IT & Computer Engineering",
    subtitle: "Curriculum highlights, coding labs, and software competitions.",
  },
  {
    id: 6,
    url: "https://youtu.be/_Ne0Q1gSwHs",
    title: "Student Testimonials & Placements",
    subtitle: "Diploma graduates sharing their industry experiences and growth.",
  },
];

function Videos() {
  return (
    <div className="videos-page">
      <Header />

      <main className="videos-container">
        <header className="videos-header">
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              color: "#2e7d32",
              mb: 1,
            }}
          >
            Campus Video Highlights
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Watch campus tours, robotic battles, technical exhibitions, and student achievements.
          </Typography>
        </header>

        <div className="video-grid">
          {videoList.map((item) => (
            <Card
              key={item.id}
              className="video-card"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="player-wrapper">
                <ReactPlayer
                  controls
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={item.url}
                  light={false}
                />
              </div>
              <CardContent sx={{ p: 2.5, textAlign: "left", flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <PlayCircleOutlineIcon sx={{ color: "success.main", fontSize: 20 }} />
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontFamily: "Playfair Display, serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "#1f2937",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.5 }}>
                  {item.subtitle}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Videos;
