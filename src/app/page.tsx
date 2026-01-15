import Bubbles from '@/components/bubbles';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Bubbles />
      <main className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Wishing You All The Best
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            May your days be filled with joy and wonder.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
