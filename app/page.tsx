'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { modelData } from '@/data/modelData';
import { sources } from '@/data/sources';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ModelsGrid from './components/ModelsGrid';
import ConfigPanel from './components/ConfigPanel';
import PreviewPanel from './components/PreviewPanel';
import { Model, FormData, GenerationHistoryItem, PreviewOutput } from './types';

export default function Dashboard() {
  // State
  const [currentSource, setCurrentSource] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState<Model | null>(null);
  const [mode, setMode] = useState<string>('auto');
  const [configView, setConfigView] = useState<'configure' | 'json'>('configure');
  const [previewView, setPreviewView] = useState<'preview' | 'json'>('preview');
  const [formData, setFormData] = useState<FormData>({});
  const [balance] = useState<string>('$25.00');
  const [canScrollDown, setCanScrollDown] = useState<boolean>(false);
  const [canScrollUp, setCanScrollUp] = useState<boolean>(false);
  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryItem[]>([
    { id: 1, date: '1/1/2026, 7:05:00 PM', duration: '00:05', status: 'completed' }
  ]);
  const [previewOutput, setPreviewOutput] = useState<PreviewOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  // Lock body scroll when sidebar/preview is open on mobile
  useEffect(() => {
    if (sidebarOpen || previewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, previewOpen]);

  // Sidebar scroll detection
  useEffect(() => {
    const checkScroll = () => {
      const sidebar = document.getElementById('sidebar-scroll');
      if (sidebar) {
        const hasScroll = sidebar.scrollHeight > sidebar.clientHeight;
        const isAtTop = sidebar.scrollTop <= 10;
        const isAtBottom = sidebar.scrollHeight - sidebar.scrollTop <= sidebar.clientHeight + 10;
        
        setCanScrollUp(hasScroll && !isAtTop);
        setCanScrollDown(hasScroll && !isAtBottom);
      }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Set form defaults when model changes
  useEffect(() => {
    if (currentModel) {
      const defaults: FormData = {};
      Object.entries(currentModel.params).forEach(([key, param]) => {
        if (param.default) defaults[key] = param.default;
      });
      setFormData(defaults);
    } else {
      setFormData({});
    }
  }, [currentModel]);

  // Handlers
const handleSourceClick = (sourceId: string): void => {
  setCurrentSource(sourceId);
  setCurrentModel(null);
  setFormData({});
  setOnboardingStep(1);
  
  // On mobile, open sidebar when going back to sources (empty sourceId)
  if (!sourceId && window.innerWidth < 1024) {
    setSidebarOpen(true);
  } else {
    setSidebarOpen(false); // Close sidebar after selecting a source
  }
};

  const handleModelClick = (model: Model): void => {
    setCurrentModel(model);
  };

  const handleScrollDown = (): void => {
    const sidebar = document.getElementById('sidebar-scroll');
    if (sidebar) {
      sidebar.scrollBy({ top: 200, behavior: 'smooth' });
    }
  };

  const handleScrollUp = (): void => {
    const sidebar = document.getElementById('sidebar-scroll');
    if (sidebar) {
      sidebar.scrollBy({ top: -200, behavior: 'smooth' });
    }
  };

  const handleSidebarScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const element = e.target as HTMLDivElement;
    const hasScroll = element.scrollHeight > element.clientHeight;
    const isAtTop = element.scrollTop <= 10;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
    
    setCanScrollUp(hasScroll && !isAtTop);
    setCanScrollDown(hasScroll && !isAtBottom);
  };

  const handleGenerate = (): void => {
    if (!currentModel) return;
    
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setPreviewOutput({
        type: currentModel.previewType,
        url: currentModel.preview
      });
      setGenerationHistory([
        {
          id: generationHistory.length + 1,
          date: new Date().toLocaleString(),
          duration: '00:05',
          status: 'completed'
        },
        ...generationHistory
      ]);
      // Auto-open preview on mobile after generation
      if (window.innerWidth < 1024) {
        setPreviewOpen(true);
      }
    }, 2000);
  };

  const sourceModels: Model[] = modelData[currentSource || ''] || [];
  const sourceName: string = sources.find(s => s.id === currentSource)?.name || '';

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#0c101c]">
      <Navbar balance={balance} />

      <div className="flex min-h-[calc(100vh-57px)] lg:h-[calc(100vh-57px)] lg:overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            sources={sources}
            currentSource={currentSource}
            onSourceClick={handleSourceClick}
            canScrollDown={canScrollDown}
            canScrollUp={canScrollUp}
            onScrollDown={handleScrollDown}
            onScrollUp={handleScrollUp}
            onSidebarScroll={handleSidebarScroll}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 overflow-hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div 
              className="absolute left-0 top-0 bottom-0 w-full max-w-md overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar 
                sources={sources}
                currentSource={currentSource}
                onSourceClick={handleSourceClick}
                canScrollDown={canScrollDown}
                canScrollUp={canScrollUp}
                onScrollDown={handleScrollDown}
                onScrollUp={handleScrollUp}
                onSidebarScroll={handleSidebarScroll}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden bg-gradient-to-br from-[#0c101c] to-[#111727] flex flex-col lg:flex-row relative">
          
          {/* Faded Background Logo/Image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
             <img 
              src="/Images/relay-background.png" 
              alt="" 
              className="w-[70%] max-w-4xl h-auto object-contain grayscale"
             />
          </div>

          {/* Configuration Panel */}
          <div className="flex-1 p-4 md:p-6 z-10 overflow-x-hidden">
              <AnimatePresence mode="wait" key={`${currentSource}-${currentModel?.id || 'no-model'}`}>
              {!currentSource ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[50vh]"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl md:text-7xl mb-6"
                  >
                    ⚡
                  </motion.div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Select a source
                  </h1>
                  <p className="text-base md:text-lg text-white/50 mb-8 max-w-md text-center px-4">
                    Choose from the sidebar to get started with AI generation
                  </p>
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden px-8 py-4 bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] hover:from-[#ff9d36] hover:to-[#ffbc36] text-black font-semibold rounded-xl shadow-lg shadow-[#ffbc36]/20 transition-all hover:shadow-xl hover:shadow-[#ffbc36]/30 hover:scale-105"
                  >
                    Browse Sources
                  </button>
                </motion.div>
              ) : !currentModel ? (
                <ModelsGrid 
                  models={sourceModels}
                  sourceName={sourceName}
                  currentSource={currentSource}
                  onModelClick={handleModelClick}
                  onSourceClick={handleSourceClick}
                  onboardingStep={onboardingStep}
                  setOnboardingStep={setOnboardingStep}
                />
              ) : (
                <ConfigPanel 
                  currentModel={currentModel}
                  mode={mode}
                  setMode={setMode}
                  configView={configView}
                  setConfigView={setConfigView}
                  formData={formData}
                  setFormData={setFormData}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  onBack={() => setCurrentModel(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Preview Panel */}
          {currentModel && (
            <div className="hidden lg:block z-20 border-l border-white/[0.06] bg-[#0a0e1a]/50 backdrop-blur-md">
              <PreviewPanel 
                currentModel={currentModel}
                previewView={previewView}
                setPreviewView={setPreviewView}
                previewOutput={previewOutput}
                isGenerating={isGenerating}
                generationHistory={generationHistory}
              />
            </div>
          )}

          {/* Mobile Preview Button */}
          {currentModel && (
            <button
              onClick={() => setPreviewOpen(true)}
              className="lg:hidden fixed bottom-16 right-6 z-30 w-14 h-14 bg-gradient-to-br from-[#ffbc36] to-[#ff9d36] rounded-full flex items-center justify-center shadow-lg shadow-[#ffbc36]/30"
            >
              {previewOutput && !isGenerating ? (
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
            </button>
          )}

          {/* Mobile Preview Modal */}
          {previewOpen && currentModel && (
            <div 
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end"
              onClick={() => setPreviewOpen(false)}
            >
              <div 
                className="w-full bg-[#0a0e1a] rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag Handle */}
                <div className="p-4 flex justify-center border-b border-white/[0.06]">
                  <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                </div>
                
                {/* Preview Content */}
                <div className="flex-1 overflow-y-auto">
                  <PreviewPanel 
                    currentModel={currentModel}
                    previewView={previewView}
                    setPreviewView={setPreviewView}
                    previewOutput={previewOutput}
                    isGenerating={isGenerating}
                    generationHistory={generationHistory}
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="m-6 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
                >
                  Close Preview
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}