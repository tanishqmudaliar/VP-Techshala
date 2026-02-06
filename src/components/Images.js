import React from "react";
import "../styles/Images.css";
import Footer from "./Footer";
import Header from "./Header";

function Images() {
  const base = `${process.env.PUBLIC_URL}/assets`;
  const image1 = `${base}/gallery-1.png`;
  const image2 = `${base}/gallery-2.png`;
  const image3 = `${base}/gallery-3.png`;
  const image4 = `${base}/gallery-4.png`;
  const image5 = `${base}/gallery-5.png`;
  const image6 = `${base}/gallery-6.png`;
  const image7 = `${base}/gallery-7.png`;
  const image8 = `${base}/gallery-8.png`;
  const image9 = `${base}/gallery-9.png`;
  const image10 = `${base}/gallery-10.png`;
  return (
    <div>
      <Header />
      <div className="images">
        <div className="im1">
          <img alt="image1" src={image1} className="image1" />
          <img alt="image2" src={image2} className="image2" />
          <img alt="image9" src={image9} className="image9" />
          <img alt="image10" src={image10} className="image1" />
        </div>
        <div className="im2">
          <img alt="image3" src={image3} className="image3" />
          <img alt="image4" src={image4} className="image4" />
          <img alt="image3" src={image3} className="image3" />
        </div>
        <div className="im3">
          <img alt="image5" src={image5} className="image5" />
          <img alt="image6" src={image6} className="image6" />
          <img alt="image7" src={image7} className="image7" />
          <img alt="image8" src={image8} className="image8" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Images;
