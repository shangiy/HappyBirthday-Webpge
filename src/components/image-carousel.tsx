'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ImageCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {PlaceHolderImages.map((image) => (
            <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
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
