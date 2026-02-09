import { motion, AnimatePresence } from 'framer-motion';
import { Model, PreviewOutput, GenerationHistoryItem } from '../types';

interface PreviewPanelProps {
  currentModel: Model;
  previewView: 'preview' | 'json';
  setPreviewView: (view: 'preview' | 'json') => void;
  previewOutput: PreviewOutput | null;
  isGenerating: boolean;
  generationHistory: GenerationHistoryItem[];
}

export default function PreviewPanel({ 
  currentModel, 
  previewView, 
  setPreviewView, 
  previewOutput, 
  isGenerating, 
  generationHistory 
}: PreviewPanelProps) {
  return (
    <div className="w-full lg:w-[400px] h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Preview</h3>
          <div className="flex gap-1 bg-white/[0.05] rounded-lg p-1">
            <button
              onClick={() => setPreviewView('preview')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                previewView === 'preview'
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setPreviewView('json')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                previewView === 'json'
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {previewView === 'preview' ? (
          <div className="space-y-6">
            {/* Output Display */}
            <div className="aspect-video bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
              {isGenerating ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#ffbc36]/30 border-t-[#ffbc36] rounded-full animate-spin mx-auto mb-4" />
                    <div className="text-sm text-white/60">Generating...</div>
                  </div>
                </div>
              ) : previewOutput ? (
                <>
                  {previewOutput.type === 'image' && (
                    <img 
                      src={previewOutput.url} 
                      alt="Generated output"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {previewOutput.type === 'video' && (
                    <video 
                      src={previewOutput.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                  {previewOutput.type === 'text' && (
                    <div className="w-full h-full p-4 overflow-auto">
                      <pre className="text-sm text-white/80 whitespace-pre-wrap font-mono">
                        {previewOutput.url}
                      </pre>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {currentModel.previewType === 'image' && (
                      <img 
                        src={currentModel.preview} 
                        alt={currentModel.name}
                        className="w-full h-full object-cover opacity-50"
                      />
                    )}
                    {currentModel.previewType === 'video' && (
                      <video 
                        src={currentModel.preview}
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover opacity-50"
                      />
                    )}
                    {currentModel.previewType === 'text' && (
                      <>
                        <div className="text-5xl mb-4 opacity-20">📝</div>
                        <div className="text-sm text-white/40">
                          Click Generate to create output
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {previewOutput && !isGenerating && (
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] text-white rounded-lg text-sm font-medium transition-all border border-white/[0.08]">
                  Download
                </button>
                <button className="flex-1 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.08] text-white rounded-lg text-sm font-medium transition-all border border-white/[0.08]">
                  Share
                </button>
              </div>
            )}

            {/* Generation History */}
            <div>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-3">
                History
              </h4>
              <div className="space-y-2">
                {generationHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 hover:border-white/[0.12] transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70">{item.date}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === 'completed' 
                          ? 'bg-[#4ade7d]/10 text-[#4ade7d]'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-white/40">
                      Duration: {item.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-white/50">Response JSON</div>
              <button className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white/70 hover:bg-white/[0.05] rounded transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <pre className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 text-xs text-white/70 font-mono overflow-auto">
              {previewOutput 
                ? JSON.stringify(previewOutput, null, 2)
                : '// Output will appear here after generation'
              }
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}