import React from 'react';
import { useDrag } from 'react-dnd';
import { DraggableItemProps } from '../../types/builder';
import { colorSchemes } from '../../types/website';

const DraggableItem: React.FC<DraggableItemProps> = ({ id, type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BUILDER_ELEMENT',
    item: { 
      id, 
      type,
      colorScheme: type === 'heading' || type === 'text' ? 'blue' : 'gray'
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${
        isDragging ? 'opacity-50 dragging' : 'opacity-100'
      } transition-opacity`}
      data-color-scheme={type === 'heading' || type === 'text' ? 'blue' : 'gray'}
    >
      {children}
    </div>
  );
};

export default DraggableItem;