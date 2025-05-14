import React from 'react';
import { motion } from 'framer-motion';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  color?: string;
  hoverColor?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  color,
  hoverColor,
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: `${color || 'bg-blue-600'} ${hoverColor || 'hover:bg-blue-700'} text-white px-5 py-2.5`,
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5',
    text: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;