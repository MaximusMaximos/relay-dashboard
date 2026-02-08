import { motion, AnimatePresence } from 'framer-motion';
import { Model } from '../../types';

interface ModelsGridProps {
  models: Model[];
  sourceName: string;
  currentSource: string;
  onModelClick: (model: Model) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
}

export default function ModelsGrid({ 
  models, 
  sourceName, 
  currentSource,
  onModelClick, 
  onboardingStep, 
  setOnboardingStep 
}) {
  return (
    <motion.div
      key="models"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Select a Model</h2>
        <p className="text-sm text-white/50">Choose from available {sourceName} models</p>
      </div>
      
      <div className="relative">
        <div 
          id="models-scroll"
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        >
          {models?.map((model, index) => (
            <motion.button
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => onModelClick(model)}
              className="group flex-shrink-0 w-52 rounded-xl backdrop-blur-xl transition-all duration-300 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] shadow-sm"
            >
              <div className="p-4">
                <div className="w-full h-28 rounded-lg mb-3 relative overflow-hidden bg-[#0a0e1a] border border-white/[0.06]">
                  {model.previewType === 'video' ? (
                    <video
                      src={model.preview}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : model.previewType === 'image' ? (
                    <img
                      src={model.preview}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl font-light text-white/20 tracking-tighter">{model.preview}</span>
                    </div>
                  )}
                </div>
                <div className="text-sm font-semibold mb-1 tracking-tight text-white/80 group-hover:text-white">
                  {model.name}
                </div>
                <div className="text-xs text-white/40 mb-3 line-clamp-2 leading-relaxed">
                  {model.desc}
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.06] backdrop-blur-xl rounded-md border border-white/[0.08]">
                  <span className="text-xs font-semibold text-[#ffbc36]">{model.price}</span>
                  <span className="text-[10px] text-white/30">/req</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        
        {models?.length > 4 && (
          <>
            <button
              onClick={() => {
                const container = document.getElementById('models-scroll');
                container?.scrollBy({ left: -220, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/[0.06] shadow-lg z-10"
            >
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const container = document.getElementById('models-scroll');
                container?.scrollBy({ left: 220, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/[0.06] shadow-lg z-10"
            >
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Onboarding Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-3xl mx-auto"
      >
        {/* Step Indicator */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { num: 1, title: 'Select Model', desc: 'Choose the best model for your needs' },
            { num: 2, title: 'Configure', desc: 'Set parameters and quality' },
            { num: 3, title: 'Generate', desc: 'Create and download content' }
          ].map(step => (
            <button
              key={step.num}
              onClick={() => setOnboardingStep(step.num)}
              className={`text-left rounded-lg p-3 transition-all ${
                onboardingStep === step.num
                  ? 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.04]'
                  : 'bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  onboardingStep === step.num ? 'bg-[#ffbc36]' : 'bg-white/[0.08]'
                }`}>
                  <span className={`text-xs font-bold ${
                    onboardingStep === step.num ? 'text-[#0c101c]' : 'text-white/40'
                  }`}>{step.num}</span>
                </div>
                <div className={`text-xs font-semibold transition-colors ${
                  onboardingStep === step.num ? 'text-white' : 'text-white/50'
                }`}>{step.title}</div>
              </div>
              <div className={`text-[11px] leading-snug transition-colors ${
                onboardingStep === step.num ? 'text-white/50' : 'text-white/30'
              }`}>{step.desc}</div>
            </button>
          ))}
        </div>

        {/* Dynamic Tips */}
        <AnimatePresence mode="wait">
          <motion.div
            key={onboardingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.06] rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4ade7d]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#4ade7d]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                {onboardingStep === 1 && (
                  <>
                    <div className="text-xs font-semibold text-white mb-1.5">💡 Choosing the right model</div>
                    <div className="space-y-1.5 text-[11px] text-white/60 leading-relaxed">
                      <p><span className="text-white/80 font-medium">Pricing:</span> "/req" means per request. Each generation costs one request.</p>
                      <p><span className="text-white/80 font-medium">Model names:</span> Don't worry about technical names! Check the description.</p>
                      <p><span className="text-white/80 font-medium">Not sure?</span> Start with the first model - they're popular for a reason!</p>
                    </div>
                  </>
                )}
                {onboardingStep === 2 && (
                  <>
                    <div className="text-xs font-semibold text-white mb-1.5">⚙️ Configuring your generation</div>
                    <div className="space-y-1.5 text-[11px] text-white/60 leading-relaxed">
                      <p><span className="text-white/80 font-medium">Required fields:</span> Look for the * symbol. These must be filled out.</p>
                      <p><span className="text-white/80 font-medium">Advanced Options:</span> Optional - skip them if you're just getting started!</p>
                      {(currentSource === 'image' || currentSource === 'automatic1111' || currentSource === 'video') && (
                        <>
                          <p><span className="text-white/80 font-medium">Quality:</span> Higher steps/resolution = better quality but slower.</p>
                          <p><span className="text-white/80 font-medium">Prompts:</span> Be specific! "Golden retriever puppy in sunny garden" works better than "dog".</p>
                        </>
                      )}
                      {currentSource === 'audio' && (
                        <>
                          <p><span className="text-white/80 font-medium">Audio files:</span> Upload clear audio. Supports MP3, WAV, M4A.</p>
                          <p><span className="text-white/80 font-medium">Text input:</span> Use natural sentences with punctuation!</p>
                        </>
                      )}
                      {(currentSource === 'ollama' || currentSource === 'vllm') && (
                        <>
                          <p><span className="text-white/80 font-medium">Reasoning:</span> Higher = deeper analysis but slower.</p>
                          <p><span className="text-white/80 font-medium">Prompts:</span> Be clear. "Explain X to a 10-year-old" works better than "explain X".</p>
                        </>
                      )}
                    </div>
                  </>
                )}
                {onboardingStep === 3 && (
                  <>
                    <div className="text-xs font-semibold text-white mb-1.5">🚀 Generating and downloading</div>
                    <div className="space-y-1.5 text-[11px] text-white/60 leading-relaxed">
                      <p><span className="text-white/80 font-medium">Generate:</span> Click the yellow button at the bottom to start.</p>
                      <p><span className="text-white/80 font-medium">Preview:</span> Result appears on the right. Switch Preview/JSON tabs.</p>
                      <p><span className="text-white/80 font-medium">Download:</span> Click download button below your content to save.</p>
                      <p className="pt-1.5 border-t border-white/[0.08] mt-2">
                        <span className="text-white/90 font-semibold">Ready to start?</span> Pick your model above! 👆
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
