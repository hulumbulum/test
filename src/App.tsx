import React, { useState, useEffect } from 'react';
import './styles/App.css';
import OverviewCards from './components/OverviewCards';
import TransactionList from './components/TransactionList';
import AddTransactionForm from './components/AddTransactionForm';
import SpendingChart from './components/SpendingChart';
import AIInsights from './components/AIInsights';
import { Transaction, Insight } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateInsights } from './utils/aiAnalyzer';

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [insights, setInsights] = useState<Insight[]>([]);

  // Генерация инсайтов при изменении транзакций
  useEffect(() => {
    const newInsights = generateInsights(transactions);
    setInsights(newInsights);
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...transaction
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Расчет общей статистики
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>💰 BudgetMaster</h1>
          <p>Умный планировщик ваших финансов</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-grid">
          <div className="main-column">
            <OverviewCards income={income} expenses={expenses} balance={balance} />
            <AddTransactionForm onAdd={addTransaction} />
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction}
            />
          </div>
          
          <div className="sidebar">
            <AIInsights insights={insights} />
            <SpendingChart transactions={transactions} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 BudgetMaster - Ваш финансовый помощник</p>
      </footer>
    </div>
  );
}

export default App;