import { Transaction, Insight } from '../types';

export function generateInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');

  // 1. Анализ баланса
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  if (balance < 0) {
    insights.push({
      id: Date.now(),
      type: 'warning',
      message: 'Расходы превышают доходы',
      suggestion: 'Рекомендуем пересмотреть ваши траты',
      icon: '⚠️'
    });
  }

  if (balance > totalIncome * 0.3 && totalIncome > 0) {
    insights.push({
      id: Date.now() + 1,
      type: 'success',
      message: 'Отличные накопления!',
      suggestion: 'Вы откладываете более 30% от доходов',
      icon: '🎉'
    });
  }

  // 2. Анализ по категориям
  const categoryTotals: { [key: string]: number } = {};
  expenses.forEach(transaction => {
    categoryTotals[transaction.category] = 
      (categoryTotals[transaction.category] || 0) + transaction.amount;
  });

  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0];

  if (topCategory && topCategory[1] > totalIncome * 0.4 && totalIncome > 0) {
    insights.push({
      id: Date.now() + 2,
      type: 'warning',
      message: `Много тратите на ${getCategoryName(topCategory[0])}`,
      suggestion: `Более 40% доходов уходит на ${getCategoryName(topCategory[0]).toLowerCase()}`,
      icon: '💡'
    });
  }

  // 3. Анализ крупных трат
  const largeExpenses = expenses.filter(t => t.amount > 5000);
  if (largeExpenses.length > 2) {
    insights.push({
      id: Date.now() + 3,
      type: 'info',
      message: 'Обнаружены крупные траты',
      suggestion: 'Рассмотрите возможность оптимизации крупных расходов',
      icon: '💰'
    });
  }

  // 4. Приветственное сообщение
  if (transactions.length === 0) {
    insights.push({
      id: Date.now() + 4,
      type: 'info',
      message: 'Добро пожаловать в BudgetMaster!',
      suggestion: 'Добавьте первую транзакцию чтобы начать анализ',
      icon: '👋'
    });
  }

  return insights.slice(0, 5);
}

function getCategoryName(category: string): string {
  const categories: { [key: string]: string } = {
    food: 'Еду',
    transport: 'Транспорт',
    housing: 'Жилье',
    entertainment: 'Развлечения',
    healthcare: 'Здоровье',
    shopping: 'Шоппинг',
    other: 'Другое'
  };
  return categories[category] || category;
}