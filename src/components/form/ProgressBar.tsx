import React from 'react';
import { motion } from 'framer-motion';

type ProgressBarProps = {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
  className?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`${className} mb-8`}>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div 
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onStepClick(index)}
            >
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.div>
              <span className={`text-xs mt-1 text-center ${index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="w-full h-1 bg-gray-200 mx-2 flex-grow">
                <motion.div 
                  className="h-full bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: index < currentStep ? '100%' : index === currentStep ? '50%' : '0%' 
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;