export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

export interface Insight {
  id: number;
  type: 'warning' | 'success' | 'info' | 'savings';
  message: string;
  suggestion?: string;
  icon: string;
}