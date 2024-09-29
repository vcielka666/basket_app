// ImageComponent.tsx
"use client";
import { CldImage } from "next-cloudinary";

interface ImageComponentProps {
  imageUrl: string;
  altText: string;
}

const ImageComponent = ({ imageUrl, altText }: ImageComponentProps) => {
  
    if (!imageUrl) {
        return(
        <div>
            <p>NO IMAGE</p>
        </div>);
    }
  
    return (
      <div style={{ width: '100%', height: 'auto' }}>
     <CldImage
    src={imageUrl}
    width="2000" // Larger width to allow flexibility
    height="500" // Adjust height to maintain aspect ratio
    crop="fill"
    alt={altText}
    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
  />
    </div>
  );
};

export default ImageComponent;
