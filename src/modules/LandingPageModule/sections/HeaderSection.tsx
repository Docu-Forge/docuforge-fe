import { Button } from '@/components/ui/button';
import React from 'react';
import { DEMO_VIDEO_LINK } from '../constant';

export const HeaderSection: React.FC = () => {
  return (
    <header className="min-h-screen mb-20 w-screen bg-[#0F172A] overflow-hidden relative">
      {/* Neon Effect */}
      <div className="absolute rounded-full blur-3xl w-[1000px] h-[1000px] bg-radial-gradient from-blue-700/50 via-purple-800/10 to-transparent animate-neon-move" />
      <div className="absolute right-0 rounded-full blur-3xl w-[600px] h-[600px] bg-radial-gradient from-cyan-500/20 via-blue-500/10 to-transparent animate-bounce-neon" />
      <div className="absolute left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-radial-gradient from-purple-800/30 via-violet-900/10 to-transparent blur-3xl animate-bounce-neon-purple" />

      {/* Container */}
      <div className="container flex flex-col pt-32 pb-28 items-center mx-auto relative">
        <h1 className="bg-gradient-to-r mb-6 from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center text-5xl font-bold">
          Smart Document Creation.
          <br />
          Powered by AI
        </h1>
        <p className="text-[#e0e3f9] mb-8 max-w-screen-md text-center">
          An intelligent platform that leverages AI to create documents in
          seconds. Simplify workflows, ensure accuracy, and save time with
          cutting-edge automation.
        </p>
        <Button className="mb-10">Try Now!</Button>
        <div className="w-full relative aspect-video max-w-screen-md p-4 bg-[#6f8af240] rounded-xl">
          <div className="absolute bottom-0 translate-y-[10%] inset-0 w-[600px] h-[450px] rounded-full blur-3xl  bg-gradient-to-r from-[#3B82F650] to-[#93C5FD50] mx-auto"></div>
          <iframe
            src={DEMO_VIDEO_LINK}
            title="Demo Video"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-xl w-full h-full relative"
          />
        </div>
      </div>
    </header>
  );
};
