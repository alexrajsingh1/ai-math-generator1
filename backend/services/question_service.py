from typing import Dict
from sympy import simplify, sympify
from .gemini_service import generate_math_question
from config.firebase_config import initialize_firebase

db = initialize_firebase()

class QuestionService:
    @staticmethod
    def create_question(topic: str, difficulty: str) -> Dict:
        try:
            question_data = generate_math_question(topic, difficulty)
            question_data.update({
                'topic': topic,
                'difficulty': difficulty,
                'status': 'active'
            })
            
            doc_ref = db.collection('questions').add(question_data)
            question_data['id'] = doc_ref[1].id
            return question_data
        except Exception as e:
            return generate_fallback_question(topic, difficulty)



    @staticmethod
    def _validate_algebraic(user_val: str, correct_val: str) -> bool:
        try:
            user_expr = sympify(user_val)
            correct_expr = sympify(correct_val)
            return simplify(user_expr - correct_expr) == 0
        except:
            return user_val == correct_val

    @staticmethod
    def _validate_geometric(user_val: str, correct_val: str) -> bool:
        # Remove units and compare numerical values
        user_num = ''.join(filter(str.isdigit, user_val))
        correct_num = ''.join(filter(str.isdigit, correct_val))
        return user_num == correct_num

    @staticmethod
    def _validate_statistical(user_val: str, correct_val: str) -> bool:
        # Handle decimal and percentage comparisons
        try:
            user_num = float(user_val.strip('%'))
            correct_num = float(correct_val.strip('%'))
            return abs(user_num - correct_num) < 0.01
        except:
            return user_val == correct_val

    @staticmethod
    def _validate_calculus(user_val: str, correct_val: str) -> bool:
        try:
            user_expr = sympify(user_val)
            correct_expr = sympify(correct_val)
            return simplify(user_expr - correct_expr) == 0
        except:
            return user_val == correct_val

    @staticmethod
    def validate_answer(user_answer: str, correct_answer: str, topic: str = None) -> Dict:
        try:
            user_val = user_answer.strip().lower().replace(' ', '')
            correct_val = correct_answer.strip().lower().replace(' ', '')

            validators = {
                'algebra': QuestionService._validate_algebraic,
                'geometry': QuestionService._validate_geometric,
                'statistics': QuestionService._validate_statistical,
                'calculus': QuestionService._validate_calculus
            }

            if topic and topic in validators:
                is_correct = validators[topic](user_val, correct_val)
            else:
                is_correct = any(
                    validator(user_val, correct_val) 
                    for validator in validators.values()
                )

            return {
                'is_correct': is_correct,
                'feedback': "Excellent! Well done! 🎉" if is_correct else "Nice try! 😊 Almost there!",
                'correct_answer': correct_answer
            }
        except Exception as e:
            return {
                'is_correct': False,
                'feedback': f"Invalid answer format: {str(e)}",
                'correct_answer': correct_answer
            }
