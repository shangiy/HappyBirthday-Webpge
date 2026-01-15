import { Card, CardContent } from '@/components/ui/card';

const wishes = [
  "💖 On this special day, we celebrate the amazing person you are. Your smile lights up every room, and your kindness touches every heart. ✨",
  "🌟 May this year bring you endless joy, beautiful adventures, and all the happiness you deserve. ✨",
  "🎉 You make the world brighter just by being in it. Here's to another year of wonderful memories! ✨",
  "💝 Wishing you a birthday as beautiful and extraordinary as you are! ✨",
  "💖 You are the blair to my serena! 💖",
  "💖 You're the Lorelai to my Rory! 💖",
];

export default function TextBoard() {
  return (
    <Card className="bg-white/30 backdrop-blur-lg border-white/50 shadow-lg rounded-2xl w-full max-w-3xl">
      <CardContent className="p-8">
        <ul className="space-y-6">
          {wishes.map((wish, index) => (
            <li key={index} className="text-muted-foreground text-lg leading-relaxed">
              {wish}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
