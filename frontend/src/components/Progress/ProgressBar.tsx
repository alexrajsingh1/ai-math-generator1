import React from 'react';
import { useScore } from '../../context/ScoreContext';

const styles = {
  progressContainer: {
    width: '100%',
    background: '#e2e8f0',
    borderRadius: '8px',
    padding: '2px',
    marginTop: '12px',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
  },
  progressBar: {
    height: '8px',
    borderRadius: '6px',
    transition: 'width 0.3s ease, background-color 0.3s ease'
  },
  levelText: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px'
  }
};

export const ProgressBar: React.FC = () => {
  const { correctAnswers } = useScore();
  const levelThreshold = 10;
  const currentLevel = Math.floor(correctAnswers / levelThreshold) + 1;
  const progress = (correctAnswers % levelThreshold) / levelThreshold * 100;

  const getProgressColor = (progress: number) => {
    if (progress < 30) return '#fde047';
    if (progress < 70) return '#22c55e';
    return '#10b981';
  };

  return (
    <div>
      <div style={styles.levelText}>
        Level {currentLevel} - Progress: {Math.round(progress)}%
      </div>
      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress)
          }}
        />
      </div>
    </div>
  );
};
