'use client';

import { useState, useEffect } from 'react';

const AnalogClockFace = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondHandRotation = seconds * 6;
    const minuteHandRotation = minutes * 6 + seconds / 10;
    const hourHandRotation = (hours % 12) * 30 + minutes / 2;

    return (
        <div className="relative w-48 h-48">
            {/* Bells */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 flex justify-between z-0">
                <div className="w-10 h-10 bg-[#C0C0C0] rounded-full border-2 border-[#A9A9A9] shadow-inner -rotate-45"></div>
                <div className="w-10 h-10 bg-[#C0C0C0] rounded-full border-2 border-[#A9A9A9] shadow-inner rotate-45"></div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 w-6 h-6 bg-[#C0C0C0] rounded-t-md border-2 border-[#A9A9A9] border-b-0"></div>

            {/* Arms */}
            <div className="absolute top-1/2 -translate-y-1/2 w-[calc(100%+1rem)] left-1/2 -translate-x-1/2 flex justify-between z-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md -ml-2">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md -mr-2">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Clock body */}
            <div className="relative w-full h-full rounded-full bg-[#fdebe4] border-[12px] border-[#e53935] shadow-lg">
                
                {/* Markings */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 30}deg)` }}>
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full border border-blue-700"></div>
                    </div>
                ))}

                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-center font-clock text-[10px] text-[#00E5E5] z-10" style={{ textShadow: '0 0 3px #00E5E5' }}>
                    Adrian <br /> bash
                </div>
                
                {/* Face */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex gap-4 -mt-6">
                        <div className="w-2 h-3 bg-black rounded-full"></div>
                        <div className="w-2 h-3 bg-black rounded-full"></div>
                    </div>
                    <div className="w-4 h-4 bg-red-500 rounded-full border border-red-700 z-10 mt-1 shadow-inner"></div>
                    <div className="relative w-16 h-5 -mt-2.5">
                      <div className="absolute bottom-0 left-0 right-0 mx-auto w-full h-full bg-yellow-400 border-2 border-yellow-600" style={{clipPath: "path('M 0 0 C 10 15, 54 15, 64 0 Z')"}}></div>
                    </div>
                     <div className="w-12 h-3 bg-white rounded-b-lg -mt-1 shadow-inner"></div>
                </div>

                {/* Hands */}
                <div className="absolute w-full h-full">
                    <div
                        className="absolute top-1/2 left-1/2 w-1.5 h-10 origin-bottom bg-black z-20 rounded-t-full"
                        style={{ transform: `translateX(-50%) rotate(${hourHandRotation}deg)`, top: 'calc(50% - 2.5rem)' }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 w-1 h-14 origin-bottom bg-black z-20 rounded-t-full"
                        style={{ transform: `translateX(-50%) rotate(${minuteHandRotation}deg)`, top: 'calc(50% - 3.5rem)' }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 w-0.5 h-16 origin-bottom bg-red-600 z-20"
                        style={{ transform: `translateX(-50%) rotate(${secondHandRotation}deg)`, top: 'calc(50% - 4rem)' }}
                    />
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full z-30 border border-white"></div>
                </div>
            </div>
        </div>
    );
}

export default AnalogClockFace;
