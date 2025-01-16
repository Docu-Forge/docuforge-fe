'use client';

import { LogInIcon, UserPenIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolledToScreen, setIsScrolledToScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled to the bottom of the screen height
      if (window.scrollY >= window.innerHeight) {
        setIsScrolledToScreen(true);
      } else {
        setIsScrolledToScreen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full py-4 transition-colors duration-300 overflow-hidden  ${
        isScrolledToScreen ? 'bg-[#0F172A] shadow-md' : 'bg-transparent'
      }`}
    >
      {isScrolledToScreen && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2  w-[400px] h-[400px] rounded-full bg-radial-gradient from-purple-700/50 via-violet-800/10 to-transparent blur-3xl" />
      )}
      <div className="container mx-auto flex justify-between relative">
        <div className="flex items-center gap-4">
          <div className="relative w-10 aspect-square">
            <Image
              src={'/logo-no-background.png'}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent font-bold text-3xl">
            DocuForge
          </span>
        </div>

        <div className="flex gap-10">
          <button className="text-[#e0e3f9] gap-2 flex items-center">
            <span>Register</span>
            <UserPenIcon />
          </button>
          <button className="text-[#e0e3f9] gap-2 flex items-center">
            <span>Login</span>
            <LogInIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};
