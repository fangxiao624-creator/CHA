import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEA_LIBRARY } from '../constants';
import { TeaCategory } from '../types';
import { Thermometer, Droplets, Info, X, ChevronRight } from 'lucide-react';

export const TeaLibraryView: React.FC = () => {
  const [selectedTea, setSelectedTea] = useState<TeaCategory | null>(null);

  return (
    <div className="pb-28 pt-6 px-4">
       <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-widest">茶经</h2>
            <p className="text-[10px] text-stone-500 font-serif tracking-widest mt-1">六大茶类，冲泡指引</p>
       </div>
      
      <div className="space-y-4">
        {TEA_LIBRARY.map((tea, index) => (
          <motion.div
            key={tea.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTea(tea)}
            className="group relative h-28 rounded-2xl overflow-hidden cursor-pointer shadow-sm"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
               <img src={tea.image} alt={tea.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/30 transition-colors"></div>
               {/* Gradient for text readability */}
               <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/40 to-transparent"></div>
            </div>

            {/* Content Layout */}
            <div className="absolute inset-0 p-5 flex items-center justify-between">
                {/* Left: Text */}
                <div className="flex flex-col justify-center z-10">
                    <div className="flex items-center gap-3 mb-1.5">
                        <div className="w-1 h-6 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        <h3 className="text-xl font-serif font-bold text-white tracking-[0.2em] drop-shadow-md">{tea.name}</h3>
                    </div>
                    <p className="text-[10px] text-stone-300 pl-4 tracking-wider font-light opacity-90 line-clamp-1 max-w-[150px]">{tea.desc}</p>
                </div>

                {/* Right: Quick Stats */}
                <div className="flex items-center gap-4 pr-1 opacity-90 z-10">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-0.5">
                            <Thermometer size={10} className="text-stone-300" />
                            <span className="text-xs font-mono font-bold text-white">{tea.temp}°</span>
                        </div>
                        <div className="h-0.5 w-6 bg-white/20 rounded-full"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-0.5">
                            <Droplets size={10} className="text-stone-300" />
                            <span className="text-xs font-mono font-bold text-white">{tea.ratio}</span>
                        </div>
                        <div className="h-0.5 w-6 bg-white/20 rounded-full"></div>
                    </div>
                    
                    {/* Action Icon */}
                    <div className="ml-1 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                         <ChevronRight size={16} className="text-white opacity-80" />
                    </div>
                </div>
            </div>
            
            {/* Color Accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1 opacity-50" style={{ backgroundColor: tea.color }}></div>

          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedTea && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTea(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              layoutId={selectedTea.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-50 rounded-t-[2rem] overflow-hidden bg-[#F7F7F2] max-h-[85%] h-auto flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
                <div className="relative h-64 shrink-0">
                   <img src={selectedTea.image} className="w-full h-full object-cover" alt={selectedTea.name} />
                   
                   <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#F7F7F2]"></div>

                   <button 
                    onClick={() => setSelectedTea(null)}
                    className="absolute top-5 right-5 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white border border-white/20 z-10"
                   >
                     <X size={18} />
                   </button>

                   <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-serif font-bold text-stone-900 tracking-widest"
                        >
                            {selectedTea.name}
                        </motion.h2>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
                    <div className="px-6 pb-10 space-y-6 -mt-2">
                        <p className="text-stone-600 leading-loose font-serif text-justify tracking-wide text-sm">
                            {selectedTea.desc}
                        </p>

                        {/* Parameters Grid */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: Thermometer, label: '适宜水温', val: `${selectedTea.temp}°C`, color: 'text-tea-600' },
                                { icon: Droplets, label: '茶水比例', val: selectedTea.ratio, color: 'text-blue-500' },
                                { icon: Info, label: '润茶建议', val: selectedTea.rinse ? '需润茶' : '不推荐', color: 'text-stone-500' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/50 border border-stone-200/50 p-3 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                                    <item.icon className={`${item.color} mb-1.5 opacity-80`} size={18} />
                                    <span className="text-[9px] text-stone-400 mb-0.5 tracking-wider">{item.label}</span>
                                    <span className="text-sm font-bold text-stone-800 font-serif">{item.val}</span>
                                </div>
                            ))}
                        </div>

                        {/* Brewing Guide */}
                        <div className="bg-tea-50/50 border border-tea-100/50 p-5 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-5">
                                <span className="text-5xl font-serif">泡</span>
                            </div>
                            <h3 className="font-serif font-bold text-stone-800 mb-4 text-base tracking-widest">冲泡要义</h3>
                            <div className="space-y-4 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[6px] top-2 bottom-2 w-[1px] bg-tea-200"></div>

                                {[
                                    { title: '择器', content: selectedTea.id === 'Green' ? '玻璃杯赏舞' : selectedTea.id === 'Oolong' ? '紫砂壶聚香' : '白瓷盖碗' },
                                    { title: '温杯', content: '沸水润具，激发干茶香气' },
                                    { title: '注水', content: selectedTea.id === 'Green' ? '环壁注水，忌直冲' : '悬壶高冲，激扬茶韵' }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative pl-5">
                                        <div className="absolute left-0 top-1.5 w-[13px] h-[13px] rounded-full bg-[#F7F7F2] border border-tea-400 flex items-center justify-center">
                                            <div className="w-1 h-1 rounded-full bg-tea-400"></div>
                                        </div>
                                        <h4 className="font-serif font-bold text-stone-800 text-sm mb-0.5">{step.title}</h4>
                                        <p className="text-[11px] text-stone-600 leading-relaxed">{step.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};