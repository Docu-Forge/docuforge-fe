import React from 'react';
import { FeatureElementProps } from '../interface';
import Image from 'next/image';

export const FeatureElement: React.FC<FeatureElementProps> = ({
  title,
  description,
  imageLink,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4">
      <h3 className="text-2xl text-[#161d33]  py-3 font-bold">{title}</h3>
      <p className="text-[#2b3056] pb-3">{description}</p>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Image src={imageLink} alt={title} fill className="object-cover" />
      </div>
    </div>
  );
};
