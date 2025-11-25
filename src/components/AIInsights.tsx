import React from 'react';
import { Insight } from '../types';

interface AIInsightsProps {
  insights: Insight[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  const getInsightColor = (type: string) => {
    const colors: { [key: string]: string } = {
      warning: '#f59e0b',
      success: '#10b981',
      info: '#3b82f6',
      savings: '#6366f1'
    };
    return colors[type] || '#3b82f6';
  };

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className="ai-insights">
      <div className="insights-header">
        <h3>🤖 ИИ-аналитика</h3>
        <span className="insights-badge">{insights.length}</span>
      </div>
      
      <div className="insights-list">
        {insights.map(insight => (
          <div 
            key={insight.id}
            className="insight-item"
            style={{ borderLeftColor: getInsightColor(insight.type) }}
          >
            <div className="insight-icon">{insight.icon}</div>
            <div className="insight-content">
              <p className="insight-message">{insight.message}</p>
              {insight.suggestion && (
                <p className="insight-suggestion">{insight.suggestion}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;