import React, { createContext, useContext, useState } from 'react';

interface ScoreContextType {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  coins: number;
  incrementCorrect: () => void;
  incrementWrong: () => void;
  resetScores: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [coins, setCoins] = useState(0);

  const incrementCorrect = () => {
    setCorrectAnswers(prev => prev + 1);
    setTotalQuestions(prev => prev + 1);
    setCoins(prev => prev + 5);
  };

  const incrementWrong = () => {
    setWrongAnswers(prev => prev + 1);
    setTotalQuestions(prev => prev + 1);
    setCoins(prev => Math.max(0, prev - 3));
  };

  const resetScores = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTotalQuestions(0);
    setCoins(0);
  };

  return (
    <ScoreContext.Provider value={{
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      coins,
      incrementCorrect,
      incrementWrong,
      resetScores
    }}>
      {children}
    </ScoreContext.Provider>
  );
};
