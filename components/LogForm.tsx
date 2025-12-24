import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TeaCategoryType, TeaLog } from '../types';
import { TEA_LIBRARY } from '../constants';
import { X, Check } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSave: (log: Omit<TeaLog, 'id'>) => void;
}

export const LogForm: React.FC<Props> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    teaName: '',
    category: 'Green' as TeaCategoryType,
    amount: 5,
    temp: 85,
    brewCount: 3,
    rating: 4,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      date: Date.now()
    });
    onClose();
  };

  const categories = TEA_LIBRARY.map(c => ({ id: c.id, name: c.name }));

  // Custom Slider Component
  const Slider = ({ label, value, min, max, step, unit, onChange }: any) => (
    <div className="mb-5">
        <div className="flex justify-between mb-2 items-end">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</label>
            <span className="text-lg font-serif font-bold text-tea-700">{value}<span className="text-[10px] font-sans text-stone-400 ml-0.5 font-normal">{unit}</span></span>
        </div>
        <div className="relative h-1.5 w-full">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-stone-200 rounded-full h-1.5"></div>
            <div 
                className="absolute top-0 left-0 bottom-0 bg-tea-500 rounded-full h-1.5"
                style={{ width: `${((value - min) / (max - min)) * 100}%` }}
            ></div>
            <input 
                type="range" min={min} max={max} step={step}
                value={value}
                onChange={onChange}
                className="absolute top-[-5px] left-0 w-full h-4 opacity-0 cursor-pointer z-10"
            />
            <div 
                className="absolute top-[-3px] h-3 w-3 bg-white border-2 border-tea-600 rounded-full shadow-md pointer-events-none transition-all"
                style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 6px)` }}
            ></div>
        </div>
    </div>
  );

  return (
    <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute inset-0 z-50 flex flex-col bg-[#F7F7F2]"
    >
        {/* Header */}
        <div className="pt-4 pb-3 px-4 flex justify-between items-center bg-[#F7F7F2] z-10">
            <button onClick={onClose} className="p-2 -ml-2 rounded-full text-stone-400 hover:text-stone-800 transition-colors">
                <X size={20} />
            </button>
            <h2 className="font-serif font-bold text-base text-stone-800 tracking-widest">品茗录</h2>
            <div className="w-8"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 space-y-8 pb-28">
            
            {/* Main Inputs */}
            <div className="space-y-5">
                <input 
                    required
                    type="text" 
                    value={formData.teaName}
                    onChange={e => setFormData({...formData, teaName: e.target.value})}
                    placeholder="茶名..."
                    className="w-full bg-transparent border-b border-stone-300 py-1.5 text-2xl font-serif text-stone-900 placeholder-stone-300 focus:outline-none focus:border-tea-600 transition-colors text-center"
                />

                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                                const defaultTemp = TEA_LIBRARY.find(t => t.id === cat.id)?.temp || 85;
                                setFormData({...formData, category: cat.id as TeaCategoryType, temp: defaultTemp});
                            }}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide transition-all border ${
                                formData.category === cat.id 
                                ? 'bg-tea-600 border-tea-600 text-white shadow-lg shadow-tea-600/20' 
                                : 'bg-transparent border-stone-200 text-stone-500 hover:border-stone-400'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-stone-200 w-full"></div>

            {/* Sliders */}
            <div className="space-y-6">
                <Slider 
                    label="投茶量" value={formData.amount} unit="g" min={1} max={15} step={0.5}
                    onChange={(e: any) => setFormData({...formData, amount: parseFloat(e.target.value)})} 
                />
                <Slider 
                    label="水温" value={formData.temp} unit="°C" min={60} max={100} step={1}
                    onChange={(e: any) => setFormData({...formData, temp: parseInt(e.target.value)})} 
                />
                <Slider 
                    label="冲泡" value={formData.brewCount} unit="泡" min={1} max={20} step={1}
                    onChange={(e: any) => setFormData({...formData, brewCount: parseInt(e.target.value)})} 
                />
            </div>

            {/* Rating */}
            <div className="text-center">
                 <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">综合评分</label>
                 <div className="flex gap-4 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({...formData, rating: star})}
                            className={`text-xl transition-all ${star <= formData.rating ? 'text-yellow-600 scale-110' : 'text-stone-200'}`}
                        >
                            ★
                        </button>
                    ))}
                 </div>
            </div>

            {/* Notes */}
            <div className="bg-white/50 p-3 rounded-xl border border-stone-200 focus-within:border-tea-400 transition-colors">
                <textarea 
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    placeholder="记录此时此刻的香气、滋味与心境..."
                    rows={3}
                    className="w-full bg-transparent font-serif text-sm text-stone-700 placeholder-stone-300 focus:outline-none resize-none leading-relaxed"
                />
            </div>
        </form>

        <div className="absolute bottom-6 left-4 right-4 z-20">
            <button 
                onClick={handleSubmit}
                className="w-full bg-stone-800 text-stone-50 py-3.5 rounded-xl font-serif font-bold text-base shadow-xl shadow-stone-900/10 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                <Check size={18} />
                <span>完成记录</span>
            </button>
        </div>
    </motion.div>
  );
};