import { create } from 'zustand';
import { BuilderElement } from '../types/builder';

interface BuilderStore {
  elements: BuilderElement[];
  addElement: (element: BuilderElement) => void;
  updateElement: (id: string, updates: Partial<BuilderElement>) => void;
  deleteElement: (id: string) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  elements: [],
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),
  deleteElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),
  reorderElements: (startIndex, endIndex) =>
    set((state) => {
      const newElements = [...state.elements];
      const [removed] = newElements.splice(startIndex, 1);
      newElements.splice(endIndex, 0, removed);
      return { elements: newElements };
    }),
}));