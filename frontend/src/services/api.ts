import axios from 'axios';
import { ValidateAnswerResponse } from '../types';

const API_URL = 'https://ubiquitous-memory-v6q97g6wv49g3pgxp-5000.app.github.dev/api';

export const api = {
  generateQuestion: async (topic: string, difficulty: string) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${API_URL}/generate-question`,
        data: { topic, difficulty },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  validateAnswer: async (userAnswer: string, correctAnswer: string): Promise<ValidateAnswerResponse> => {
    try {
      const response = await axios.post<ValidateAnswerResponse>(
        `${API_URL}/validate-answer`,
        {
          user_answer: userAnswer,
          correct_answer: correctAnswer
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return {
        is_correct: false,
        feedback: "Error validating answer. Please try again.",
        correct_answer: correctAnswer
      };
    }
  }
};
