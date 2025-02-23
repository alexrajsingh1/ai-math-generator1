export interface ValidateAnswerResponse {
  is_correct: boolean;
  feedback: string;
  correct_answer: string;
}

export interface Question {
  id?: string;
  question: string;
  answer: string;
  explanation: string;
  topic: TopicType;
  difficulty: DifficultyType;
  similar_question?: string;
  similar_answer?: string; 
}

export type DifficultyType = 'easy' | 'medium' | 'hard';
export type TopicType = 'algebra' | 'geometry' | 'calculus' | 'statistics';
export type SubtopicType = string;


export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type MathTopic = 'algebra' | 'geometry' | 'calculus' | 'statistics';

export interface Formula {
  name: string;
  expression: string;
  description?: string;
}
export interface FormulaPageProps {
  topic: MathTopic;
  difficulty: DifficultyLevel;
}
