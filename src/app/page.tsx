"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <div
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
          <button
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            Enter ✨
          </button>
          {error && (
            <p
              className="text-red-500 text-center"
            >
              Oops! That&apos;s not quite right 😅
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
