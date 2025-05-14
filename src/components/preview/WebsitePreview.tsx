import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { WebsiteData, colorSchemes } from '../../types/website';
import PreviewHeader from './PreviewHeader';
import PreviewHero from './PreviewHero';
import PreviewAbout from './PreviewAbout';
import PreviewProducts from './PreviewProducts';
import PreviewContact from './PreviewContact';
import PreviewFooter from './PreviewFooter';
import CustomerReviews from './CustomerReviews';
import Button from '../ui/Button';
import { ChevronLeft, Download } from 'lucide-react';
import DraggableItem from '../builder/DraggableItem';
import DroppableZone from '../builder/DroppableZone';
import ElementToolbar from '../builder/ElementToolbar';
import { useBuilderStore } from '../../store/builderStore';

type WebsitePreviewProps = {
  websiteData: WebsiteData;
  onPrev: () => void;
};

const SECTION_COUNT = 7; // header, hero, about, products, reviews, contact, footer

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ websiteData, onPrev }) => {
  // Only use addElement if needed in the future
  // const { addElement, updateElement, deleteElement } = useBuilderStore();
  const { companyDetails, contactInfo, products } = websiteData;
  const colorScheme = companyDetails.colorScheme;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Array of arrays: one for each section
  const [sectionElements, setSectionElements] = useState<any[][]>(Array.from({ length: SECTION_COUNT }, () => []));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleDrop = (sectionIdx: number, element: any) => {
    setSectionElements(prev => {
      const newSections = prev.map(arr => [...arr]);
      // Give a unique id to each dropped element
      const newElement = { ...element, id: `${element.type}-${Date.now()}-${Math.random()}` };
      newSections[sectionIdx].push(newElement);
      return newSections;
    });
  };

  const handleEdit = (element: any) => {
    setEditingId(element.id);
    setEditingContent(element.content || '');
  };

  const handleSave = (sectionIdx: number, element: any) => {
    setSectionElements(prev => {
      const newSections = prev.map(arr => arr.map(el => ({ ...el })));
      newSections[sectionIdx] = newSections[sectionIdx].map(el =>
        el.id === element.id ? { ...el, content: editingContent } : el
      );
      return newSections;
    });
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionIdx: number, element: any) => {
    if (e.key === 'Enter') {
      handleSave(sectionIdx, element);
    }
  };

  const handleImageClick = (sectionIdx: number, element: any) => {
    if (fileInputRef.current) {
      // Store sectionIdx and element in the ref for use in upload
      (fileInputRef.current as any)._sectionIdx = sectionIdx;
      (fileInputRef.current as any)._element = element;
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const sectionIdx = (e.target as any)._sectionIdx ?? (fileInputRef.current as any)._sectionIdx;
    const element = (e.target as any)._element ?? (fileInputRef.current as any)._element;
    if (file && sectionIdx != null && element) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setSectionElements(prev => {
          const newSections = prev.map(arr => arr.map(el => ({ ...el })));
          newSections[sectionIdx] = newSections[sectionIdx].map(el =>
            el.id === element.id ? { ...el, content: imageUrl } : el
          );
          return newSections;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Section components in order
  const sectionComponents = [
    <PreviewHeader companyName={companyDetails.name} colorScheme={colorScheme} key="header" />,
    <PreviewHero companyName={companyDetails.name} tagline={companyDetails.tagline} colorScheme={colorScheme} key="hero" />,
    <PreviewAbout description={companyDetails.description} industry={companyDetails.industry} foundedYear={companyDetails.foundedYear} colorScheme={colorScheme} key="about" />,
    <PreviewProducts products={products} colorScheme={colorScheme} key="products" />,
    <CustomerReviews colorScheme={colorScheme} key="reviews" />,
    <PreviewContact contactInfo={contactInfo} colorScheme={colorScheme} key="contact" />,
    <PreviewFooter companyName={companyDetails.name} contactInfo={contactInfo} colorScheme={colorScheme} key="footer" />,
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Website Preview</h2>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            icon={<ChevronLeft size={18} />}
            iconPosition="left"
            onClick={onPrev}
          >
            Edit Information
          </Button>
          
          <Button
            variant="primary"
            color={colorSchemes[colorScheme].primary}
            hoverColor={colorSchemes[colorScheme].primaryHover}
            icon={<Download size={18} />}
            iconPosition="left"
          >
            Download Website
          </Button>
        </div>
      </div>
      
      <div className="overflow-auto max-h-[calc(100vh-220px)]">
        <div className="grid grid-cols-12 gap-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="col-span-3 bg-white rounded-lg shadow-lg p-4 sticky top-8 h-fit">
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
              <DraggableItem id="new-youtube" type="youtube">
                <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                  YouTube Embed
                </div>
              </DraggableItem>
              <DraggableItem id="new-countdown" type="countdown">
                <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                  Countdown Timer
                </div>
              </DraggableItem>
              <DraggableItem id="new-tooltip" type="tooltip">
                <div className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                  Tooltip
                </div>
              </DraggableItem>
            </div>
          </div>
          <div className="col-span-9">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <div className="space-y-4">
              {sectionComponents.map((SectionComponent, idx) => (
                <React.Fragment key={idx}>
                  {SectionComponent}
                  <DroppableZone onDrop={item => handleDrop(idx, item)}>
                    {sectionElements[idx].map((element) => (
                      <div key={element.id} className="relative group mb-4">
                        <ElementToolbar
                          element={element}
                          onUpdate={(id, updates) => {
                            setSectionElements(prev => {
                              const newSections = prev.map(arr => arr.map(el => ({ ...el })));
                              newSections[idx] = newSections[idx].map(el =>
                                el.id === id ? { ...el, ...updates } : el
                              );
                              return newSections;
                            });
                          }}
                          onDelete={(id) => {
                            setSectionElements(prev => {
                              const newSections = prev.map(arr => arr.filter(el => el.id !== id));
                              return newSections;
                            });
                          }}
                        />
                        <div className="p-4 bg-white rounded shadow">
                          {element.type === 'heading' && (
                            editingId === element.id ? (
                              <input
                                type="text"
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                onBlur={() => handleSave(idx, element)}
                                onKeyDown={(e) => handleKeyDown(e, idx, element)}
                                className="w-full p-2 border rounded"
                                autoFocus
                              />
                            ) : (
                              <h2 
                                className="text-2xl font-bold cursor-pointer" 
                                onClick={() => handleEdit(element)}
                              >
                                {element.content || 'Heading'}
                              </h2>
                            )
                          )}
                          {element.type === 'text' && (
                            editingId === element.id ? (
                              <textarea
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                onBlur={() => handleSave(idx, element)}
                                onKeyDown={(e) => handleKeyDown(e, idx, element)}
                                className="w-full p-2 border rounded"
                                autoFocus
                              />
                            ) : (
                              <p 
                                className="cursor-pointer" 
                                onClick={() => handleEdit(element)}
                              >
                                {element.content || 'Text block'}
                              </p>
                            )
                          )}
                          {element.type === 'image' && (
                            <div 
                              className="bg-gray-200 rounded flex items-center justify-center cursor-pointer" 
                              onClick={() => handleImageClick(idx, element)}
                            >
                              {element.content ? (
                                <img
                                  src={element.content}
                                  alt="Content"
                                  className="max-h-full"
                                />
                              ) : (
                                <span className="text-gray-500">Click to upload image</span>
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
                  </DroppableZone>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WebsitePreview;