"use client";
import { useState } from "react";
import { CldImage } from "next-cloudinary";

interface ImageComponentProps {
  imageUrl: string;
  altText: string;
}

const ImageComponent = ({ imageUrl, altText }: ImageComponentProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Toggle zoom state
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!imageUrl) {
    return (
      <div>
        <p>NO IMAGE</p>
      </div>
    );
  }

  return (
    <>
      {/* Regular Image */}
      <div style={{ width: '100%', height: 'auto' }} onClick={toggleZoom}>
        <CldImage
          src={imageUrl}
          width="2000" // Larger width to allow flexibility
          height="500" // Adjust height to maintain aspect ratio
          crop="fill"
          alt={altText}
          style={{ width: '100%', height: 'auto', objectFit: 'cover', cursor: 'pointer' }}
        />
      </div>

      {/* Zoomed Image Modal */}
      {isZoomed && (
        <div
          onClick={toggleZoom}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <CldImage
            src={imageUrl}
            width="3000" // Even larger for full-screen
            height="500"
            crop="fill"
            alt={altText}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          />
        </div>
      )}
    </>
  );
};

export default ImageComponent;
