'use client';

import { useState } from 'react';
import Bubbles from '@/components/bubbles';
import Footer from '@/components/footer';
import ImageCarousel from '@/components/image-carousel';
import WishForm, { type Wish } from '@/components/wish-form';
import WishList from '@/components/wish-list';

const initialWishes: Wish[] = [
  {
    id: '1',
    name: 'Birthday girl here',
    wish: 'Thank you for your wishes',
    timestamp: new Date('2026-01-15T04:30:00'),
  },
  {
    id: '2',
    name: 'Iryn',
    wish: 'Happy birthday my love ♥️',
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
    <div className="relative flex min-h-screen flex-col">
      <Bubbles />
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-foreground bg-foreground/10 backdrop-blur-sm p-4 rounded-lg">
          Celebrating You Today and Always ✨
        </h1>
        <WishForm onWishSubmit={handleWishSubmit} />
        <WishList wishes={wishes} />
        <ImageCarousel />
      </main>
      <Footer />
    </div>
  );
}
