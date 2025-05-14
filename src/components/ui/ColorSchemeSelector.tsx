import React from 'react';
import { motion } from 'framer-motion';
import { colorSchemes } from '../../types/website';

type ColorSchemeOption = keyof typeof colorSchemes;

type ColorSchemeSelectorProps = {
  selectedScheme: ColorSchemeOption;
  onChange: (scheme: ColorSchemeOption) => void;
};

const ColorSchemeSelector: React.FC<ColorSchemeSelectorProps> = ({
  selectedScheme,
  onChange,
}) => {
  const options: ColorSchemeOption[] = ['blue', 'teal', 'purple', 'amber', 'rose'];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Color Scheme
      </label>
      <div className="flex space-x-4">
        {options.map((scheme) => (
          <motion.div
            key={scheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => onChange(scheme)}
          >
            <div
              className={`w-10 h-10 rounded-full ${colorSchemes[scheme].primary} 
                ${
                  selectedScheme === scheme
                    ? 'ring-2 ring-offset-2 ring-gray-400'
                    : ''
                }`}
            />
            <p className="text-xs text-center mt-1 capitalize">{scheme}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ColorSchemeSelector;