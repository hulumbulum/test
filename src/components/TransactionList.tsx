import React from 'react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const getCategoryIcon = (category: string): string => {
    const icons: { [key: string]: string } = {
      food: '🍎',
      transport: '🚗',
      housing: '🏠',
      entertainment: '🎮',
      healthcare: '💊',
      shopping: '🛍️',
      salary: '💼',
      freelance: '👨‍💻',
      investment: '📈',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="transaction-list">
        <h3>📋 История транзакций</h3>
        <div className="empty-state">
          <p>Пока нет транзакций</p>
          <small>Добавьте первую транзакцию чтобы начать отслеживание</small>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h3>📋 История транзакций</h3>
      <div className="transactions-container">
        {transactions.map(transaction => (
          <div 
            key={transaction.id} 
            className={`transaction-item ${transaction.type}`}
          >
            <div className="transaction-icon">
              {getCategoryIcon(transaction.category)}
            </div>
            
            <div className="transaction-details">
              <div className="transaction-description">
                {transaction.description}
              </div>
              <div className="transaction-meta">
                <span className="transaction-category">
                  {transaction.category}
                </span>
                <span className="transaction-date">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
            
            <div className="transaction-amount">
              <span className={transaction.type}>
                {transaction.type === 'income' ? '+' : '-'}{transaction.amount} ₽
              </span>
              <button 
                onClick={() => onDelete(transaction.id)}
                className="delete-btn"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;