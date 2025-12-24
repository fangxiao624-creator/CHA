export type TeaCategoryType = 'Green' | 'Black' | 'Oolong' | 'White' | 'Yellow' | 'Dark';

export interface TeaCategory {
  id: TeaCategoryType;
  name: string; // Chinese Name
  temp: number; // Water Temp in Celsius
  ratio: string; // Tea:Water ratio (e.g., 1:50)
  rinse: boolean; // Needs rinsing?
  desc: string;
  color: string;
  image: string;
}

export interface TeaLog {
  id: string;
  teaName: string;
  category: TeaCategoryType;
  amount: number; // grams
  temp: number; // Celsius
  brewCount: number;
  rating: number; // 1-5
  date: number; // Timestamp
  notes?: string;
}

export interface WeeklyStats {
  name: string;
  count: number;
}

export interface CategoryStats {
  name: string;
  value: number;
  color: string;
}