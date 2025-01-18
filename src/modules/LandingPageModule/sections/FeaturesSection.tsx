import React from 'react';
import { FEATURES_LIST } from '../constant';
import { FeatureElement } from '../module-elements/FeatureElement';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="container  overflow-hidden px-4 mx-auto max-w-screen-xl mb-20 relative">
      <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl mb-8 md:mb-14 text-center text-[#161d33] relative">
        <div className="absolute rounded-full top-0 -translate-y-1/2 left-0 md:left-20 blur-3xl w-[250px] h-[250px] bg-radial-gradient from-violet-500/30 via-purple-600/5 to-transparent" />
        Empower Your Legal Workflow with{' '}
        <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent font-bold ">
          DocuForge
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6 xl:gap-8 relative">
        {FEATURES_LIST.map((feature, index) => (
          <FeatureElement key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};
