'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

const shuffleArray = (array: ImagePlaceholder[]): ImagePlaceholder[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export default function ImageGallery({ images }: { images: ImagePlaceholder[] }) {
    const [gridImages, setGridImages] = useState<ImagePlaceholder[]>([]);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Initial shuffle on client mount
        if (images.length > 0) {
             setGridImages(shuffleArray(images).slice(0, 9));
        }
    }, [images]);

    useEffect(() => {
        if (!isMounted || images.length === 0) return;

        const interval = setInterval(() => {
            setIsAnimatingOut(true);
            setTimeout(() => {
                setGridImages(shuffleArray(images).slice(0, 9));
                setIsAnimatingOut(false);
            }, 500); 
        }, 5000);

        return () => clearInterval(interval);
    }, [isMounted, images]);
    
    if (!isMounted) {
        // Render placeholders on server to avoid hydration mismatch from shuffle
        return (
             <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={`placeholder-${i}`} className="aspect-square bg-muted rounded-lg" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {gridImages.map((image) => (
                <div
                    key={image.id}
                    className={cn(
                        "relative aspect-square rounded-lg overflow-hidden shadow-lg",
                        "transition-opacity duration-500 ease-in-out",
                        isAnimatingOut ? 'opacity-0' : 'opacity-100'
                    )}
                >
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 1024px) 30vw, 25vw"
                    />
                </div>
            ))}
            {/* Fill empty grid cells */}
            {Array.from({ length: Math.max(0, 9 - gridImages.length) }).map((_, i) => (
                <div key={`placeholder-empty-${i}`} className="aspect-square" />
            ))}
        </div>
    );
}
