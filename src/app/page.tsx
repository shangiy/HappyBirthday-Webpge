'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Bubbles from '@/components/bubbles';
import Footer from '@/components/footer';
import ImageGallery from '@/components/image-gallery';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import TextBoard from '@/components/text-board';
import WishForm, {type Wish} from '@/components/wish-form';
import WishList from '@/components/wish-list';
import HeadingDecorations from '@/components/heading-decorations';
import {
  useUser,
  useFirebase,
  useMemoFirebase,
  useCollection,
  initiateAnonymousSignIn,
} from '@/firebase';
import {collection, query, orderBy} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import ImageCarousel from '@/components/image-carousel';
import PosterCarousel from '@/components/poster-carousel';

export default function Home() {
  const {auth, firestore} = useFirebase();
  const {user, isUserLoading} = useUser();
  const [showImageGrid, setShowImageGrid] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  const wishesQuery = useMemoFirebase(
    () =>
      user
        ? query(
            collection(firestore, 'users', user.uid, 'wishes'),
            orderBy('createdAt', 'desc')
          )
        : null,
    [user, firestore]
  );

  const {data: wishes} = useCollection<Wish>(wishesQuery);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <Bubbles />
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 py-12 px-4">
        <div className="relative mt-16 flex items-center gap-6">
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-2xl animate-slide-in-from-right">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-cover"
              priority
              data-ai-hint="logo"
            />
          </div>
          <div className="relative animate-fade-in-delayed opacity-0">
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
        </div>

        <TextBoard />
        <div className="w-full max-w-4xl text-center space-y-4">
          <ImageCarousel />
          <Button
            onClick={() => setShowImageGrid((prev) => !prev)}
            size="lg"
          >
            <Camera className="mr-2" />
            {showImageGrid ? 'Hide Images' : 'View more images'}
          </Button>
          {showImageGrid && <ImageGallery images={PlaceHolderImages} />}
        </div>
        <WishForm />
        <div className="w-full max-w-3xl text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Family & Friends wishes to Adrian
          </h2>
          <WishList wishes={wishes || []} />
        </div>
        <div className="w-full max-w-3xl">
          <PosterCarousel />
        </div>
      </main>
      <Footer />
    </div>
  );
}
