import React from "react";
import "../styles/Footer.css";
import { IconButton, Tooltip, Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      {/* Column 1: Social Media */}
      <div className="ft1">
        <Typography variant="h6" className="ft-title">
          Connect With Us
        </Typography>
        <div className="ft-social-icons">
          <Tooltip title="Facebook - @Vidyalankar.VP">
            <IconButton
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/Vidyalankar.VP/"
              aria-label="Vidyalankar Facebook"
              sx={{ color: "orange" }}
            >
              <FacebookIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Instagram - @vp_vidyalankar">
            <IconButton
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/vp_vidyalankar/"
              aria-label="Vidyalankar Instagram"
              sx={{ color: "orange" }}
            >
              <InstagramIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="YouTube - Vidyalankar Polytechnic Official">
            <IconButton
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/channel/UCUiyPTvc9VDYNPfmCHMHndw"
              aria-label="Vidyalankar YouTube"
              sx={{ color: "orange" }}
            >
              <YouTubeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="LinkedIn - Vidyalankar Polytechnic - India">
            <IconButton
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/vidyalankar-polytechnic---india"
              aria-label="Vidyalankar LinkedIn"
              sx={{ color: "orange" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Twitter - @VidyalankarPoly">
            <IconButton
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/VidyalankarPoly"
              aria-label="Vidyalankar Twitter"
              sx={{ color: "orange" }}
            >
              <TwitterIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Column 2: About Vidyalankar Polytechnic */}
      <div className="ft2">
        <h1>Vidyalankar Polytechnic</h1>
        <p className="ft2-desc">
          Vidyalankar Polytechnic is among the premier engineering polytechnics
          in Maharashtra, providing cutting-edge technical diploma education.
          Approved by AICTE New Delhi and Government of Maharashtra, affiliated
          to MSBTE Mumbai.
        </p>
        <div className="name">© {new Date().getFullYear()} TechConnected, Inc. All rights reserved.</div>
      </div>

      {/* Column 3: Contact Details */}
      <div className="ft3">
        <h1>Contact Us</h1>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mt: 1.5 }}>
          <AccountBalanceRoundedIcon sx={{ color: "orange", mt: 0.3 }} />
          <Box sx={{ color: "#e0e0e0", fontSize: "14px", lineHeight: 1.6 }}>
            <div>Vidyalankar Polytechnic</div>
            <div>Vidyalankar College Marg, Wadala (East)</div>
            <div>Mumbai - 400037, Maharashtra, India</div>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1.5 }}>
          <PhoneIcon sx={{ color: "orange" }} />
          <Box sx={{ color: "#e0e0e0", fontSize: "14px" }}>+91 22241 61126</Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1.5 }}>
          <EmailIcon sx={{ color: "orange" }} />
          <Box sx={{ color: "#e0e0e0", fontSize: "14px" }}>principal@vpt.edu.in</Box>
        </Box>
      </div>

      {/* Column 4: Quick Navigation Links */}
      <div className="ft4">
        <h1>Quick Links</h1>
        <nav className="ft-nav" aria-label="Footer Navigation">
          <button type="button" className="ft-link" onClick={() => navigate("/home")}>
            Home
          </button>
          <button type="button" className="ft-link" onClick={() => navigate("/events")}>
            Events
          </button>
          <button type="button" className="ft-link" onClick={() => navigate("/gallery/images")}>
            Images
          </button>
          <button type="button" className="ft-link" onClick={() => navigate("/gallery/videos")}>
            Videos
          </button>
          <button type="button" className="ft-link" onClick={() => navigate("/contactus")}>
            Contact Us
          </button>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
