'use client';

import * as React from 'react';
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

export default function ImageGallery({ images }: { images: ImagePlaceholder[] }) {
  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint={image.imageHint}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
