import React from 'react';
import { Transaction } from '../types';

interface SpendingChartProps {
  transactions: Transaction[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const categoryTotals = expenses.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as { [key: string]: number });

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: expenses.reduce((sum, t) => sum + t.amount, 0) > 0 
      ? (amount / expenses.reduce((sum, t) => sum + t.amount, 0)) * 100 
      : 0
  })).sort((a, b) => b.amount - a.amount);

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      food: '#ef4444',
      transport: '#3b82f6',
      housing: '#8b5cf6',
      entertainment: '#f59e0b',
      healthcare: '#10b981',
      shopping: '#ec4899',
      other: '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  const getCategoryIcon = (category: string): string => {
    const icons: { [key: string]: string } = {
      food: '🍎',
      transport: '🚗',
      housing: '🏠',
      entertainment: '🎮',
      healthcare: '💊',
      shopping: '🛍️',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  const getCategoryName = (category: string): string => {
    const names: { [key: string]: string } = {
      food: 'Еда',
      transport: 'Транспорт',
      housing: 'Жилье',
      entertainment: 'Развлечения',
      healthcare: 'Здоровье',
      shopping: 'Шоппинг',
      other: 'Другое'
    };
    return names[category] || category;
  };

  if (data.length === 0) {
    return (
      <div className="spending-chart">
        <h3>📊 Расходы по категориям</h3>
        <div className="empty-chart">
          <p>Нет данных для графика</p>
          <small>Добавьте расходы чтобы увидеть аналитику</small>
        </div>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <h3>📊 Расходы по категориям</h3>
      <div className="chart-container">
        {data.map((item) => (
          <div key={item.category} className="chart-item">
            <div className="chart-bar">
              <div 
                className="bar-fill"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: getCategoryColor(item.category)
                }}
              ></div>
            </div>
            <div className="chart-label">
              <span className="category-name">
                {getCategoryIcon(item.category)} {getCategoryName(item.category)}
              </span>
              <span className="category-amount">
                {item.amount.toLocaleString('ru-RU')} ₽
                <small>({item.percentage.toFixed(1)}%)</small>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;
