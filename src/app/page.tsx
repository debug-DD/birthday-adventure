"use client";
import { motion } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useState, useEffect } from "react";
import { HeartIcon, GiftIcon, PhotoIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';

const HEARTS = ["❤️", "💖", "💝", "💕", "💗", "💓"];

const Heart = ({ delay = 0, side = "left" }) => {
  const randomRotation = Math.random() * 360;
  const rotationSpeed = Math.random() > 0.5 ? 1 : -1;
  const spinAmount = 360 * (Math.floor(Math.random() * 3) + 1);
  const randomHeart = HEARTS[Math.floor(Math.random() * HEARTS.length)];

  return (
    <motion.div
      initial={{ 
        y: -100,
        x: side === "left" ? -20 : 20,
        rotate: randomRotation,
        scale: Math.random() * 0.5 + 0.5, // Random size between 0.5 and 1
      }}
      animate={{ 
        y: ["-10vh", "110vh"],
        x: [
          side === "left" ? -20 : 20,
          side === "left" ? -40 : 40
        ],
        rotate: [randomRotation, randomRotation + (spinAmount * rotationSpeed)]
      }}
      transition={{
        duration: Math.random() * 1 + 2,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="fixed z-0 text-3xl"
      style={{ 
        [side]: `${Math.random() * 15 + 5}%`,
        top: 0
      }}
    >
      {randomHeart}
    </motion.div>
  );
};

const IceCream = ({ delay = 0, side = "left" }) => {
  const randomRotation = Math.random() * 360;
  const rotationSpeed = Math.random() > 0.5 ? 1 : -1; // Randomly rotate clockwise or counterclockwise
  const spinAmount = 360 * (Math.floor(Math.random() * 3) + 1); // Random number of full spins (1-3)

  return (
    <motion.div
      initial={{ 
        y: -100,
        x: side === "left" ? -20 : 20,
        rotate: randomRotation
      }}
      animate={{ 
        y: ["-10vh", "110vh"],
        x: [
          side === "left" ? -20 : 20,
          side === "left" ? -40 : 40
        ],
        rotate: [randomRotation, randomRotation + (spinAmount * rotationSpeed)]
      }}
      transition={{
        duration: Math.random() * 1 + 2, // Random duration between 2-3 seconds
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="fixed z-0"
      style={{ 
        [side]: `${Math.random() * 15 + 5}%`,
        top: 0
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Cone */}
        <path
          d="M25 30L32 62L39 30"
          fill="#D4A676"
          stroke="#8B5E3C"
          strokeWidth="2"
        />
        {/* Ice Cream Scoops */}
        <circle
          cx="32"
          cy="18"
          r="16"
          fill="#FFB5E8"
          stroke="#FF69B4"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="26"
          r="12"
          fill="#FFE4E1"
          stroke="#FFB6C1"
          strokeWidth="2"
        />
        <circle
          cx="40"
          cy="26"
          r="12"
          fill="#FF9ECD"
          stroke="#FF69B4"
          strokeWidth="2"
        />
        {/* Sprinkles */}
        <path
          d="M26 12L28 14M34 10L36 12M30 8L32 10M38 14L40 16M22 16L24 18"
          stroke="#FF69B4"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace 'your-chosen-password' with whatever password you want
    if (password === 'nugget') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/wishes');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 text-center mb-6">
          Happy Birthday! 🎉
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the magic word..."
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                error ? 'border-red-400' : 'border-emerald-200'
              } focus:outline-none focus:border-emerald-400 transition-colors`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            Enter ✨
          </motion.button>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              Oops! That's not quite right 😅
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
