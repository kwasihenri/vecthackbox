import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Bot, User, Loader2, Eraser, Download, FileJson, Copy, Check, Share2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { aiService } from '../services/ai';
import { motion, AnimatePresence } from 'motion/react';

export default function ChatInterface({ session, onUpdateMessages, onToggleSidebar, prefillValue = '', onClearPrefill }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (prefillValue) {
      setInput(prefillValue);
      if (onClearPrefill) onClearPrefill();
    }
  }, [prefillValue, onClearPrefill]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.messages, isLoading]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    const newMessages = [...session.messages, userMessage];
    onUpdateMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.generateContent(newMessages);

      const modelMessage = {
        role: 'model',
        content: response.text || 'Error: No response from terminal. Check connection.',
        timestamp: Date.now()
      };

      onUpdateMessages([...newMessages, modelMessage]);
    } catch (error) {
      console.error(error);
      onUpdateMessages([...newMessages, {
        role: 'model',
        content: '!! EXCEPTION DETECTED: Unable to connect to AI core. Please check your GEMINI_API_KEY.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const exportMarkdown = () => {
    const md = session.messages.map(m => (
      `### ${m.role === 'user' ? 'Operator' : 'Mentor'} (${new Date(m.timestamp).toLocaleString()})\n\n${m.content}\n\n---`
    )).join('\n\n');
    
    const blob = new Blob([`# VecthackBox Session: ${session.name}\n\n${md}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${session.name.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printProtocol = () => {
    window.print();
  };

  const copyToClipboard = () => {
    const text = session.messages.map(m => `[${m.role.toUpperCase()}] ${m.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-cyber-dark overflow-hidden font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-800 bg-gray-900/30">
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 -ml-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <Terminal className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse hidden xs:block" />
            <span className="text-xs font-bold text-cyber-green uppercase tracking-widest truncate max-w-[120px] md:max-w-none">
              {session.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button 
            onClick={copyToClipboard}
            className="p-1.5 md:p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-gray-300 transition-colors"
            title="Copy Text"
          >
            {copied ? <Check className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            onClick={exportMarkdown}
            className="p-1.5 md:p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2"
            title="Export Markdown"
          >
            <Download className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase hidden md:inline">MD</span>
          </button>
          <div className="hidden sm:flex items-center gap-1 md:gap-2">
            <button 
              onClick={printProtocol}
              className="p-1.5 md:p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2"
              title="Print/Save as PDF"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase hidden md:inline">PDF</span>
            </button>
            <div className="w-px h-4 bg-gray-800 mx-1" />
            <button 
              onClick={() => onUpdateMessages([{
                role: 'model',
                content: 'System memory purged. Standby for new query.',
                timestamp: Date.now()
              }])}
              className="p-1.5 md:p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
              title="Clear Messages"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {session.messages.map((m, i) => (
            <motion.div
              key={m.timestamp + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  m.role === 'user' 
                    ? 'bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue' 
                    : 'bg-cyber-green/10 border border-cyber-green/30 text-cyber-green'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                  {m.role === 'user' ? 'Operator' : 'Mentor'}
                </span>
              </div>
              
              <div className={`flex flex-col w-full sm:max-w-[90%] md:max-w-4xl ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 md:px-5 py-3 md:py-4 rounded-2xl w-full ${
                  m.role === 'user'
                    ? 'bg-gray-800/30 text-gray-200 border border-gray-700/50 ml-auto'
                    : 'bg-cyber-gray/30 text-gray-300 border border-gray-800/50 terminal-glow mr-auto'
                }`}>
                  <div className="prose prose-invert prose-code:text-cyber-green prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-800 text-sm md:text-base leading-relaxed max-w-none break-words">
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
                <span className="mt-2 text-[8px] md:text-[10px] text-gray-700 uppercase tracking-widest font-bold">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Bot className="w-4 h-4 text-cyber-green/50" />
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black animate-pulse">Mentor</span>
            </div>
            <div className="flex flex-col items-start w-full">
              <div className="px-5 py-4 rounded-2xl bg-cyber-gray/20 border border-cyber-green/10 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-cyber-green animate-spin" />
                <span className="text-[10px] md:text-xs text-cyber-green/70 animate-pulse tracking-widest font-black uppercase">Executing Payload...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-cyber-dark/80 backdrop-blur-xl border-t border-gray-800">
        <form 
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
          <div className="relative flex items-center bg-gray-900 border border-gray-800 rounded-2xl p-2 transition-all focus-within:border-cyber-green/50 focus-within:ring-1 focus-within:ring-cyber-green/20">
            <div className="px-4 text-gray-500">
              <Terminal className="w-5 h-5 transition-colors group-focus-within:text-cyber-green" />
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={isLoading ? "Analyzing..." : "Enter technical query or prompt signature..."}
              disabled={isLoading}
              rows={Math.min(input.split('\n').length, 5)}
              className="flex-1 bg-transparent border-none py-3 outline-none text-gray-300 placeholder:text-gray-600 text-sm font-mono tracking-tight resize-none min-h-[44px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-cyber-green/10 hover:bg-cyber-green text-cyber-green hover:text-black rounded-xl transition-all disabled:opacity-30"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">
          Encrypted Connection Secure • Authorized Operators Shared
        </p>
      </div>
    </div>
  );
}

