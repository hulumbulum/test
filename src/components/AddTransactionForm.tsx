import React, { useState } from 'react';
import { Transaction } from '../types';

interface AddTransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: 'food',
    description: ''
  });

  const categories = {
    expense: [
      { value: 'food', label: '🍎 Еда' },
      { value: 'transport', label: '🚗 Транспорт' },
      { value: 'housing', label: '🏠 Жилье' },
      { value: 'entertainment', label: '🎮 Развлечения' },
      { value: 'healthcare', label: '💊 Здоровье' },
      { value: 'shopping', label: '🛍️ Шоппинг' },
      { value: 'other', label: '📦 Другое' }
    ],
    income: [
      { value: 'salary', label: '💼 Зарплата' },
      { value: 'freelance', label: '👨‍💻 Фриланс' },
      { value: 'investment', label: '📈 Инвестиции' },
      { value: 'other', label: '📦 Другое' }
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.amount || !form.description) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    onAdd({
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      description: form.description
    });

    setForm({
      amount: '',
      type: 'expense',
      category: 'food',
      description: ''
    });
  };

  return (
    <div className="add-form-container">
      <h3>➕ Добавить транзакцию</h3>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-row">
          <div className="form-group">
            <label>Тип</label>
            <select 
              value={form.type} 
              onChange={e => setForm({ ...form, type: e.target.value as 'income' | 'expense', category: e.target.value === 'income' ? 'salary' : 'food' })}
            >
              <option value="expense">📤 Расход</option>
              <option value="income">📥 Доход</option>
            </select>
          </div>

          <div className="form-group">
            <label>Категория</label>
            <select 
              value={form.category} 
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {(form.type === 'expense' ? categories.expense : categories.income).map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Сумма (₽)</label>
            <input
              type="number"
              placeholder="0"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Описание</label>
          <input
            type="text"
            placeholder="Например: Продукты в Пятёрочке"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          💾 Добавить транзакцию
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;