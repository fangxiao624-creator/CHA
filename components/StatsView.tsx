import React from 'react';
import { TeaLog } from '../types';
import { TEA_LIBRARY } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { subDays, format } from 'date-fns';

interface Props {
  logs: TeaLog[];
}

export const StatsView: React.FC<Props> = ({ logs }) => {
  const categoryData = TEA_LIBRARY.map(cat => {
    const count = logs.filter(l => l.category === cat.id).length;
    return {
      name: cat.name,
      value: count,
      color: cat.color
    };
  }).filter(item => item.value > 0);

  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(today, 6 - i);
    const count = logs.filter(l => {
        const logDate = new Date(l.date);
        return logDate.getDate() === d.getDate() && logDate.getMonth() === d.getMonth();
    }).length;
    return {
        date: format(d, 'MM/dd'),
        count: count
    };
  });

  const totalBrews = logs.reduce((acc, curr) => acc + curr.brewCount, 0);

  return (
    <div className="pb-28 pt-6 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-800 tracking-widest">数据</h2>
        <p className="text-[10px] text-stone-500 font-serif tracking-widest mt-1">日积月累，自有分晓</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-24">
            <div className="w-7 h-7 rounded-full bg-tea-100 flex items-center justify-center text-tea-600 mb-1">
                <span className="font-serif text-base">记</span>
            </div>
            <div>
                <p className="text-2xl font-serif font-bold text-stone-800">{logs.length}</p>
                <p className="text-[9px] text-stone-400 tracking-wider uppercase">累计记录</p>
            </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex flex-col justify-between h-24">
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-1">
                <span className="font-serif text-base">泡</span>
            </div>
             <div>
                <p className="text-2xl font-serif font-bold text-stone-800">{totalBrews}</p>
                <p className="text-[9px] text-stone-400 tracking-wider uppercase">累计冲泡</p>
            </div>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="glass-card p-10 rounded-2xl text-center">
            <p className="font-serif text-stone-400 tracking-wider text-sm">暂无数据分析</p>
        </div>
      ) : (
        <>
            <div className="glass-card p-5 rounded-2xl mb-5">
                <h3 className="font-serif font-bold text-stone-800 mb-4 tracking-wide text-xs border-l-2 border-tea-500 pl-2">偏好分布</h3>
                <div className="h-44 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <span className="block text-[10px] text-stone-400">种类</span>
                            <span className="block font-serif font-bold text-stone-700">{categoryData.length}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mt-1">
                    {categoryData.map((d) => (
                        <div key={d.name} className="flex items-center text-[10px] text-stone-500">
                            <span className="w-1.5 h-1.5 rounded-full mr-1" style={{backgroundColor: d.color}}></span>
                            {d.name} <span className="ml-1 opacity-50">{d.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card p-5 rounded-2xl">
                <h3 className="font-serif font-bold text-stone-800 mb-4 tracking-wide text-xs border-l-2 border-tea-500 pl-2">近七日趋势</h3>
                <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={last7Days}>
                    <XAxis 
                        dataKey="date" 
                        tickLine={false}
                        axisLine={false}
                        tick={{fontSize: 8, fill: '#9ca3af', fontFamily: 'sans-serif'}}
                        dy={8}
                    />
                    <Tooltip
                         cursor={{fill: 'rgba(0,0,0,0.02)'}}
                         contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            fontFamily: 'Noto Serif SC',
                            fontSize: '12px'
                        }} 
                    />
                    <Bar dataKey="count" fill="#8F9E8F" radius={[3, 3, 3, 3]} barSize={10} activeBar={{fill: '#4A5C4A'}} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </div>
        </>
      )}
    </div>
  );
};