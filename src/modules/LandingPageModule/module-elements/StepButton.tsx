import React from 'react';
import { StepButtonProps } from '../interface';

export const StepButton: React.FC<StepButtonProps> = ({
  title,
  description,
  isSelected,
  step,
  setSelectedStep,
}) => {
  return (
    <button
      onClick={() => setSelectedStep(step)}
      className={`rounded-2xl bg-white h-1/3 text-start overflow-hidden  relative  transition-all hover:scale-[1.02] `}
    >
      <div
        className={`absolute transition-all bg-gradient-to-br from-[#4E87CB] to-[#2F1FE5] w-full h-full top-0 left-0 ${
          isSelected ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="flex w-full h-full items-start flex-col p-3 relative">
        <h3
          className={`font-bold text-2xl mb-3 ${
            isSelected ? 'text-white' : 'text-[#161d33]'
          } transition-all`}
        >
          {title}
        </h3>
        <p
          className={`text-sm font-medium ${
            isSelected ? 'text-blue-200' : 'text-[#2b3056]'
          } transition-all`}
        >
          {description}
        </p>
      </div>
    </button>
  );
};
