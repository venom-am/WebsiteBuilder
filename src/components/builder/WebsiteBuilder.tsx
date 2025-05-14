import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useBuilderStore } from '../../store/builderStore';
import DraggableItem from './DraggableItem';
import DroppableZone from './DroppableZone';
import ElementToolbar from './ElementToolbar';
import { BuilderElement } from '../../types/builder';

const WebsiteBuilder: React.FC = () => {
  const { elements, addElement, updateElement, deleteElement } = useBuilderStore();

  const handleDrop = (element: BuilderElement) => {
    addElement(element);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar with draggable elements */}
            <div className="col-span-3 bg-white rounded-lg shadow-lg p-4 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Elements</h2>
              <div className="space-y-2">
                <DraggableItem id="new-heading" type="heading">
                  <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                    Heading
                  </div>
                </DraggableItem>
                <DraggableItem id="new-text" type="text">
                  <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                    Text Block
                  </div>
                </DraggableItem>
                <DraggableItem id="new-image" type="image">
                  <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                    Image
                  </div>
                </DraggableItem>
                <DraggableItem id="new-button" type="button">
                  <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                    Button
                  </div>
                </DraggableItem>
                <DraggableItem id="new-spacer" type="spacer">
                  <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                    Spacer
                  </div>
                </DraggableItem>
              </div>
            </div>

            {/* Main content area */}
            <div className="col-span-9">
              <DroppableZone onDrop={handleDrop}>
                <div className="space-y-4">
                  {elements.map((element) => (
                    <div key={element.id} className="relative group">
                      <ElementToolbar
                        element={element}
                        onUpdate={updateElement}
                        onDelete={deleteElement}
                      />
                      <div className="p-4 bg-white rounded shadow">
                        {element.type === 'heading' && (
                          <h2 className="text-2xl font-bold">
                            {element.content || 'Heading'}
                          </h2>
                        )}
                        {element.type === 'text' && (
                          <p>{element.content || 'Text block'}</p>
                        )}
                        {element.type === 'image' && (
                          <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
                            {element.content ? (
                              <img
                                src={element.content}
                                alt="Content"
                                className="max-h-full"
                              />
                            ) : (
                              <span className="text-gray-500">Image placeholder</span>
                            )}
                          </div>
                        )}
                        {element.type === 'button' && (
                          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                            {element.content || 'Button'}
                          </button>
                        )}
                        {element.type === 'spacer' && (
                          <div className="h-8" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DroppableZone>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default WebsiteBuilder;