'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      const defaults = {};
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
    }, 2000);
  };

  const sourceModels: Model[] = modelData[currentSource || ''] || [];
  const sourceName: string = sources.find(s => s.id === currentSource)?.name || '';

  return (
    <div className="min-h-screen bg-[#0c101c]">
      <Navbar balance={balance} />

      <div className="flex h-[calc(100vh-57px)]">
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden bg-gradient-to-br from-[#0c101c] to-[#111727] flex relative">
          
          {/* Faded Background Logo/Image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
             <img 
              src="/Images/relay-background.png" 
              alt="" 
              className="w-[70%] max-w-4xl h-auto object-contain grayscale"
             />
          </div>

          {/* Configuration Panel */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide z-10">
            <AnimatePresence mode="wait" key={`${currentSource}-${currentModel?.id || 'no-model'}`}>
              {!currentSource ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl mb-4"
                  >
                    ⚡
                  </motion.div>
                  <div className="text-lg font-medium text-white/90 mb-1">Select a source</div>
                  <div className="text-sm text-white/40">Choose from the sidebar to get started</div>
                </motion.div>
              ) : !currentModel ? (
                <ModelsGrid 
                  models={sourceModels}
                  sourceName={sourceName}
                  currentSource={currentSource}
                  onModelClick={handleModelClick}
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
                />
              )}
            </AnimatePresence>
          </div>

          {/* Preview Panel */}
          {currentModel && (
            <div className="z-20 border-l border-white/[0.06] bg-[#0a0e1a]/50 backdrop-blur-md">
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
        </main>
      </div>
    </div>
  );
}