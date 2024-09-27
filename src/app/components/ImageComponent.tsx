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
    <div className="image-container">
      <CldImage
        src={imageUrl}
        width="500"
        height="500"
        crop="fill"
        alt={altText}
      />
    </div>
  );
};

export default ImageComponent;
