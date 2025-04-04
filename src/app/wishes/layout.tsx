"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WishesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
} 