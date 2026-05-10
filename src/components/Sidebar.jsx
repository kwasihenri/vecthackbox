import React, { useState } from 'react';
import { Terminal, Lightbulb, BookOpen, ShieldAlert, Cpu, Plus, History, Trash2, Edit2, Check, X } from 'lucide-react';
import logo from '../images/logo.png';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Sidebar({ 
  isOpen,
  onClose,
  activeView, 
  onViewChange, 
  sessions = [], 
  currentSessionId, 
  onSessionSelect, 
  onNewSession,
  onDeleteSession,
  onRenameSession
}) {
  const items = [
    { id: 'chat', label: 'AI Terminal', icon: Terminal },
    { id: 'prompts', label: 'Prompts', icon: Lightbulb },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
  ];

  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const startEditing = (session) => {
    setEditingSessionId(session.id);
    setEditValue(session.name);
  };

  const cancelEditing = () => {
    setEditingSessionId(null);
    setEditValue('');
  };

  const commitEditing = (id) => {
    if (editValue.trim()) {
      onRenameSession(id, editValue.trim());
    }
    setEditingSessionId(null);
  };

  const sidebarContent = (
    <div className="w-72 border-r border-gray-800 bg-cyber-dark/80 lg:bg-cyber-dark/50 backdrop-blur-xl flex flex-col h-screen overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
            <img src={logo} alt="VecthackBox Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-cyber-green tracking-tighter uppercase">Vecthack</h1>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-none">Security Lab</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4">
        {/* Main Nav */}
        <nav className="px-4 space-y-1 mb-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                activeView === item.id 
                  ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20" 
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                activeView === item.id ? "text-cyber-green" : "text-gray-500 group-hover:text-gray-300"
              )} />
              <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sessions History */}
        <div className="px-4">
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-2 text-gray-500">
              <History className="w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">History</span>
            </div>
            <button 
              onClick={onNewSession}
              className="p-1 hover:bg-gray-800 rounded-md text-cyber-green transition-colors"
              title="New Session"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          
          <div className="space-y-1 overflow-y-auto custom-scrollbar pr-1">
            {sessions.map(session => (
              <div 
                key={session.id}
                className={cn(
                  "group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer border transition-all",
                  currentSessionId === session.id 
                    ? "bg-gray-800/50 border-gray-700 text-gray-200" 
                    : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/30"
                )}
                onClick={() => {
                  if (editingSessionId !== session.id) {
                    onSessionSelect(session.id);
                    onViewChange('chat');
                  }
                }}
              >
                {editingSessionId === session.id ? (
                  <div className="flex items-center gap-1 flex-1">
                    <input 
                      autoFocus
                      className="bg-black/40 border border-cyber-green/30 rounded px-1 py-0.5 text-[11px] font-mono w-full outline-none text-cyber-green"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitEditing(session.id);
                        if (e.key === 'Escape') cancelEditing();
                      }}
                    />
                    <button onClick={() => commitEditing(session.id)} className="p-0.5 text-cyber-green hover:bg-gray-700 rounded">
                      <Check className="w-3 h-3" />
                    </button>
                    <button onClick={cancelEditing} className="p-0.5 text-gray-500 hover:bg-gray-700 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 truncate">
                      <Terminal className={cn("w-3 h-3 flex-shrink-0", currentSessionId === session.id ? "text-cyber-green" : "text-gray-600")} />
                      <span className="text-[11px] font-mono truncate">{session.name}</span>
                    </div>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(session);
                        }}
                        className="p-1 hover:text-cyber-blue transition-colors"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                        className="p-1 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-gray-800">
        <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Ops Security</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
            Data encrypted. Verify all signatures before execution. AI can hallucinate signatures.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        {sidebarContent}
      </div>
    </>
  );
}

