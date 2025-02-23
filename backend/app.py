from flask import Flask, request, jsonify
from flask_cors import CORS
from services.question_service import QuestionService

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://ubiquitous-memory-v6q97g6wv49g3pgxp-3000.app.github.dev",
            "http://localhost:3000"  # Added for local development
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Origin", "Accept", "Authorization"]
    }
})

question_service = QuestionService()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "ai-math-generator"}), 200

@app.route('/api/validate-answer', methods=['POST'])
def validate_answer():
    try:
        data = request.json
        user_answer = data.get('user_answer', '').strip()
        correct_answer = data.get('correct_answer', '').strip()
        topic = data.get('topic')  # Added topic parameter
        validation_result = question_service.validate_answer(
            user_answer, 
            correct_answer,
            topic
        )
        return jsonify(validation_result)
    except Exception as e:
        return jsonify({
            'error': str(e),
            'feedback': "There was an error validating your answer. Please try again."
        }), 500

@app.route('/api/generate-question', methods=['POST'])
def generate_question():
    try:
        data = request.json
        question = question_service.create_question(
            topic=data.get('topic'),
            difficulty=data.get('difficulty')
        )
        return jsonify(question)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
