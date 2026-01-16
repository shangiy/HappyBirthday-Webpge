'use client';

import { useState } from 'react';
import Bubbles from '@/components/bubbles';
import Footer from '@/components/footer';
import ImageCarousel from '@/components/image-carousel';
import TextBoard from '@/components/text-board';
import WishForm, { type Wish } from '@/components/wish-form';
import WishList from '@/components/wish-list';
import HeadingDecorations from '@/components/heading-decorations';

const initialWishes: Wish[] = [
  {
    id: '1',
    name: 'Mama Adrian',
    wish: 'Thank you for your wishes',
    timestamp: new Date('2026-01-15T04:30:00'),
  },
  {
    id: '2',
    name: 'Shangi',
    wish: "Happy birthday my nephew as you'll turn a year old on jan 25.",
    timestamp: new Date('2026-01-14T20:12:00'),
  },
];

export default function Home() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);

  const handleWishSubmit = (newWish: Omit<Wish, 'id' | 'timestamp'>) => {
    const wishWithTimestamp: Wish = {
      ...newWish,
      id: new Date().toISOString(),
      timestamp: new Date(),
    };
    setWishes((prevWishes) => [wishWithTimestamp, ...prevWishes]);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <Bubbles />
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 py-12 px-4">
        <div className="relative mt-16">
          <HeadingDecorations />
          <div className="text-center bg-foreground/10 backdrop-blur-sm p-4 rounded-lg z-10 relative">
            <h1 className="text-4xl font-bold text-foreground">
              Happy Birthday, Adrian!
            </h1>
            <h3 className="text-xl mt-2 text-foreground/80">
              Celebrating You Today and Always ✨
            </h3>
          </div>
        </div>

        <TextBoard />
        <ImageCarousel />
        <WishForm onWishSubmit={handleWishSubmit} />
        <div className="w-full max-w-3xl text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Family & Friends wishes to Adrian 
          </h2>
          <WishList wishes={wishes} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
