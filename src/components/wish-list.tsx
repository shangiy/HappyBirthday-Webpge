'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart } from 'lucide-react';
import type { Wish } from '@/components/wish-form';
import { format } from 'date-fns';

type WishListProps = {
  wishes: Wish[];
};

export default function WishList({ wishes }: WishListProps) {
  if (wishes.length === 0) {
    return null;
  }

  const wishContent = (
    <div className="space-y-4 pr-4 text-left">
      {wishes.map((wish) => (
        <Card key={wish.id} className="bg-white/30 backdrop-blur-lg border-white/50 shadow-lg rounded-2xl">
          <CardHeader className="flex-row items-center gap-3 space-y-0 pb-3">
             <Heart className="text-primary h-6 w-6" />
            <CardTitle className="text-xl font-bold text-foreground">
              {wish.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base mb-2">{wish.wish}</p>
            <p className="text-xs text-muted-foreground/70 text-right">
              {format(wish.timestamp, "dd MMM yyyy, hh:mm a")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-3xl">
      {wishes.length > 3 ? (
        <ScrollArea className="h-[400px] w-full">
          {wishContent}
        </ScrollArea>
      ) : (
        wishContent
      )}
    </div>
  );
}
