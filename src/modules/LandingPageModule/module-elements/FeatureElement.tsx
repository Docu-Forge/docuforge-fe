import React from 'react';
import { FeatureElementProps } from '../interface';
import Image from 'next/image';

export const FeatureElement: React.FC<FeatureElementProps> = ({
  title,
  description,
  imageLink,
}) => {
  return (
    <div className="bg-white flex flex-col justify-between rounded-2xl p-4">
      <div>
        <h3 className="text-lg lg:text-xl xl:text-2xl text-[#161d33]  py-1 lg:py-3 font-bold">
          {title}
        </h3>
        <p className="text-[#2b3056] pb-3 text-sm lg:text-base">
          {description}
        </p>
      </div>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Image src={imageLink} alt={title} fill className="object-cover" />
      </div>
    </div>
  );
};
