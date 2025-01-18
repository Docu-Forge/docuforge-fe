'use client';

import React, { useState } from 'react';
import { TUTORIAL_STEP } from '../constant';
import { StepButton } from '../module-elements/StepButton';
import Image from 'next/image';

export const TutorialSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  return (
    <section className="container sm:px-4 mx-auto  mb-20">
      <div className="bg-[#EFF2FF90] rounded-3xl p-4 sm:p-8 relative overflow-hidden">
        {/* Neon Effect */}
        <div className="absolute left-0 bottom-0 w-[1200px] h-[1200px] rounded-full bg-radial-gradient from-purple-300/20 via-violet-400/5 to-transparent blur-3xl "></div>
        <div className="absolute right-0 top-0 rounded-full blur-3xl w-[1000px] h-[1000px] bg-radial-gradient from-blue-200/30 via-purple-300/5 to-transparent " />

        <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-6 mb-10 text-center text-[#161d33] relative">
          How it Works
        </h2>
        <p className="text-sm sm:text-base text-[#2b3056] text-center relative font-medium mb-8 max-w-screen-lg mx-auto">
          Discover how DocuForge simplifies your workflow in just a few steps.
          Upload your details, let our AI-powered system generate precise legal
          documents. It's fast, accurate, and built to save you time.
        </p>
        <div className="flex flex-col lg:flex-row w-full gap-4 xl:gap-8 relative">
          <div className="relative w-full lg:w-1/2 xl:w-[60%] 2xl:w-2/3 aspect-video rounded-2xl overflow-hidden">
            <Image
              src={TUTORIAL_STEP[selectedStep - 1].imageLink}
              alt={TUTORIAL_STEP[selectedStep - 1].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col w-full lg:w-1/2 xl:w-[40%] 2xl:w-1/3 gap-2 sm:gap-4 xl:gap-6">
            {TUTORIAL_STEP.map((step, index) => (
              <StepButton
                key={index}
                {...step}
                isSelected={selectedStep === index + 1}
                step={index + 1}
                setSelectedStep={setSelectedStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
