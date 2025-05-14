import React from 'react';
import { useDrag } from 'react-dnd';
import { DraggableItemProps } from '../../types/builder';

const DraggableItem: React.FC<DraggableItemProps> = ({ id, type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BUILDER_ELEMENT',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } transition-opacity`}
    >
      {children}
    </div>
  );
};

export default DraggableItem;