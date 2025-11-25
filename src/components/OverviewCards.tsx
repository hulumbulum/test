import React from 'react';

interface OverviewCardsProps {
  income: number;
  expenses: number;
  balance: number;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ income, expenses, balance }) => {
  const cards = [
    {
      title: 'Доходы',
      amount: income,
      icon: '💰',
      color: '#10b981',
      trend: income > 0 ? '+' : ''
    },
    {
      title: 'Расходы',
      amount: expenses,
      icon: '📊',
      color: '#ef4444',
      trend: expenses > 0 ? '-' : ''
    },
    {
      title: 'Баланс',
      amount: balance,
      icon: '⚖️',
      color: balance >= 0 ? '#6366f1' : '#ef4444',
      trend: balance >= 0 ? '+' : '-'
    }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="overview-cards">
      {cards.map((card, index) => (
        <div key={index} className="overview-card">
          <div className="card-icon" style={{ backgroundColor: card.color }}>
            {card.icon}
          </div>
          <div className="card-content">
            <h3>{card.title}</h3>
            <div className="amount" style={{ color: card.color }}>
              {card.trend}{formatCurrency(card.amount)} ₽
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;