import React, { useState } from "react";
import "../styles/Carousel.css";
import { images } from "../helper/CarouselData.jsx";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Carousel() {
  const [currImg, setCurrImg] = useState(0);

  const handlePrev = () => {
    setCurrImg((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrImg((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <section
      className="carousel"
      aria-label="Campus Highlights Carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="carousel-slide-wrapper">
        <img
          src={images[currImg].img}
          alt={images[currImg].alt || `Campus highlight ${currImg + 1}`}
          className="carousel-image"
        />

        <button
          type="button"
          className="carousel-control left"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <ArrowBackIosNewIcon style={{ fontSize: 24 }} />
        </button>

        <button
          type="button"
          className="carousel-control right"
          onClick={handleNext}
          aria-label="Next image"
        >
          <ArrowForwardIosIcon style={{ fontSize: 24 }} />
        </button>

        <div className="carousel-indicators" role="tablist">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-dot ${index === currImg ? "active" : ""}`}
              onClick={() => setCurrImg(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currImg}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
