'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

export default function ImageGallery({ images }: { images: ImagePlaceholder[] }) {
  return (
    <div className="w-full max-w-3xl">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          direction: 'rtl',
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
