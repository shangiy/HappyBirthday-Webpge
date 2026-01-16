'use client';

import * as React from 'react';
import Image from 'next/image';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (PlaceHolderImages.length > 1) {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % PlaceHolderImages.length
        );
      }
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  if (!PlaceHolderImages || PlaceHolderImages.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[12rem] mx-auto px-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
        {PlaceHolderImages.map((image, index) => (
          <Image
            key={image.id}
            src={image.imageUrl}
            alt={image.description}
            fill
            sizes="25vw"
            className={cn(
              'object-cover transition-opacity duration-1000 ease-in-out',
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            )}
            data-ai-hint={image.imageHint}
          />
        ))}
      </div>
    </div>
  );
}
