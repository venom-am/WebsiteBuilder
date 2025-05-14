import React from 'react';
import { useDrop } from 'react-dnd';
import { DroppableZoneProps, BuilderElement } from '../../types/builder';

const DroppableZone: React.FC<DroppableZoneProps> = ({ onDrop, children }) => {
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

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed rounded-lg p-4 ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } transition-colors ${!children ? 'min-h-[32px]' : ''}`}
    >
      {children}
    </div>
  );
};

export default DroppableZone;