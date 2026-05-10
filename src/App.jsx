import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import PromptLibrary from './components/PromptLibrary';
import Tutorials from './components/Tutorials';
import DisclaimerModal from './components/DisclaimerModal';
import { BookOpen, Construction, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState('chat');
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prefillInput, setPrefillInput] = useState('');

  useEffect(() => {
    // Basic Persistence
    const accepted = localStorage.getItem('vecthack-box-accepted');
    if (accepted) setShowDisclaimer(false);

    // Load Sessions
    const savedSessions = JSON.parse(localStorage.getItem('vecthack-sessions') || '[]');
    
    if (savedSessions.length > 0) {
      setSessions(savedSessions);
      setCurrentSessionId(savedSessions[0].id);
    } else {
      createNewSession();
    }
  }, []);

  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      name: `Session ${new Date().toLocaleDateString()}`,
      messages: [
        {
          role: 'model',
          content: 'System online. VecthackBox AI Mentor at your service. What cybersecurity topic are we exploring today?',
          timestamp: Date.now()
        }
      ],
      updatedAt: Date.now()
    };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    setCurrentSessionId(newSession.id);
    localStorage.setItem('vecthack-sessions', JSON.stringify(updated));
    setActiveView('chat');
    setIsSidebarOpen(false);
  };

  const updateSessionMessages = (sessionId, messages) => {
    const updated = sessions.map(s => 
      s.id === sessionId ? { ...s, messages, updatedAt: Date.now() } : s
    );
    setSessions(updated);
    localStorage.setItem('vecthack-sessions', JSON.stringify(updated));
  };

  const renameSession = (id, newName) => {
    const updated = sessions.map(s => 
      s.id === id ? { ...s, name: newName, updatedAt: Date.now() } : s
    );
    setSessions(updated);
    localStorage.setItem('vecthack-sessions', JSON.stringify(updated));
  };

  const deleteSession = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem('vecthack-sessions', JSON.stringify(updated));
    if (currentSessionId === id && updated.length > 0) {
      setCurrentSessionId(updated[0].id);
    } else if (updated.length === 0) {
      createNewSession();
    }
  };

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('vecthack-box-accepted', 'true');
    setShowDisclaimer(false);
  };

  const handleSelectPrompt = (prompt) => {
    // Fill the input instead of sending directly
    setPrefillInput(prompt.content || prompt.text);
    setActiveView('chat');
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-cyber-dark text-gray-300 font-sans selection:bg-cyber-green/30 selection:text-white overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={activeView} 
        onViewChange={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false);
        }} 
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSessionSelect={(id) => {
          setCurrentSessionId(id);
          setIsSidebarOpen(false);
        }}
        onNewSession={createNewSession}
        onDeleteSession={deleteSession}
        onRenameSession={renameSession}
      />
      
      <main className="flex-1 relative overflow-hidden h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {activeView === 'chat' && currentSession && (
            <motion.div
              key={currentSessionId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <ChatInterface 
                session={currentSession} 
                onUpdateMessages={(msgs) => updateSessionMessages(currentSessionId, msgs)} 
                onToggleSidebar={() => setIsSidebarOpen(true)}
                prefillValue={prefillInput}
                onClearPrefill={() => setPrefillInput('')}
              />
            </motion.div>
          )}

          {activeView === 'prompts' && (
            <motion.div
              key="prompts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              {/* Mobile Header for Views without their own header */}
              <div className="lg:hidden flex items-center p-4 border-b border-gray-800 bg-gray-900/30">
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-400">
                  <Terminal className="w-6 h-6" />
                </button>
                <span className="ml-2 font-black uppercase text-xs tracking-widest text-cyber-green">Prompts</span>
              </div>
              <PromptLibrary onSelectPrompt={handleSelectPrompt} />
            </motion.div>
          )}

          {activeView === 'tutorials' && (
            <motion.div
              key="tutorials"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
               {/* Mobile Header */}
               <div className="lg:hidden flex items-center p-4 border-b border-gray-800 bg-gray-900/30">
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-400">
                  <Terminal className="w-6 h-6" />
                </button>
                <span className="ml-2 font-black uppercase text-xs tracking-widest text-cyber-blue">Test Cases</span>
              </div>
              <Tutorials onComplete={() => {}} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onAccept={handleAcceptDisclaimer} 
      />

      {/* Decorative Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_100%_0%,rgba(0,255,65,0.15),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(0,229,255,0.1),transparent_50%)]" />
    </div>
  );
}
