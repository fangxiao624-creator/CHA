import { TeaCategory, TeaLog } from './types';

export const TEA_LIBRARY: TeaCategory[] = [
  {
    id: 'Green',
    name: '绿茶',
    temp: 80,
    ratio: '1:50',
    rinse: false,
    desc: '清新自然，保留原叶风味。忌高温久泡。',
    color: '#84cc16', // lime-500
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'White',
    name: '白茶',
    temp: 90,
    ratio: '1:25',
    rinse: false,
    desc: '自然萎凋，毫香蜜韵，滋味清淡回甘。',
    color: '#e5e7eb', // gray-200
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Yellow',
    name: '黄茶',
    temp: 85,
    ratio: '1:50',
    rinse: false,
    desc: '闷黄工艺，滋味醇厚，汤色杏黄。',
    color: '#facc15', // yellow-400
    image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Oolong',
    name: '青茶 (乌龙)',
    temp: 100,
    ratio: '1:22',
    rinse: true,
    desc: '半发酵，香气馥郁，讲究高冲低斟。',
    color: '#14b8a6', // teal-500
    image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Black',
    name: '红茶',
    temp: 95,
    ratio: '1:50',
    rinse: false,
    desc: '全发酵，汤色红亮，滋味甜醇。',
    color: '#b91c1c', // red-700
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'Dark',
    name: '黑茶',
    temp: 100,
    ratio: '1:20',
    rinse: true,
    desc: '后发酵，越陈越香，可煮可泡。',
    color: '#3f3f46', // zinc-700
    image: 'https://images.unsplash.com/photo-1620025199859-0df8508933bc?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_LOGS: TeaLog[] = [
  {
    id: '1',
    teaName: '西湖龙井',
    category: 'Green',
    amount: 3,
    temp: 85,
    brewCount: 3,
    rating: 5,
    date: Date.now() - 86400000 * 2,
    notes: '清明前采摘，豆香浓郁。'
  },
  {
    id: '2',
    teaName: '大红袍',
    category: 'Oolong',
    amount: 8,
    temp: 100,
    brewCount: 7,
    rating: 4,
    date: Date.now() - 86400000,
    notes: '岩韵明显，回甘持久。'
  }
];