import React from 'react';
import { TeaLog } from '../types';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Droplets, Thermometer, Repeat, Feather } from 'lucide-react';
import { TEA_LIBRARY } from '../constants';
import { motion } from 'framer-motion';

interface Props {
  logs: TeaLog[];
  onAddClick: () => void;
}

export const HistoryView: React.FC<Props> = ({ logs, onAddClick }) => {
  const sortedLogs = [...logs].sort((a, b) => b.date - a.date);

  return (
    <div className="pb-28 pt-6 px-4 min-h-screen relative">
       <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-widest">茶迹</h2>
                <p className="text-[10px] text-stone-500 font-serif tracking-widest mt-1">一期一会，难得一面</p>
            </div>
            <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={onAddClick}
                className="bg-tea-800 text-tea-50 px-4 py-2 rounded-xl text-xs font-serif tracking-wide shadow-lg shadow-tea-900/20 hover:bg-tea-900 transition-colors"
            >
                记一盏
            </motion.button>
       </div>

      <div className="relative border-l border-tea-200/50 ml-3 space-y-4 min-h-[50vh]">
        {sortedLogs.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-24 ml-[-0.75rem] opacity-70">
               <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-5 border border-white shadow-sm">
                   <Feather size={24} className="text-tea-400 opacity-60" />
               </div>
               <h3 className="font-serif font-bold text-stone-600 tracking-[0.2em] mb-2 text-sm">暂无茶迹</h3>
               <p className="font-serif text-[10px] text-stone-400 tracking-widest">且试新茶，莫负好时光</p>
               <div className="mt-8 w-8 h-[1px] bg-tea-200/50"></div>
           </div>
        ) : (
            sortedLogs.map((log, index) => {
                const categoryInfo = TEA_LIBRARY.find(c => c.id === log.category);
                const logDate = new Date(log.date);
                
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={log.id} 
                        className="relative pl-6"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full bg-tea-100 border-2 border-tea-400 z-10"></div>
                        
                        <div className="glass-card p-0 rounded-xl overflow-hidden group hover:bg-white/60 transition-colors duration-300">
                            <div className="flex">
                                {/* Date Stamp Column */}
                                <div className="w-12 bg-stone-100/50 flex flex-col items-center justify-center border-r border-white/50 py-3">
                                    <span className="font-serif text-lg font-bold text-stone-800 leading-none">{format(logDate, 'dd')}</span>
                                    <span className="text-[9px] text-stone-500 uppercase mt-0.5 tracking-wider">{format(logDate, 'MMM', { locale: zhCN })}</span>
                                    <div className="w-0.5 h-3 bg-tea-200 my-1.5"></div>
                                    <span className="text-[9px] text-stone-400 font-mono">{format(logDate, 'HH:mm')}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-base font-serif font-bold text-stone-800 tracking-wide">{log.teaName}</h3>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: categoryInfo?.color}}></span>
                                                <span className="text-[10px] text-stone-500 font-medium tracking-wide">
                                                    {categoryInfo?.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span key={star} className={`text-[10px] ${star <= log.rating ? 'text-yellow-600' : 'text-gray-200'}`}>★</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 py-2 border-t border-stone-200/30 border-dashed">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-stone-400 mb-0.5">水温</span>
                                            <div className="flex items-center gap-1 text-stone-700 font-medium">
                                                <Thermometer size={10} className="text-tea-400" />
                                                <span className="text-xs font-serif">{log.temp}°</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-l border-stone-200/30 pl-2">
                                            <span className="text-[9px] text-stone-400 mb-0.5">投茶</span>
                                            <div className="flex items-center gap-1 text-stone-700 font-medium">
                                                <Droplets size={10} className="text-blue-300" />
                                                <span className="text-xs font-serif">{log.amount}g</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col border-l border-stone-200/30 pl-2">
                                            <span className="text-[9px] text-stone-400 mb-0.5">次数</span>
                                            <div className="flex items-center gap-1 text-stone-700 font-medium">
                                                <Repeat size={10} className="text-orange-300" />
                                                <span className="text-xs font-serif">{log.brewCount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {log.notes && (
                                        <div className="mt-1.5 pt-1.5 text-xs text-stone-600 font-serif leading-relaxed opacity-80">
                                            {log.notes}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })
        )}
      </div>
    </div>
  );
};