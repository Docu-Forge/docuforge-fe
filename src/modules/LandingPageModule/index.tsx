'use client'
import React from 'react';
import {
  FaqSection,
  FeaturesSection,
  HeaderSection,
  TryNowSection,
  TutorialSection,
} from './sections';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export const LandingPageModule: React.FC = () => {
  const router = useRouter();
  return (
    <div className="bg-[#f5f5f9]">
      <HeaderSection />
      <div className="relative overflow-hidden">
        <div className="absolute rounded-full blur-3xl w-[1000px] h-[1000px] bg-radial-gradient from-blue-300/30 via-purple-400/5 to-transparent animate-neon-move" />
        <div className="absolute right-0 rounded-full blur-3xl w-[600px] h-[600px] bg-radial-gradient from-cyan-100/20 via-blue-100/5 to-transparent animate-bounce-neon" />
        <div className="absolute left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-radial-gradient from-purple-400/20 via-violet-500/5 to-transparent blur-3xl animate-bounce-neon-purple" />
        <FeaturesSection />
        <TutorialSection />
        <FaqSection />
        <TryNowSection />
        <TooltipProvider>
          <Tooltip >
            <TooltipTrigger className='fixed bottom-8 right-8 z-99999'>
              <Button variant="outline" onClick={()=>router.push("/chatbot")}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>Chat</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with our AI Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </div>
  );
};
