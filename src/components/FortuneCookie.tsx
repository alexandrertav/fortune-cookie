"use client";
import { useState } from "react";

// Types
type CookieStatus = "closed" | "opening" | "open";

interface StarPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  animationDelay?: string;
}

// Constants
const FORTUNES = [
  "Great things are coming your way",
  "A thrilling time is in your near future",
  "Now is the time to try something new",
  "Your hard work will soon pay off",
  "Happiness will find you when you least expect it",
  "Adventure awaits around the corner",
] as const;

const ANIMATION_DURATION = 1000;
const LUCKY_NUMBERS_COUNT = 6;
const MAX_NUMBER = 100;

// Utility Functions
const getRandomFortune = (): string => {
  return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
};

const generateUniqueNumbers = (count: number, max: number): number[] => {
  const numbers = new Set<number>();
  
  while (numbers.size < count) {
    const randomNum = Math.floor(Math.random() * max) + 1;
    numbers.add(randomNum);
  }
  
  return Array.from(numbers).sort((a, b) => a - b);
};

// Component
export default function FortuneCookie() {
  const [status, setStatus] = useState<CookieStatus>("closed");
  const [fortune, setFortune] = useState<string>("");
  const [numbers, setNumbers] = useState<number[]>([]);

  const crackCookie = (): void => {
    if (status !== "closed") return;

    setStatus("opening");
    
    const randomFortune = getRandomFortune();
    const uniqueNumbers = generateUniqueNumbers(LUCKY_NUMBERS_COUNT, MAX_NUMBER);
    
    setFortune(randomFortune);
    setNumbers(uniqueNumbers);

    setTimeout(() => {
      setStatus("open");
    }, ANIMATION_DURATION);
  };

  const resetCookie = (): void => {
    setStatus("closed");
    setFortune("");
    setNumbers([]);
  };

  // Render helpers
  const renderFloatingStars = () => {
    const starPositions: StarPosition[] = [
      { top: '35%', left: '35%' },
      { top: '25%', right: '35%' },
      { top: '55%', left: '30%' },
      { top: '65%', right: '30%' },
      { top: '40%', left: '65%' },
      { top: '50%', left: '20%' },
    ];

    return (
      <div className="stars-container">
        {starPositions.map((position, index) => (
          <div
            key={index}
            className="floating-star"
            style={position}
          >
            {index % 2 === 0 ? '✨' : '⭐'}
          </div>
        ))}
      </div>
    );
  };

  const renderSparkleEffects = () => {
    const sparklePositions: StarPosition[] = [
      { top: '-10px', left: '-10px', animationDelay: '0.2s' },
      { top: '-10px', right: '-10px', animationDelay: '0.4s' },
      { bottom: '-10px', left: '-10px', animationDelay: '0.6s' },
      { bottom: '-10px', right: '-10px', animationDelay: '0.8s' },
    ];

    return (
      <>
        {sparklePositions.map((position, index) => (
          <div
            key={index}
            className="sparkle-star"
            style={position}
          >
            {index % 2 === 0 ? '✨' : '⭐'}
          </div>
        ))}
      </>
    );
  };

  const renderClosedState = () => (
    <>
      <div
        className="fortune-cookie fortune-cookie-closed"
        onClick={crackCookie}
      />
      <h1 className="title">Fortune Cookie</h1>
      <p className="text-sm text-gray-600">Tap the cookie to crack it open!</p>
      <div className="magic-text subtitle animate-sway">
        <span className="star">✨</span>
        <span className="star">⭐</span>
        <span className="star">✨</span>
        <span className="star">⭐</span>
        ✨ Magic awaits inside ✨
      </div>
    </>
  );

  const renderOpeningState = () => (
    <>
      <div className="relative">
        <div className="fortune-cookie fortune-cookie-opening" />
        {renderSparkleEffects()}
      </div>
      <h1 className="title mt-2">Fortune Cookie</h1>
    </>
  );

  const renderOpenState = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md text-center space-y-6 animate-fade-in border border-yellow-100">
      <div className="flex justify-center">
        <div className="fortune-cookie-broken">
          <div className="cookie-half"></div>
          <div className="cookie-half"></div>
        </div>
      </div>

      <h2 className="text-xl font-medium fortune-title">Your Fortune</h2>
      
      <div className="py-4">
        <p className="italic text-center text-lg leading-relaxed text-gray-700">
          {fortune}
        </p>
      </div>

      <div className="pt-2">
        <h3 className="text-sm mb-4 lucky-numbers-title">Your Lucky Numbers</h3>
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {numbers.map((num, idx) => (
            <span
              key={`${num}-${idx}`}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md text-sm number-appear"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={resetCookie}
          className="fortune-button bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-2 rounded-full shadow-md hover:from-amber-500 hover:to-orange-600 transition"
        >
          Get Another Fortune
        </button>
      </div>
    </div>
  );

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-4 relative">
      {renderFloatingStars()}
      
      {status === "closed" && renderClosedState()}
      {status === "opening" && renderOpeningState()}
      {status === "open" && renderOpenState()}
    </section>
  );
}
