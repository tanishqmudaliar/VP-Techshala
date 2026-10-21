import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/PageNotFound.css";
import { Button, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const tv = `${process.env.PUBLIC_URL}/assets/error-tv.gif`;
  const navigate = useNavigate();

  return (
    <div className="pnf-page">
      <Header />

      <main className="pnf-container">
        <div className="pnf-content">
          <Typography
            variant="h2"
            component="h1"
            className="pnf-code"
            sx={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 800,
              color: "#2e7d32",
              fontSize: { xs: "3rem", sm: "4.5rem" },
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: "Libre Franklin, sans-serif",
              fontWeight: 700,
              color: "#1f2937",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              mb: 1.5,
            }}
          >
            Sorry, page not found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#4b5563",
              maxWidth: 520,
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            We couldn’t find the page you’re looking for. Perhaps you’ve mistyped
            the URL? Check your spelling or navigate back to the campus portal.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/home")}
              sx={{ textTransform: "none", fontWeight: 700, px: 3, py: 1 }}
            >
              Back to Home
            </Button>
          </Box>

          <div className="tv-wrapper">
            <img className="tv" src={tv} alt="404 TV static animation" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PageNotFound;
