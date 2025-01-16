export interface FeatureElementProps {
  title: string;
  description: string;
  imageLink: string;
}

export interface StepButtonProps {
  title: string;
  description: string;
  isSelected: boolean;
  step: number;
  setSelectedStep: (step: number) => void;
}
