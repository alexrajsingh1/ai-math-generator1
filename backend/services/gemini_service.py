import random
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

def generate_fallback_question(topic: str, difficulty: str) -> dict:
    fallback_questions = {
        'algebra': {
            'easy': [
                {
                    'question': 'Solve for x: 2x + 5 = 13',
                    'answer': 'x = 4',
                    'explanation': '1. Subtract 5 from both sides: 2x = 8\n2. Divide both sides by 2: x = 4',
                    'similar_question': 'Solve for x: 2x + 3 = 11'
                },
                {
                    'question': 'Simplify: 3(x + 2) - 2x',
                    'answer': 'x + 6',
                    'explanation': '1. Distribute 3: 3x + 6 - 2x\n2. Combine like terms: x + 6',
                    'similar_question': 'Simplify: 4(x + 1) - 3x'
                }
            ],
            'medium': [
                {
                    'question': 'Solve the quadratic equation: x² + 5x + 6 = 0',
                    'answer': 'x = -2 or x = -3',
                    'explanation': '1. Factor: (x + 2)(x + 3) = 0\n2. Set each factor to zero\n3. Solve: x = -2 or x = -3',
                    'similar_question': 'Solve: x² + 7x + 12 = 0'
                }
            ],
            'hard': [
                {
                    'question': 'Solve the system of equations:\n3x + 2y = 12\n4x - y = 5',
                    'answer': 'x = 2, y = 3',
                    'explanation': '1. Solve for y in second equation: y = 4x - 5\n2. Substitute into first equation\n3. Solve for x\n4. Find y',
                    'similar_question': 'Solve:\n2x + 3y = 13\n5x - 2y = 4'
                }
            ]
        },
        'geometry': {
            'easy': [
                {
                    'question': 'Find the area of a rectangle with length 8 units and width 5 units.',
                    'answer': '40 square units',
                    'explanation': 'Area of rectangle = length × width = 8 × 5 = 40 square units',
                    'similar_question': 'Find the area of a rectangle with length 6 units and width 7 units.'
                }
            ],
            'medium': [
                {
                    'question': 'Find the area of a circle with radius 6 units. Use π = 3.14.',
                    'answer': '113.04 square units',
                    'explanation': 'Area = πr² = 3.14 × 6² = 3.14 × 36 = 113.04 square units',
                    'similar_question': 'Find the area of a circle with radius 8 units. Use π = 3.14.'
                }
            ]
        },
        'statistics': {
            'easy': [
                {
                    'question': 'Find the mean of the numbers: 3, 7, 9, 15, 21.',
                    'answer': '11',
                    'explanation': 'Mean = (3 + 7 + 9 + 15 + 21) / 5 = 55 / 5 = 11',
                    'similar_question': 'Find the mean of the numbers: 4, 8, 12, 16, 20.'
                }
            ],
            'medium': [
                {
                    'question': 'Find the median of the dataset: 4, 8, 10, 15, 20, 25.',
                    'answer': '12.5',
                    'explanation': 'Median = (10 + 15) / 2 = 12.5',
                    'similar_question': 'Find the median of the dataset: 5, 10, 12, 18, 25, 30.'
                }
            ]
        },
        'calculus': {
            'easy': [
                {
                    'question': 'Find the derivative of f(x) = 3x² + 5x - 2.',
                    'answer': '6x + 5',
                    'explanation': 'Derivative of 3x² is 6x, derivative of 5x is 5, derivative of -2 is 0.',
                    'similar_question': 'Find the derivative of f(x) = 4x² + 6x - 3.'
                }
            ],
            'medium': [
                {
                    'question': 'Evaluate the integral ∫(2x + 3) dx.',
                    'answer': 'x² + 3x + C',
                    'explanation': 'Integral of 2x is x², integral of 3 is 3x, and C is the constant of integration.',
                    'similar_question': 'Evaluate the integral ∫(3x + 4) dx.'
                }
            ]
        }
    }

    if topic not in fallback_questions:
        fallback_questions[topic] = {
            'easy': [
                {
                    'question': f'Basic {topic} question',
                    'answer': 'Sample answer',
                    'explanation': 'Sample explanation',
                    'similar_question': 'Similar question'
                }
            ],
            'medium': [
                {
                    'question': f'Intermediate {topic} question',
                    'answer': 'Sample answer',
                    'explanation': 'Sample explanation',
                    'similar_question': 'Similar question'
                }
            ],
            'hard': [
                {
                    'question': f'Advanced {topic} question',
                    'answer': 'Sample answer',
                    'explanation': 'Sample explanation',
                    'similar_question': 'Similar question'
                }
            ]
        }

    if difficulty not in fallback_questions[topic]:
        difficulty = 'medium'

    questions = fallback_questions[topic][difficulty]
    question = random.choice(questions)

    return {
        **question,
        'topic': topic,
        'difficulty': difficulty
    }


def initialize_gemini():
    api_key = os.getenv('GOOGLE_GEMINI_API_KEY')
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-pro')

def generate_math_question(topic: str, difficulty: str) -> dict:
    model = initialize_gemini()
    prompt = f"""
    Generate a {difficulty} math question about {topic}.
    Return only valid JSON with this structure:
    {{
        "question": "Clear mathematical question with proper notation",
        "answer": "Precise numerical or algebraic answer",
        "explanation": "Step-by-step solution process",
        "similar_question": "Related practice question of similar difficulty"
    }}
    """
    
    response = model.generate_content(prompt)
    generated_text = response.text.strip()
    
    if '```' in generated_text:
        generated_text = ''.join(generated_text.split('```')[1::2])
    generated_text = generated_text.strip()
    
    try:
        question_data = json.loads(generated_text)
        return {
            **question_data,
            'topic': topic,
            'difficulty': difficulty
        }
    except json.JSONDecodeError:
        return generate_fallback_question(topic, difficulty)
