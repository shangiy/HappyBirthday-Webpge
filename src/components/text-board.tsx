'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnalogClockFace from './analog-clock-face';

const wishes = [
  "💖 On this special day, we celebrate the amazing person you are. Your smile lights up every room, and your kindness touches every heart. ✨",
  "🌟 May this year bring you endless joy, beautiful adventures, and all the happiness you deserve. ✨",
  "🎉 You make the world brighter just by being in it. Here's to another year of wonderful memories! ✨",
  "💝 Wishing you a birthday as beautiful and extraordinary as you are! ✨",
  "💖 You are the blair to my serena! 💖",
  "💖 You're the Lorelai to my Rory! 💖",
];

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMounted, setIsMounted] = useState(false);

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
    ];
    
    const timeIsUp = timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0;

    return (
        <div className="mb-8 flex items-center justify-start gap-8">
            <AnalogClockFace />
            <div className="flex gap-4">
                {timeIsUp ? (
                    <span className="text-2xl font-bold text-primary animate-pulse">Happy Birthday, Adrian!</span>
                ) : (
                    timerData.map(({ label, value }) => (
                        <div key={label} className="flex flex-col items-center">
                            <div className="bg-primary/20 text-primary-foreground rounded-lg p-3 shadow-inner w-20 flex justify-center">
                                <span className="text-4xl font-bold font-mono text-primary">
                                    {String(value).padStart(2, '0')}
                                </span>
                            </div>
                            <span className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{label}</span>
                        </div>
                    ))
                )}
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
            <li key={index} className="text-muted-foreground text-lg leading-relaxed">
              {wish}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
