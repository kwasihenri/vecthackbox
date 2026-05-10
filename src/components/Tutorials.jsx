import React, { useState } from 'react';
import { TUTORIALS } from '../constants';
import { Shield, ChevronRight, GraduationCap, Code, CheckCircle, ArrowLeft, Target, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Tutorials() {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="p-4 md:p-8 h-full bg-cyber-dark overflow-hidden flex flex-col font-mono">
      <div className="mb-6 md:mb-10">
        <div className="flex items-center gap-3 md:gap-4 mb-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-cyber-blue" />
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
              Terminal <span className="text-cyber-blue">Test Cases</span>
            </h2>
            <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
              Standard Operating Procedures & Field Scenarios
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-2 custom-scrollbar pb-12">
        {TUTORIALS.map((useCase, i) => (
          <motion.div
            key={useCase.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className="group relative bg-cyber-gray/20 border border-gray-800 rounded-2xl p-4 md:p-5 hover:border-cyber-blue/40 transition-all flex flex-col cursor-pointer hover:bg-cyber-blue/5"
            onClick={() => setSelectedCase(useCase)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 bg-cyber-blue/10 border border-cyber-blue/10 rounded text-[9px] font-black text-cyber-blue uppercase tracking-widest">
                {useCase.category}
              </span>
              <Info className="w-3 h-3 text-gray-600 group-hover:text-cyber-blue transition-colors" />
            </div>

            <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors uppercase truncate">
              {useCase.title}
            </h3>
            
            <p className="text-[11px] text-gray-500 leading-tight line-clamp-3 mb-4 font-sans italic">
              {useCase.description}
            </p>

            <div className="mt-auto pt-3 border-t border-gray-800 flex items-center justify-between">
              <span className="text-[10px] text-gray-600 font-bold uppercase">{useCase.steps.length} Stages</span>
              <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-cyber-blue group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-cyber-dark/80 backdrop-blur-sm" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-cyber-dark border border-gray-800 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[95vh] md:max-h-[90vh]"
            >
              <div className="p-4 md:p-8 border-b border-gray-800 bg-gray-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20 flex-shrink-0">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-cyber-blue" />
                  </div>
                  <div className="truncate">
                    <h3 className="text-lg md:text-2xl font-black text-white uppercase italic tracking-tighter truncate">{selectedCase.title}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] md:text-[10px] text-cyber-blue font-bold uppercase tracking-widest">{selectedCase.category}</span>
                       <span className="text-gray-700 font-bold text-xs hidden sm:inline">•</span>
                       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden sm:inline">Protocol Specification</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 md:p-2 hover:bg-gray-800 rounded-xl text-gray-500 hover:text-white transition-all flex-shrink-0"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar space-y-6 md:space-y-8">
                <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gray-900/40 border border-gray-800 italic text-gray-400 font-sans text-xs md:text-sm leading-relaxed">
                  {selectedCase.description}
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 flex items-center gap-2">
                    <GraduationCap className="w-3 h-3 md:w-4 md:h-4" />
                    Standard Operating Procedure
                  </h4>
                  
                  <div className="space-y-3 md:space-y-4">
                    {selectedCase.steps.map((step, idx) => (
                      <div key={idx} className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-cyber-gray/10 border border-gray-800/50 hover:border-cyber-blue/20 transition-all space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-gray-800 flex items-center justify-center text-[9px] md:text-[10px] font-black text-cyber-blue border border-gray-700">
                            {idx + 1}
                          </div>
                          <h5 className="font-bold text-white uppercase tracking-tight text-xs md:text-base">{step.title}</h5>
                        </div>
                        
                        <p className="text-gray-400 text-xs md:text-sm font-sans leading-relaxed pl-7 md:pl-9">
                          {step.content}
                        </p>

                        {step.code && (
                          <div className="pl-7 md:pl-9">
                            <div className="relative group/code">
                              <div className="absolute -inset-1 bg-cyber-blue/10 rounded-xl blur opacity-0 group-hover/code:opacity-100 transition duration-500" />
                              <div className="relative bg-black rounded-lg md:rounded-xl p-3 md:p-4 font-mono text-[10px] md:text-xs border border-gray-800 flex items-center justify-between gap-4">
                                <code className="text-cyber-blue truncate">$ {step.code}</code>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(step.code)}
                                  className="flex-shrink-0 text-[8px] md:text-[9px] font-black uppercase text-gray-600 hover:text-white transition-colors"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 border-t border-gray-800 bg-gray-900/30 mt-auto">
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="w-full py-3 md:py-4 bg-cyber-blue text-black font-black uppercase text-[10px] md:text-xs tracking-widest rounded-xl md:rounded-2xl hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center justify-center gap-2 md:gap-3"
                >
                  <CheckCircle className="w-4 h-4" />
                  Close Module
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
