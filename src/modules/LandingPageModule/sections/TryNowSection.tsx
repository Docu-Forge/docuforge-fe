import { Button } from '@/components/ui/button';
import React from 'react';

export const TryNowSection: React.FC = () => {
  return (
    <section className="container relative max-w-screen-lg mb-20 flex justify-between items-center rounded-2xl mx-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 shadow-lg">
      <div className="mb-6">
        <span className="block text-lg font-semibold">DocuForge:</span>
        <h2 className="text-3xl font-bold">
          Simplifying Legal Needs in One Unified Platform
        </h2>
      </div>
      <Button className="bg-white text-blue-500 hover:text-white hover:bg-blue-600 transition-all px-6 py-3 rounded-lg shadow-md">
        Try Now!
      </Button>
    </section>
  );
};
