import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WebsiteProvider } from './context/WebsiteContext';
import LandingPage from './pages/LandingPage';
import WebsiteBuilder from './pages/WebsiteBuilder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <WebsiteProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<WebsiteBuilder />} />
          </Routes>
        </WebsiteProvider>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;