'use client';

import { cn } from '@/lib/utils';

type TrickleInTextProps = {
  text: string;
  className?: string;
  baseDelay?: number; // in seconds
  stagger?: number; // in seconds
};

const TrickleInText = ({
  text,
  className,
  baseDelay = 0,
  stagger = 0.03,
}: TrickleInTextProps) => {
  return (
    <span className={cn('inline-block', className)}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-trickle-in-char"
          style={{ animationDelay: `${baseDelay + index * stagger}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default TrickleInText;
