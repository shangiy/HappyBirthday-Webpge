'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnalogClockFace from './analog-clock-face';
import Confetti from './confetti';
import { Globe } from 'lucide-react';

const wishes = [
  <span key="wish-1" className="inline-flex items-center gap-2">
    <Globe className="h-6 w-6 animate-[spin_4s_linear_infinite] text-amber-500" />
    <span>Happy 1st Birthday, Adrian! 💖</span>
  </span>,
  "🎉 On this January 25th is an extra special day, we celebrate the tiny, amazing human you are. Your giggle lights up every room, and your sweet spirit touches every heart. ✨",
  "💝 You’ve made our lives so much better just by joining the family. We can't wait to see all the big things you'll do! ✨",
  "🌟 May this year be filled with cake, new discoveries, and so much love. You deserve the whole world and more. ✨",
  "🎉 You make our world so much brighter just by being in it. Here’s to a lifetime of wonderful memories starting right now! ✨",
  "💝 Have a birthday that is just as wonderful and special as you! ✨",
];

const Balloon = ({
  color,
  position,
  animation,
  delay,
  text,
}: {
  color: string;
  position: string;
  animation: string;
  delay?: string;
  text?: React.ReactNode;
}) => (
  <div
    className={`absolute ${position} ${animation} z-0`}
    style={{ animationDelay: delay }}
  >
    <div
      className={`relative w-12 h-16 rounded-full shadow-md ${color} flex items-center justify-center text-center`}
    >
      {text}
      <div
        className={`absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-3 h-3 ${color} transform rotate-45`}
      />
    </div>
  </div>
);

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const [timeIsUp, setTimeIsUp] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const targetDate = new Date('2026-01-25T00:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setTimeIsUp(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!isMounted) {
        return <div className="h-48 mb-8" />; // Placeholder for clock
    }

    const timerData = [
        { label: 'days', value: timeLeft.days },
        { label: 'hours', value: timeLeft.hours },
        { label: 'minutes', value: timeLeft.minutes },
        { label: 'seconds', value: timeLeft.seconds },
    ];
    
    return (
        <div className="relative mb-8 flex items-center justify-center gap-8 flex-wrap overflow-hidden">
            {timeIsUp && <Confetti />}
            <AnalogClockFace />
            <div className="relative pt-16 transition-transform duration-300 ease-in-out hover:scale-105 group animate-trickle-in-from-right-delayed">
                <Balloon
                    color="bg-blue-400"
                    position="absolute top-0 right-0 -mr-4 rotate-[25deg]"
                    animation="animate-sway-2"
                    delay="0.5s"
                    text={
                        <span className="text-white font-bold text-sm leading-tight">
                          1 yr old
                        </span>
                      }
                />
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xl font-semibold tracking-wider">
                        {timeIsUp ? (
                             <span className="animate-pulse text-2xl font-bold text-primary">Happy Birthday, Adrian!</span>
                        ) : (
                            <span className="bg-rainbow-gradient bg-[200%_auto] bg-clip-text text-transparent animate-text-gradient">
                                Birthday Loading...
                            </span>
                        )}
                    </h3>
                    <div className="flex gap-2">
                        {timerData.map(({ label, value }) => (
                            <div key={label} className="flex flex-col items-center">
                                <div className="bg-primary/20 text-primary-foreground rounded-lg p-2 shadow-inner w-16 flex justify-center">
                                    <span className="text-3xl font-bold font-mono text-primary">
                                        {String(value).padStart(2, '0')}
                                    </span>
                                </div>
                                <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function TextBoard() {
  return (
    <Card className="bg-white/30 backdrop-blur-lg border-white/50 shadow-lg rounded-2xl w-full max-w-3xl">
      <CardContent className="p-8">
        <CountdownTimer />
        <ul className="space-y-6">
          {wishes.map((wish, index) => (
            <li
              key={index}
              className={`text-muted-foreground text-lg leading-relaxed ${
                index > 0 ? 'opacity-0 animate-trickle-in' : ''
              }`}
              style={
                index > 0 ? { animationDelay: `${(index - 1) * 0.3}s` } : {}
              }
            >
              {wish}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
