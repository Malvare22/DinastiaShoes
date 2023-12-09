'use client'

import { useEffect, useState } from "react";
import { getRandomImage } from "../lib/products";

/**
 * Carrusel de imagenes, posee dos estados, uno alterno para imagen del producto
*/
export const ImageCarousel = ({ images }) => {
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
      <div className="relative px-[200px]">
        <div className="flex justify-center my-4">
            <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex}`}
            className="w-auto min-h-[100px] max-h-[400px]"
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
            className={`h-1 w-8 mx-2 ${
              currentImageIndex === index ? 'bg-blueDark' : 'bg-black'
            }`}
          />
        ))}
      </div>
        </div>
      </div>
    );
  };

  export const IndexImageCarousel = () => {
    const [images, setImages] = useState([]);

    const getData = async () => {
      try{
        const data = await getRandomImage();
        setImages(
          data.map(
            (element) => {
              return element['url_foto'];
            }
          )
        );
      }
      catch(error){
        console.log(error);
      }
    };

    useEffect(
      () => {
        getData();
      }, []
    );

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const limit = 5;

  
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
      <div className="relative px-[200px]">
        <div className="flex justify-center my-4">
            <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex}`}
            className="w-[650px] h-[450px]"
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
            className={`h-1 w-8 mx-2 ${
              currentImageIndex === index ? 'bg-blueDark' : 'bg-black'
            }`}
          />
        ))}
      </div>
        </div>
      </div>
    );
  };


  export const ProductCarousel = ({ images }) => {
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
      <div className="border-black border relative h-[550px] md:me-[100px] md:w-7/12 p-10 bg-redWine">
        <div className="flex justify-center border-3 border-black">
            <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex}`}
            className="w-auto min-h-[100px] max-h-[400px]"
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
            className={`h-1 w-8 mx-2 ${
              currentImageIndex === index ? 'bg-blueDark' : 'bg-black'
            }`}
          />
        ))}
      </div>
        </div>
      </div>
    );
  };