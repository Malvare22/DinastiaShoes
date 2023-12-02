'use client'
import { useState } from "react";

export const VarianCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const nextImage = () => {
      if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
    };
  
    const prevImage = () => {
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else {
        setCurrentImageIndex(images.length - 1);
      }
    };
  
    return (
      <div className="border-black relative h-[300px] w-[450px]">
        <div className="flex justify-center">
            <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex}`}
            className="h-[260px] w-[410px]"
            />
        </div>
        <div className="mx-5 absolute top-1/2 transform -translate-y-1/2 left-0">
          <button
            onClick={prevImage}
            className="text-white bg-black p-2 rounded-full mr-2"
          >
            &#9665;
          </button>
        </div>
        <div className="mx-5 absolute top-1/2 transform -translate-y-1/2 right-0">
          <button
            onClick={nextImage}
            className="text-white bg-black p-2 rounded-full ml-2"
          >
            &#9655;
          </button>
        </div>
        <div>
        <div className="mt-5 w-full flex justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-20 mx-2 ${
              currentImageIndex === index ? 'bg-blueDark' : 'bg-black'
            }`}
          />
        ))}
      </div>
        </div>
      </div>
    );
  };