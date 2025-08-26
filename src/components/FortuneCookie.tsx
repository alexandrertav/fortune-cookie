"use client";
import { useState } from "react";

const fortunes = [
  'Great things are coming your way.',
  'A thrilling time is in your near future.',
  'Now is the time to try something new.',
  'Your hard work will soon pay off.',
  'Happiness will find you when you least expect it.',
  'Adventure awaits around the corner.',
];

export default function FortuneCookie() {
  const [status, setStatus] = useState<"closed" | "opening" | "open">("closed");
  const [fortune, setFortune] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);

  const crackCookie = () => {
    if (status !== "closed") return; // evita bug de clique repetido

    setStatus("opening");

    
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setFortune(randomFortune);
    setNumbers(randomNumbers);

    
    setTimeout(() => {
      setStatus("open");
    }, 1000); // 1s de animação
  };

  const resetCookie = () => {
    setStatus("closed");
    setFortune("");
    setNumbers([]);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-4 relative">
      {/* Floating stars background */}
      <div className="stars-container">
        <div className="floating-star" style={{top: '35%', left: '35%'}}>✨</div>
        <div className="floating-star" style={{top: '25%', right: '35%'}}>⭐</div>
        <div className="floating-star" style={{top: '55%', left: '30%'}}>✨</div>
        <div className="floating-star" style={{top: '65%', right: '30%'}}>⭐</div>
        <div className="floating-star" style={{top: '40%', left: '65%'}}>✨</div>
        <div className="floating-star" style={{top: '50%', left: '20%'}}>⭐</div>
      </div>
  
  {status === "closed" && (
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
  )}

  {status === "opening" && (
    <>
      <div className="relative">
        <div className="fortune-cookie fortune-cookie-opening" />
        {/* Sparkle effects during opening */}
        <div className="sparkle-star" style={{top: '-10px', left: '-10px', animationDelay: '0.2s'}}>✨</div>
        <div className="sparkle-star" style={{top: '-10px', right: '-10px', animationDelay: '0.4s'}}>⭐</div>
        <div className="sparkle-star" style={{bottom: '-10px', left: '-10px', animationDelay: '0.6s'}}>✨</div>
        <div className="sparkle-star" style={{bottom: '-10px', right: '-10px', animationDelay: '0.8s'}}>⭐</div>
      </div>
      <h1 className="title mt-2">Fortune Cookie</h1>
    </>
  )}

{status === "open" && (
  <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md text-center space-y-6 animate-fade-in border border-yellow-100">
    
    
    <div className="flex justify-center">
      <div className="fortune-cookie-broken">
        <div className="cookie-half"></div>
        <div className="cookie-half"></div>
      </div>
    </div>

    <h2 className="text-lg font-medium text-amber-700">Your Fortune</h2>
    
    
    <div className="py-4">
      <p className="italic text-gray-700 text-center text-lg leading-relaxed">"{fortune}"</p>
    </div>

    
<div className="pt-2">
  <h3 className="text-sm text-gray-600 mb-4">Your Lucky Numbers</h3>
  <div className="flex justify-center flex-wrap gap-2 mb-6">
    {numbers.map((num, idx) => (
      <span
        key={idx}
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
)}
</section>
  );
}
