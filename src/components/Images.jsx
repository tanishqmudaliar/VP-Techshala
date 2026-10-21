import React, { useState } from "react";
import "../styles/Images.css";
import Footer from "./Footer";
import Header from "./Header";
import {
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const galleryData = [
  { id: 1, file: "gallery-1.png", title: "Campus Techfest Showcase", desc: "Annual technical exhibition hall" },
  { id: 2, file: "gallery-2.png", title: "Robotics Arena Battles", desc: "Combat bots competing in tournament" },
  { id: 3, file: "gallery-3.png", title: "Project Presentations", desc: "Students explaining engineering prototypes" },
  { id: 4, file: "gallery-4.png", title: "Hands-on Workshops", desc: "Hardware assembly and embedded programming" },
  { id: 5, file: "gallery-5.png", title: "Campus Architecture", desc: "Modern engineering lab facilities" },
  { id: 6, file: "gallery-6.png", title: "Innovation Awards", desc: "Prize distribution and felicitations" },
  { id: 7, file: "gallery-7.png", title: "Electronics Testing", desc: "Circuits, sensors, and microcontrollers" },
  { id: 8, file: "gallery-8.png", title: "Student Collaboration", desc: "Team hackathon project brainstorms" },
  { id: 9, file: "gallery-9.png", title: "Technical Seminars", desc: "Distinguished guest lecture sessions" },
  { id: 10, file: "gallery-10.png", title: "Vidyalankar Diploma Fair", desc: "Showcase of multidisciplinary projects" },
];

function Images() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="gallery-page">
      <Header />

      <main className="gallery-container">
        <header className="gallery-header">
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
            Campus Moments & Photo Gallery
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Glimpses of life, technical events, competitions, and innovation at Vidyalankar Polytechnic.
          </Typography>
        </header>

        <div className="gallery-grid">
          {galleryData.map((item) => {
            const src = `${process.env.PUBLIC_URL}/assets/${item.file}`;
            return (
              <figure
                key={item.id}
                className="gallery-item"
                onClick={() => setSelectedImg({ ...item, src })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedImg({ ...item, src })}
                aria-label={`View photo: ${item.title}`}
              >
                <img
                  src={src}
                  alt={item.title}
                  loading="lazy"
                  className="gallery-thumb"
                />
                <figcaption className="gallery-overlay">
                  <span className="gallery-overlay-title">{item.title}</span>
                  <span className="gallery-overlay-desc">{item.desc}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </main>

      {/* Lightbox Preview Modal */}
      <Dialog
        open={Boolean(selectedImg)}
        onClose={() => setSelectedImg(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#111827",
            color: "#ffffff",
          },
        }}
      >
        {selectedImg && (
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={() => setSelectedImg(null)}
              aria-label="Close photo preview"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: "#ffffff",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                zIndex: 2,
              }}
            >
              <CloseIcon />
            </IconButton>

            <img
              src={selectedImg.src}
              alt={selectedImg.title}
              style={{
                width: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                display: "block",
                backgroundColor: "#000",
              }}
            />

            <DialogContent sx={{ p: 2.5, backgroundColor: "#1f2937" }}>
              <Typography variant="h6" sx={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                {selectedImg.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#d1d5db", mt: 0.5 }}>
                {selectedImg.desc}
              </Typography>
            </DialogContent>
          </Box>
        )}
      </Dialog>

      <Footer />
    </div>
  );
}

export default Images;
