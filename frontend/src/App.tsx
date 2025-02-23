import React from 'react';
import { Layout } from './components/Layout/Layout';
import { QuestionGenerator } from './components/Generator/QuestionGenerator';
import { QuestionCard } from './components/Question/QuestionCard';
import { ScoreProvider } from './context/ScoreContext';
import { api } from './services/api';
import { TopicType, DifficultyType } from './types';

function App() {
  const [currentQuestion, setCurrentQuestion] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const handleGenerateQuestion = async (topic: string, difficulty: string) => {
    try {
      setLoading(true);
      const question = await api.generateQuestion(topic, difficulty);
      setCurrentQuestion(question);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScoreProvider>
      <Layout>
        <QuestionGenerator onGenerate={handleGenerateQuestion} />

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '18px', fontWeight: 500 }}>
              🤔 Generating your question...
            </div>
          </div>
        )}

        {currentQuestion && !loading && (
          <QuestionCard
            question={currentQuestion.question}
            answer={currentQuestion.answer}
            explanation={currentQuestion.explanation}
            similar_question={currentQuestion.similar_question}
            similar_answer={currentQuestion.similar_answer} 
            topic={currentQuestion.topic as TopicType}
            difficulty={currentQuestion.difficulty as DifficultyType}
            onNewQuestion={() => handleGenerateQuestion(currentQuestion.topic, currentQuestion.difficulty)}
          />
        )}

      </Layout>
    </ScoreProvider>
  );
}

export default App;
