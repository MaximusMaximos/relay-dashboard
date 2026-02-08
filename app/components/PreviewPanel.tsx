import { motion } from 'framer-motion';
import { Model, PreviewOutput, GenerationHistoryItem } from '../../types';

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
}) {
  return (
    <div className="w-[400px] border-l border-white/[0.06] bg-[#0a0e1a] overflow-y-auto scrollbar-hide">
      <div className="p-6">
        {/* Preview/JSON Tabs */}
        <div className="flex gap-4 mb-4 border-b border-white/[0.08]">
          <button
            onClick={() => setPreviewView('preview')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              previewView === 'preview' ? 'text-white' : 'text-white/40 hover:text-white/60'
            }`}
          >
            Preview
            {previewView === 'preview' && (
              <motion.div 
                layoutId="previewTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffbc36]"
              />
            )}
          </button>
          <button
            onClick={() => setPreviewView('json')}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              previewView === 'json' ? 'text-white' : 'text-white/40 hover:text-white/60'
            }`}
          >
            JSON
            {previewView === 'json' && (
              <motion.div 
                layoutId="previewTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffbc36]"
              />
            )}
          </button>
          {previewOutput && (
            <button className="ml-auto text-xs text-white/50 hover:text-white/70 pb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
        </div>
        
        {previewView === 'preview' ? (
          <>
            {currentModel.previewType === 'text' ? (
              // Text output for OLLAMA/VLLM
              <div className="space-y-4 mb-6">
                {/* Output Section */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Output</h3>
                      <span className="text-xs text-white/40">48 words · 273 chars · 1 lines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-white/50 hover:text-white/70">MD</button>
                      <button className="text-white/50 hover:text-white/70">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="text-white/50 hover:text-white/70">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-white/70 leading-relaxed">
                    {previewOutput?.text || 'No output yet'}
                  </div>
                </div>

                {/* Reasoning Section */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">Reasoning</h3>
                      <span className="text-xs text-white/40">23 words · 126 chars · 1 lines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-white/50 hover:text-white/70">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="text-white/50 hover:text-white/70">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-white/70 leading-relaxed">
                    {previewOutput?.reasoning || 'No reasoning available'}
                  </div>
                </div>

                {/* Task ID */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">Task ID:</span>
                    <code className="text-xs text-white/70 font-mono">{previewOutput?.taskId || '—'}</code>
                  </div>
                </div>
              </div>
            ) : (
              // Image/Video preview
              <>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg aspect-video flex items-center justify-center mb-4 overflow-hidden">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-2 border-[#ffbc36] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-white/40">Generating...</span>
                    </div>
                  ) : previewOutput ? (
                    previewOutput.type === 'video' ? (
                      <video src={previewOutput.url} controls className="w-full h-full" />
                    ) : previewOutput.type === 'image' ? (
                      <img src={previewOutput.url} alt="Output" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-white/20 text-sm p-4">{previewOutput.text || 'Text output'}</div>
                    )
                  ) : (
                    <div className="text-white/20 text-sm">No preview yet</div>
                  )}
                </div>
                
                {/* Download Button */}
                {previewOutput && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mb-6 px-4 py-2.5 bg-[#ffbc36] hover:bg-[#ffbc36]/90 text-[#0c101c] rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ffbc36]/20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </motion.button>
                )}
              </>
            )}
          </>
        ) : (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-white/50">Response JSON</div>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white/70 hover:bg-white/[0.05] rounded transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <pre className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-4 text-xs text-white/70 font-mono overflow-auto max-h-96">
              {previewOutput ? JSON.stringify(previewOutput.json || {
                urls: [previewOutput.url]
              }, null, 2) : '{\n  // Response will appear here after generation\n}'}
            </pre>
          </div>
        )}

        {/* Generation History */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Created ({generationHistory.length})</h3>
          <div className="space-y-2">
            {generationHistory.map((item) => (
              <div key={item.id} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50">#{item.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    item.status === 'completed' ? 'bg-[#4ade7d]/20 text-[#4ade7d]' : 'bg-white/[0.05] text-white/40'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-white/30 mb-1">{item.date}</div>
                <div className="text-white/40">Duration: {item.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
