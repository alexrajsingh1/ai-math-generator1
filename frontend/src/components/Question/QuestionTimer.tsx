import React, { useState, useEffect } from 'react';

const styles = {
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  },
  timer: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#4b5563',
    padding: '4px 12px',
    borderRadius: '4px',
    background: '#f3f4f6'
  },
  progressBar: {
    flex: 1,
    height: '4px',
    background: '#e2e8f0',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progress: {
    height: '100%',
    transition: 'width 1s linear, background-color 0.3s ease'
  }
};

interface QuestionTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

export const QuestionTimer: React.FC<QuestionTimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp]);

  const getProgressColor = () => {
    const percentage = (timeLeft / duration) * 100;
    if (percentage > 60) return '#22c55e';
    if (percentage > 30) return '#eab308';
    return '#ef4444';
  };

  return (
    <div style={styles.timerContainer}>
      <div style={styles.timer}>
        ⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </div>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${(timeLeft / duration) * 100}%`,
            backgroundColor: getProgressColor()
          }}
        />
      </div>
    </div>
  );
};
