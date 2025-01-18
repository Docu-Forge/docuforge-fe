import { Button } from '@/components/ui/button';
import React from 'react';

export const TryNowSection: React.FC = () => {
  return (
    <section className="container px-4 relative max-w-screen-lg mb-20  mx-auto  text-white ">
      <div className="flex flex-col md:flex-row justify-between items-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 shadow-lg">
        <div className="mb-6">
          <span className="block text-base  md:text-lg font-semibold text-center md:text-start">
            DocuForge:
          </span>
          <h2 className="text-xl md:text-3xl font-bold text-center md:text-start">
            Simplifying Legal Needs in One Unified Platform
          </h2>
        </div>
        <Button className="bg-white text-blue-500 hover:text-white hover:bg-blue-600 transition-all px-6 py-3 rounded-lg shadow-md">
          Try Now!
        </Button>
      </div>
    </section>
  );
};
