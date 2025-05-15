import React, { useState, useRef, useEffect } from 'react';
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
  const [countdowns, setCountdowns] = useState<{ [key: string]: { target: number; remaining: string } }>({});

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const newCountdowns = { ...prev };
        Object.keys(newCountdowns).forEach(id => {
          const target = newCountdowns[id].target;
          const now = Date.now();
          const diff = target - now;
          if (diff <= 0) {
            newCountdowns[id].remaining = 'Time is up!';
          } else {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            newCountdowns[id].remaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          }
        });
        return newCountdowns;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCountdownSave = (sectionIdx: number, element: any) => {
    const targetDate = new Date(editingContent).getTime();
    if (!isNaN(targetDate)) {
      setCountdowns(prev => ({
        ...prev,
        [element.id]: { target: targetDate, remaining: '' }
      }));
      setSectionElements(prev => {
        const newSections = prev.map(arr => arr.map(el => ({ ...el })));
        newSections[sectionIdx] = newSections[sectionIdx].map(el =>
          el.id === element.id ? { ...el, content: editingContent } : el
        );
        return newSections;
      });
    }
    setEditingId(null);
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
        <div className="grid grid-cols-12 gap-4 md:gap-8" style={{ maxWidth: '100%', margin: '0 auto', padding: '0 1rem' }}>
          <div className="col-span-3 bg-white rounded-lg shadow-lg p-4 sticky top-8 h-fit">
            <h2 className="text-lg font-semibold mb-4">Elements</h2>
            <div className="space-y-2">
              <DraggableItem id="new-heading" type="heading">
                <div className={`p-3 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-100 hover:bg-${colorScheme}-200` : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Heading
                </div>
              </DraggableItem>
              <DraggableItem id="new-text" type="text">
                <div className={`p-3 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-100 hover:bg-${colorScheme}-200` : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Text Block
                </div>
              </DraggableItem>
              <DraggableItem id="new-image" type="image">
                <div className={`p-3 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-100 hover:bg-${colorScheme}-200` : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Image
                </div>
              </DraggableItem>
              <DraggableItem id="new-button" type="button">
                <div className={`p-3 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-100 hover:bg-${colorScheme}-200` : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Button
                </div>
              </DraggableItem>
              <DraggableItem id="new-spacer" type="spacer">
                <div className={`p-3 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-100 hover:bg-${colorScheme}-200` : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Spacer
                </div>
              </DraggableItem>
              <DraggableItem id="new-youtube" type="youtube">
                <div className={`p-3 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-100 hover:bg-${colorScheme}-200` : 'bg-gray-100 hover:bg-gray-200'}`}>
                  YouTube Embed
                </div>
              </DraggableItem>
              <DraggableItem id="new-countdown" type="countdown">
                <div className={`p-3 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-100 hover:bg-${colorScheme}-200` : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Countdown Timer
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
                  <DroppableZone 
                    onDrop={item => handleDrop(idx, item)}
                    colorScheme={colorScheme}
                  >
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
                                className={`text-2xl font-bold cursor-pointer ${colorScheme ? `text-${colorScheme}-700` : 'text-gray-800'}`}
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
                                className={`cursor-pointer ${colorScheme ? `text-${colorScheme}-600` : 'text-gray-600'}`}
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
                            <button className={`px-4 py-2 rounded transition-colors ${colorScheme ? `bg-${colorScheme}-500 hover:bg-${colorScheme}-600 text-white` : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                              {element.content || 'Button'}
                            </button>
                          )}
                          {element.type === 'spacer' && (
                            <div className="h-8" />
                          )}
                          {element.type === 'youtube' && (
                            editingId === element.id ? (
                              <input
                                type="text"
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                onBlur={() => handleSave(idx, element)}
                                onKeyDown={(e) => handleKeyDown(e, idx, element)}
                                className="w-full p-2 border rounded"
                                placeholder="Paste YouTube URL here"
                                autoFocus
                              />
                            ) : (
                              <div className="w-full flex flex-col items-center">
                                {element.content ? (
                                  <iframe
                                    width="100%"
                                    height="315"
                                    src={(() => {
                                      const url = element.content;
                                      if (url.includes('youtube.com/embed/')) return url;
                                      const match = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);
                                      return match ? `https://www.youtube.com/embed/${match[1]}` : url;
                                    })()}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                ) : (
                                  <div className="text-gray-500">No YouTube URL. <span className="underline cursor-pointer" onClick={() => handleEdit(element)}>Add URL</span></div>
                                )}
                                <button className="mt-2 text-blue-500 underline" onClick={() => handleEdit(element)}>
                                  {element.content ? 'Edit URL' : 'Add URL'}
                                </button>
                              </div>
                            )
                          )}
                          {element.type === 'countdown' && (
                            editingId === element.id ? (
                              <input
                                type="datetime-local"
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                onBlur={() => handleCountdownSave(idx, element)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleCountdownSave(idx, element);
                                  }
                                }}
                                className="w-full p-2 border rounded"
                                autoFocus
                              />
                            ) : (
                              <div className="w-full flex flex-col items-center">
                                {countdowns[element.id] ? (
                                  <div className="text-2xl font-bold">
                                    {countdowns[element.id].remaining}
                                  </div>
                                ) : (
                                  <div className="text-gray-500">No target date set. <span className="underline cursor-pointer" onClick={() => handleEdit(element)}>Set Date</span></div>
                                )}
                                <button className="mt-2 text-blue-500 underline" onClick={() => handleEdit(element)}>
                                  {countdowns[element.id] ? 'Edit Date' : 'Set Date'}
                                </button>
                              </div>
                            )
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