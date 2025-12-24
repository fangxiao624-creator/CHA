import React, { useState, useEffect } from 'react';
import { BookOpen, PieChart, Coffee } from 'lucide-react';
import { TeaLog } from './types';
import { INITIAL_LOGS } from './constants';
import { TeaLibraryView } from './components/TeaLibraryView';
import { StatsView } from './components/StatsView';
import { HistoryView } from './components/HistoryView';
import { LogForm } from './components/LogForm';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'log' | 'library' | 'stats'>('log');
  const [logs, setLogs] = useState<TeaLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('teatrace_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      setLogs(INITIAL_LOGS);
    }
    setIsLoading(false);
  }, []);

  // Save data whenever logs change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('teatrace_logs', JSON.stringify(logs));
    }
  }, [logs, isLoading]);

  const handleSaveLog = (newLog: Omit<TeaLog, 'id'>) => {
    const log: TeaLog = {
      ...newLog,
      id: crypto.randomUUID()
    };
    setLogs([log, ...logs]);
  };

  return (
    <div className="w-full h-full relative bg-texture bg-repeat overflow-hidden md:w-[390px] md:h-[844px] md:max-h-[95vh] md:rounded-[45px] md:shadow-2xl md:border-[6px] md:border-white/50">
        {/* Animated Background Elements */}
        <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[40%] bg-tea-200/30 rounded-full blur-[100px] pointer-events-none z-0 animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-stone-300/20 rounded-full blur-[90px] pointer-events-none z-0 animate-float-delayed"></div>

        {/* Main Content Area */}
        <main className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10 scroll-smooth">
            {activeTab === 'library' && <TeaLibraryView />}
            {activeTab === 'stats' && <StatsView logs={logs} />}
            {activeTab === 'log' && (
                <HistoryView 
                    logs={logs} 
                    onAddClick={() => setShowForm(true)} 
                />
            )}
        </main>

        {/* Bottom Navigation - Glass Island Style */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none">
            <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl shadow-stone-900/5 pointer-events-auto ring-1 ring-white/50 bg-white/80 backdrop-blur-xl">
                <button 
                    onClick={() => setActiveTab('log')}
                    className={`flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${activeTab === 'log' ? 'text-tea-800 scale-110' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    <Coffee strokeWidth={activeTab === 'log' ? 2.5 : 1.5} size={22} />
                    <div className={`w-1 h-1 rounded-full bg-tea-800 mt-1 transition-opacity ${activeTab === 'log' ? 'opacity-100' : 'opacity-0'}`}></div>
                </button>
                <div className="w-px h-6 bg-stone-300/50"></div>
                <button 
                    onClick={() => setActiveTab('library')}
                    className={`flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${activeTab === 'library' ? 'text-tea-800 scale-110' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    <BookOpen strokeWidth={activeTab === 'library' ? 2.5 : 1.5} size={22} />
                    <div className={`w-1 h-1 rounded-full bg-tea-800 mt-1 transition-opacity ${activeTab === 'library' ? 'opacity-100' : 'opacity-0'}`}></div>
                </button>
                 <div className="w-px h-6 bg-stone-300/50"></div>
                <button 
                    onClick={() => setActiveTab('stats')}
                    className={`flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${activeTab === 'stats' ? 'text-tea-800 scale-110' : 'text-stone-400 hover:text-stone-600'}`}
                >
                    <PieChart strokeWidth={activeTab === 'stats' ? 2.5 : 1.5} size={22} />
                    <div className={`w-1 h-1 rounded-full bg-tea-800 mt-1 transition-opacity ${activeTab === 'stats' ? 'opacity-100' : 'opacity-0'}`}></div>
                </button>
            </div>
        </div>

        {/* Modal Form */}
        <AnimatePresence>
            {showForm && (
                <LogForm 
                    onClose={() => setShowForm(false)} 
                    onSave={handleSaveLog} 
                />
            )}
        </AnimatePresence>
    </div>
  );
};

export default App;