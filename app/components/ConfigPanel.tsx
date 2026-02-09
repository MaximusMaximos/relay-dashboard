import { motion } from 'framer-motion';
import FormField from './FormField';
import { Model, FormData } from '../types';

interface ConfigPanelProps {
  currentModel: Model;
  mode: string;
  setMode: (mode: string) => void;
  configView: 'configure' | 'json';
  setConfigView: (view: 'configure' | 'json') => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function ConfigPanel({ 
  currentModel, 
  mode, 
  setMode, 
  configView, 
  setConfigView, 
  formData, 
  setFormData, 
  isGenerating, 
  onGenerate 
}: ConfigPanelProps) {
  return (
    <motion.div
      key="config"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header with Model Info and Mode */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">{currentModel.name}</h2>
          <p className="text-sm text-white/50">{currentModel.desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span>Mode:</span>
            <select 
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="bg-[#111727] border border-white/[0.08] rounded px-2 py-1 text-white text-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ffbc36]/40"
            >
              <option value="auto" className="bg-[#111727] text-white">Auto</option>
              <option value="direct" className="bg-[#111727] text-white">Direct</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/[0.08]">
        <button
          onClick={() => setConfigView('configure')}
          className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
            configView === 'configure' ? 'text-white' : 'text-white/40 hover:text-white/60'
          }`}
        >
          Configure
          {configView === 'configure' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffbc36]"
            />
          )}
        </button>
        <button
          onClick={() => setConfigView('json')}
          className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
            configView === 'json' ? 'text-white' : 'text-white/40 hover:text-white/60'
          }`}
        >
          JSON
          {configView === 'json' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffbc36]"
            />
          )}
        </button>
      </div>

      {/* Configuration Form */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {configView === 'configure' ? (
          <div className="grid grid-cols-3 gap-6 pb-6">
            {/* Left: Form Fields */}
            <div className="col-span-2 space-y-5">
              {Object.entries(currentModel.params).map(([key, param]) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-white/70 mb-2 tracking-wide uppercase">
                    {param.label}
                    {param.required && <span className="text-[#ffbc36] ml-1">*</span>}
                  </label>
                  <FormField 
                    fieldKey={key} 
                    param={param} 
                    formData={formData} 
                    setFormData={setFormData} 
                  />
                </div>
              ))}
            </div>

            {/* Right: Model Info Cards */}
            <div className="space-y-4">
              {/* Model Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
              >
                <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-3">Model Info</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Quality</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#ffbc36]" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Speed</span>
                    <span className="text-xs text-white font-medium">~30s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Type</span>
                    <span className="text-xs text-[#4ade7d]">{currentModel.previewType}</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
              >
                <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-3">Tips</h3>
                <ul className="space-y-2 text-xs text-white/50 leading-relaxed">
                  {currentModel.previewType === 'image' || currentModel.previewType === 'video' ? (
                    <>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Be specific in your prompts</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Higher steps = better quality</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Use negative prompts effectively</span>
                      </li>
                    </>
                  ) : currentModel.previewType === 'text' || currentModel.previewType === 'audio' ? (
                    <>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Clear input = better output</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Check audio quality before upload</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Longer audio = more processing time</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Review parameters before generating</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Start with default settings</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#ffbc36] flex-shrink-0">•</span>
                        <span>Adjust based on results</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>

              {/* Examples - Only for image/video */}
              {(currentModel.previewType === 'image' || currentModel.previewType === 'video') && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
                >
                  <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-3">Examples</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className="aspect-square rounded-lg overflow-hidden bg-white/[0.02] border border-white/[0.04] hover:border-[#ffbc36]/30 transition-all cursor-pointer group"
                      >
                        <div 
                          className="w-full h-full flex items-center justify-center text-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                          style={{ background: `linear-gradient(135deg, rgba(255,188,54,0.1) 0%, rgba(74,222,125,0.1) 100%)` }}
                        >
                          {currentModel.previewType === 'image' ? '🖼️' : '🎬'}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="pb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-white/50">Request JSON</div>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white/70 hover:bg-white/[0.05] rounded transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white/70 hover:bg-white/[0.05] rounded transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <pre className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 text-xs text-white/70 font-mono overflow-auto">
              {JSON.stringify({ 
                ...formData, 
                ...(currentModel.hiddenParams || {}),
                model: currentModel.name, 
                mode 
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
        <div>
          <div className="text-xs text-white/40 mb-1">Estimated cost</div>
          <div className="text-xl font-bold text-white">{currentModel.price}</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-8 py-3 bg-[#ffbc36] hover:bg-[#ffbc36]/90 text-[#0c101c] rounded-lg font-bold text-sm tracking-tight transition-all shadow-lg shadow-[#ffbc36]/20 hover:shadow-xl hover:shadow-[#ffbc36]/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </motion.button>
      </div>
    </motion.div>
  );
}