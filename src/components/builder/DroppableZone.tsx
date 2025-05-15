import React from 'react';
import { useDrop } from 'react-dnd';
import { DroppableZoneProps, BuilderElement } from '../../types/builder';
import { colorSchemes, CompanyDetails } from '../../types/website';

interface ExtendedDroppableZoneProps extends DroppableZoneProps {
  colorScheme?: CompanyDetails['colorScheme'];
}

const DroppableZone: React.FC<ExtendedDroppableZoneProps> = ({ onDrop, children, colorScheme = 'blue' }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BUILDER_ELEMENT',
    drop: (item: Partial<BuilderElement>) => {
      if (item.type) {
        const newElement: BuilderElement = {
          id: Date.now().toString(),
          type: item.type,
          content: '',
          styles: {},
        };
        onDrop(newElement);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const scheme = colorSchemes[colorScheme];

  // Function to darken a hex color
  const darkenColor = (hex: string, amount: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
    const b = Math.max(0, (num & 0x0000FF) - amount);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  };

  const primaryColor = scheme.primary;
  const darkerColor = darkenColor(primaryColor, 40); // Darken by 40 units

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed rounded-lg p-4 transition-colors ${!children ? 'min-h-[32px]' : ''}`}
      style={{
        borderColor: isOver ? darkerColor : '#D1D5DB',
        backgroundColor: isOver ? `${darkerColor}40` : 'transparent', // 40% opacity
        color: isOver ? scheme.text : 'inherit'
      }}
    >
      {children}
    </div>
  );
};

export default DroppableZone;