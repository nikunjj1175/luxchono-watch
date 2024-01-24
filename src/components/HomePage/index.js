import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.scss"; // Import your CSS file

export default function HomePage() {
  const images = [
    {
      url: "https://images.pexels.com/photos/364822/rolex-watch-time-luxury-364822.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/128206/pexels-photo-128206.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div style={{ marginTop: "4rem" }}>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        showStatus={false}
        style={{ height: "40vh", width: "100%", overflow: "hidden" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{ height: "100%", width: "100%", overflow: "hidden" }}
          >
            <img
              src={image.url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
