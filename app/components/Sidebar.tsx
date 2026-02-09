import { motion, AnimatePresence } from 'framer-motion';
import { Source } from '../types';

interface SidebarProps {
  sources: Source[];
  currentSource: string | null;
  onSourceClick: (sourceId: string) => void;
  canScrollDown: boolean;
  canScrollUp: boolean;
  onScrollDown: () => void;
  onScrollUp: () => void;
  onSidebarScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function Sidebar({ 
  sources, 
  currentSource, 
  onSourceClick, 
  canScrollDown,
  canScrollUp, 
  onScrollDown,
  onScrollUp, 
  onSidebarScroll 
}: SidebarProps) {
  return (
    <aside className="w-full md:w-96 lg:w-80 h-full bg-[#0a0e1a] border-r border-white/[0.06] relative flex-shrink-0">
      <div 
        id="sidebar-scroll"
        className="h-full overflow-y-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onScroll={onSidebarScroll}
      >
        <div className="p-4 pt-20 lg:pt-8 pb-48">
          <div className="text-[10px] font-semibold text-white/40 tracking-wider uppercase mb-3 px-3">
            Sources
          </div>
          
          <div className="space-y-2">
            {sources.map((source, index) => (
              <motion.button
                key={source.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ x: 2 }}
                onClick={() => onSourceClick(source.id)}
                className={`group w-full text-left px-3 py-3 rounded-lg transition-all duration-200 ${
                  currentSource === source.id
                    ? 'bg-white/[0.08] shadow-sm'
                    : 'hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className={`text-xl transition-transform group-hover:scale-110 ${
                    currentSource === source.id ? 'scale-110' : ''
                  }`}>
                    {source.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] font-semibold tracking-tight mb-0.5 ${
                      currentSource === source.id ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                    }`}>
                      {source.name}
                    </div>
                    <div className={`text-[12px] leading-snug ${
                      currentSource === source.id ? 'text-white/60' : 'text-white/40'
                    }`}>
                      {source.desc}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 ml-9 mb-1.5 flex-wrap">
                  {source.features?.map((feature, i) => (
                    <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded ${
                      currentSource === source.id 
                        ? 'bg-[#ffbc36]/20 text-[#ffbc36]' 
                        : 'bg-white/[0.05] text-white/40'
                    }`}>
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between ml-9">
                  <span className={`text-[11px] ${
                    currentSource === source.id ? 'text-white/50' : 'text-white/30'
                  }`}>
                    {source.count} models
                  </span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    currentSource === source.id 
                      ? 'bg-[#ffbc36]/20 text-[#ffbc36]' 
                      : 'bg-white/[0.05] text-white/40'
                  }`}>
                    {source.price}
                  </span>
                </div>
                {currentSource === source.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#ffbc36] rounded-r"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#0a0e1a] to-transparent pointer-events-none" />

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/95 to-transparent pointer-events-none" />
      
      {/* Scroll up arrow */}
      <AnimatePresence>
        {canScrollUp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onScrollUp}
            className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/[0.06] shadow-lg z-10"
          >
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll down arrow */}
      <AnimatePresence>
        {canScrollDown && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onScrollDown}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/[0.06] shadow-lg z-10"
          >
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
}