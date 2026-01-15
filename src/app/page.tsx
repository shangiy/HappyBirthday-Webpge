import Bubbles from '@/components/bubbles';
import Footer from '@/components/footer';
import ImageCarousel from '@/components/image-carousel';
import TextBoard from '@/components/text-board';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Bubbles />
      <main className="flex flex-1 flex-col items-center justify-center space-y-8 py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-foreground bg-foreground/10 backdrop-blur-sm p-4 rounded-lg">
          Celebrating You Today and Always ✨
        </h1>
        <TextBoard />
        <ImageCarousel />
      </main>
      <Footer />
    </div>
  );
}
