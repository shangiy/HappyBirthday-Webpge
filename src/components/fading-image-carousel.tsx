'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = ['/jan25.png', '/logo.png'];
const alts = ["Adrian's Birthday Poster", "Logo"];

const FadingImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-2xl animate-slide-in-from-right">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={alts[index]}
          fill
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === 0}
          data-ai-hint={index === 0 ? "poster birthday" : "logo"}
        />
      ))}
    </div>
  );
};

export default FadingImageCarousel;
