import React, { useState } from 'react';
import { motion } from 'framer-motion';

type InputProps = {
  label: string;
  type?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const hasValue = value.trim().length > 0;
  
  return (
    <div className={`relative mb-4 ${className}`}>
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? 'rgb(37, 99, 235)' : hasValue ? 'rgb(55, 65, 81)' : 'rgb(107, 114, 128)',
        }}
        className="absolute left-3 cursor-text transition-all origin-left"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>
      
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ''}
        className={`w-full px-3 py-3 border ${error ? 'border-red-500' : isFocused ? 'border-blue-500' : 'border-gray-300'} 
          rounded-lg transition-all focus:outline-none focus:ring-2 
          ${error ? 'focus:ring-red-200' : 'focus:ring-blue-200'}`}
        required={required}
      />
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;