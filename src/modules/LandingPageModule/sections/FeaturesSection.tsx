import React from 'react';
import { FEATURES_LIST } from '../constant';
import { FeatureElement } from '../module-elements/FeatureElement';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="container mx-auto max-w-screen-xl mb-20 relative">
      <h2 className="font-bold text-4xl mb-14 text-center text-[#161d33] relative">
        <div className="absolute rounded-full top-0 -translate-y-1/2 left-20 blur-3xl w-[250px] h-[250px] bg-radial-gradient from-violet-500/30 via-purple-600/5 to-transparent" />
        Empower Your Legal Workflow with{' '}
        <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent font-bold text-4xl">
          DocuForge
        </span>
      </h2>
      <div className="grid grid-cols-3 gap-8 relative">
        {FEATURES_LIST.map((feature) => (
          <FeatureElement {...feature} />
        ))}
      </div>
    </section>
  );
};
