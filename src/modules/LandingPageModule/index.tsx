import React from 'react';
import {
  FaqSection,
  FeaturesSection,
  HeaderSection,
  TryNowSection,
  TutorialSection,
} from './sections';

export const LandingPageModule: React.FC = () => {
  return (
    <div className="bg-[#f5f5f9]">
      <HeaderSection />
      <div className="relative">
        <div className="absolute rounded-full blur-3xl w-[1000px] h-[1000px] bg-radial-gradient from-blue-300/30 via-purple-400/5 to-transparent animate-neon-move" />
        <div className="absolute right-0 rounded-full blur-3xl w-[600px] h-[600px] bg-radial-gradient from-cyan-100/20 via-blue-100/5 to-transparent animate-bounce-neon" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-radial-gradient from-purple-400/20 via-violet-500/5 to-transparent blur-3xl animate-bounce-neon-purple" />
        <FeaturesSection />
        <TutorialSection />
        <FaqSection />
        <TryNowSection />
      </div>
    </div>
  );
};
