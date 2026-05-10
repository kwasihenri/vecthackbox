import React from 'react';
import { SEED_PROMPTS } from '../constants';
import { Search, Terminal, Zap, Hash } from 'lucide-react';
import { motion } from 'motion/react';

export default function PromptLibrary({ onSelectPrompt }) {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState(null);

  const categories = Array.from(new Set(SEED_PROMPTS.map(p => p.category)));

  const filteredPrompts = SEED_PROMPTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filter || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-8 h-full bg-cyber-dark overflow-hidden flex flex-col font-mono">
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 md:gap-4 mb-2">
          <Terminal className="w-8 h-8 md:w-10 md:h-10 text-cyber-green" />
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic">
            Prompt <span className="text-cyber-green">Library</span>
          </h2>
        </div>
        <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mt-1">
          Operational Signatures & Educational Blueprints
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-focus-within:text-cyber-green transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search payload definitions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl md:rounded-2xl py-3 md:py-4 pl-11 md:pl-12 pr-4 md:pr-6 text-sm md:text-base text-gray-300 outline-none focus:ring-2 focus:ring-cyber-green/20 focus:border-cyber-green transition-all"
          />
        </div>
        <div className="flex gap-2 p-1 bg-gray-900/50 border border-gray-800 rounded-xl md:rounded-2xl overflow-x-auto select-none no-scrollbar">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 md:px-6 py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              !filter ? 'bg-cyber-green text-black' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 md:px-6 py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat ? 'bg-cyber-blue text-black' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pr-2 custom-scrollbar">
        {filteredPrompts.map((prompt, i) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className="group relative bg-cyber-gray/30 border border-gray-800/80 rounded-xl md:rounded-2xl p-5 md:p-6 hover:border-cyber-green/50 transition-all cursor-pointer flex flex-col justify-between"
            onClick={() => onSelectPrompt(prompt)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Zap className="w-4 h-4 text-cyber-green fill-cyber-green/20" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span className="px-2 md:px-3 py-1 bg-gray-800 rounded-lg text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-700">
                  {prompt.category}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyber-green transition-colors leading-tight truncate">
                {prompt.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-sans line-clamp-3">
                {prompt.description}
              </p>
            </div>

            <div className="pt-4 md:pt-6 border-t border-gray-800/50 flex items-center justify-between">
              <span className="text-[9px] md:text-[10px] text-gray-700 font-bold uppercase tracking-tighter group-hover:text-gray-500 transition-colors">
                SIG: {prompt.id}
              </span>
              <div className="flex items-center gap-2 text-cyber-green opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest">Execute</span>
                <Terminal className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>
          </motion.div>
        ))}
        {filteredPrompts.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-800 rounded-3xl">
            <div className="text-gray-700 font-black text-6xl mb-4">NULL</div>
            <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">No matching payload signatures found in local database</p>
          </div>
        )}
      </div>
    </div>
  );
}
