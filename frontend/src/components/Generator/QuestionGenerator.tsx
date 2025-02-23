import React from 'react';
import { useScore } from '../../context/ScoreContext';
import { ProgressBar } from '../Progress/ProgressBar';

const styles = {
  container: {
    background: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '500px',
    margin: '0 auto'
  },
  scoreBoard: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '24px',
    padding: '16px',
    background: '#f8fafc',
    borderRadius: '8px'
  },
  scoreStat: {
    textAlign: 'center' as const
  },
  scoreNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e293b'
  },
  scoreLabel: {
    fontSize: '14px',
    color: '#64748b'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  select: {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '4px'
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

interface QuestionGeneratorProps {
  onGenerate: (topic: string, difficulty: string) => void;
}

export const QuestionGenerator: React.FC<QuestionGeneratorProps> = ({ onGenerate }) => {
  const { correctAnswers, wrongAnswers, totalQuestions, coins } = useScore();
  const [topic, setTopic] = React.useState('algebra');
  const [difficulty, setDifficulty] = React.useState('medium');
  const [isLoading, setIsLoading] = React.useState(false);

  const topics = [
    { name: 'algebra', emoji: '➗' },
    { name: 'geometry', emoji: '📐' },
    { name: 'calculus', emoji: '🔢' },
    { name: 'statistics', emoji: '📊' }
  ];

  const difficulties = [
    { name: 'easy', emoji: '😊' },
    { name: 'medium', emoji: '😐' },
    { name: 'hard', emoji: '😰' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.scoreBoard}>
        <div style={styles.scoreStat}>
          <div style={styles.scoreNumber}>{correctAnswers}</div>
          <div style={styles.scoreLabel}>Correct</div>
        </div>
        <div style={styles.scoreStat}>
          <div style={styles.scoreNumber}>{wrongAnswers}</div>
          <div style={styles.scoreLabel}>Wrong</div>
        </div>
        <div style={styles.scoreStat}>
          <div style={styles.scoreNumber}>{totalQuestions}</div>
          <div style={styles.scoreLabel}>Total</div>
        </div>
        <div style={styles.scoreStat}>
          <div style={styles.scoreNumber}>🪙 {coins}</div>
          <div style={styles.scoreLabel}>Coins</div>
        </div>
      </div>
      <ProgressBar />
      <h2 style={styles.title}>🎯 Generate Math Question 📚</h2>
      <div>
        <select
          style={styles.select}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          {topics.map((t) => (
            <option key={t.name} value={t.name}>
              {t.emoji} {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {difficulties.map((d) => (
            <option key={d.name} value={d.name}>
              {d.emoji} {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
            </option>
          ))}
        </select>

        <button
          style={{
            ...styles.button,
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
          onClick={() => onGenerate(topic, difficulty)}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Generating...' : '🚀 Generate Question'}
        </button>
      </div>
    </div>
  );
};
