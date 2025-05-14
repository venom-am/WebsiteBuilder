import React from 'react';
import { Trash2, Move, Edit } from 'lucide-react';
import { ElementToolbarProps } from '../../types/builder';

const ElementToolbar: React.FC<ElementToolbarProps> = ({
  element,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md rounded-md p-1 flex gap-1">
      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={() => {/* Open edit modal */}}
      >
        <Edit size={16} />
      </button>
      <button
        className="p-1 hover:bg-gray-100 rounded cursor-move"
      >
        <Move size={16} />
      </button>
      <button
        className="p-1 hover:bg-gray-100 rounded text-red-500"
        onClick={() => onDelete(element.id)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default ElementToolbar;