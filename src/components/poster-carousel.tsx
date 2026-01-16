'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
    { src: '/Jan25.png', alt: "Adrian's Birthday Poster", hint: "poster birthday" },
    { src: '/logo.png', alt: "Logo", hint: "logo" }
];

const PosterCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square rounded-lg shadow-2xl overflow-hidden">
      {images.map(({ src, alt, hint }, index) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === 0}
          data-ai-hint={hint}
        />
      ))}
    </div>
  );
};

export default PosterCarousel;
