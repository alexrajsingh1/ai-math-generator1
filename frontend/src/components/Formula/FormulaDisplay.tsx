import React from 'react';
import { MATH_FORMULAS_BY_LEVEL } from '../../constants/formulas';
import { TopicType, DifficultyType } from '../../types';

const styles = {
  container: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#2563eb'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px'
  },
  card: {
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  formulaName: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#374151'
  },
  formulaText: {
    fontSize: '16px',
    fontFamily: 'monospace',
    color: '#1f2937'
  }
};

interface FormulaDisplayProps {
  topic: TopicType;
  difficulty: DifficultyType;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ topic, difficulty }) => {
  if (!topic || !difficulty || !MATH_FORMULAS_BY_LEVEL?.[topic]) {
    return <div style={styles.container}>⚠️ No formulas available for this topic and difficulty.</div>;
  }  
  const formulas = MATH_FORMULAS_BY_LEVEL[topic][difficulty];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📚 Helpful Formulas for {topic.charAt(0).toUpperCase() + topic.slice(1)}</h3>
      <div style={styles.grid}>
        {Object.entries(formulas).map(([name, formula]) => (
          <div key={name} style={styles.card}>
            <div style={styles.formulaName}>
              {name.split(/(?=[A-Z])/).join(' ')}
            </div>
            <div style={styles.formulaText}>{formula}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
