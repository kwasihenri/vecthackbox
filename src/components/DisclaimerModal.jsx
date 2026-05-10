import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

export default function DisclaimerModal({ isOpen, onAccept }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-cyber-dark border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-gray-800">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">Protocol Acceptance Required</h2>
              <p className="text-gray-400">
                You are entering the VecthackBox educational environment. Please acknowledge the following operational constraints.
              </p>
            </div>

            <div className="p-8 space-y-4 max-h-[40vh] overflow-y-auto">
              {[
                "Techniques provided are for legal, educational, and authorized research purposes only.",
                "Unauthorized access to computer systems is illegal and violates ethical standards.",
                "The AI mentor can provide incorrect technical guidance; always verify commands.",
                "You are responsible for your own actions and the security of your test environment."
              ].map((point, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1 w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:border-cyber-blue transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-cyber-blue" />
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-tight font-mono leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-gray-900/30 flex items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-gray-500 hover:text-gray-400 transition-colors cursor-pointer text-xs uppercase tracking-widest font-mono">
                <ExternalLink className="w-4 h-4" />
                <span>Learn more</span>
              </div>
              <button
                onClick={onAccept}
                className="flex items-center gap-3 px-8 py-4 bg-cyber-green text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all active:scale-95 group"
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="uppercase tracking-widest">Acknowledge & Access</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
