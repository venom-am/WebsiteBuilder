import { ReactNode } from 'react';

export type ElementType = 'heading' | 'text' | 'image' | 'button' | 'spacer' | 'youtube' | 'countdown' | 'tooltip';

export interface BuilderElement {
  id: string;
  type: ElementType;
  content: string;
  styles: {
    [key: string]: string;
  };
}

export interface DraggableItemProps {
  id: string;
  type: ElementType;
  children: ReactNode;
}

export interface DroppableZoneProps {
  onDrop: (item: BuilderElement) => void;
  children: ReactNode;
}

export interface ElementToolbarProps {
  element: BuilderElement;
  onUpdate: (id: string, updates: Partial<BuilderElement>) => void;
  onDelete: (id: string) => void;
}