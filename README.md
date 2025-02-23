# AI Math Tutor: Interactive Learning Platform 🚀📚

## 🎯 Introduction

AI Math Tutor is an advanced educational platform that leverages **artificial intelligence 🤖** to create an **interactive** and **engaging** learning experience for mathematics! Powered by **Google Gemini AI 🌍**, this platform dynamically generates **personalized math problems** across multiple domains and difficulty levels, providing **real-time feedback ✅** and **step-by-step solutions 🔍** to enhance understanding.

---

## 🌟 Features

- **🤖 AI-Powered Question Generation**: Generates unique math problems using **Google Gemini AI**.
- **📊 Multiple Math Domains**: Covers **Algebra, Geometry, Calculus, and Statistics**.
- **📈 Adaptive Difficulty Levels**: Offers **Easy 🟢, Medium 🟡, and Hard 🔴** levels to match learners' abilities.
- **📝 Interactive Workspace**: Built-in **canvas 🖌️** for calculations and problem-solving.
- **✅ Smart Answer Validation**: Intelligent system that understands mathematical equivalence.
- **📖 Step-by-Step Solutions**: Provides **detailed explanations 📚** for each question.
- **🔄 Similar Question Generator**: Generates **related practice problems**.
- **⏳ Timed Practice Sessions**: Helps improve **speed ⚡ and accuracy 🎯**.
- **📊 Progress Tracking**: Monitors learning journey with **score tracking 📌**.

---

## 👥 Target Users

- **🎓 Students** looking for extra practice.
- **👩‍🏫 Teachers** searching for teaching resources.
- **📚 Self-learners** exploring mathematical concepts.
- **🧠 Anyone** wanting to improve math skills interactively.

---

## 📚 Educational Impact

- **🎯 Personalized Learning Experience**: AI adapts questions based on performance.
- **⚡ Immediate Feedback System**: Reinforces learning with instant corrections.
- **📈 Progressive Difficulty Adjustment**: Ensures continued learning growth.
- **📚 Comprehensive Topic Coverage**: Helps develop strong **mathematical foundations**.
- **🔁 Practice-Oriented Approach**: Encourages **concept retention through repetition**.

---

## 🎥 Demo Video 🎬

  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
    <img src="https://github.com/alexrajsingh1/ai-math-generator1/blob/main/demo.png" alt="Demo Video Thumbnail" width="400">
  </a>
---

## 💻 Technical Stack 🔧

### **Frontend 🎨**:

- **⚛️ React with TypeScript**: Modern UI development.
- **📱 Responsive Design**: Ensures usability across devices.
- **🔄 Real-Time Updates**: Provides dynamic interaction.
- **🖌️ Interactive Components**: User-friendly interface.

### **Backend 🖥️**:

- **🐍 Python & Flask**: API development and AI integration.
- **🌍 Google Gemini AI**: AI-powered question generation.
- **🔢 SymPy**: Advanced mathematical processing.
- **🔥 Firebase Integration**:
  - **📊 Real-time Storage**: Saves questions, user progress & history.
  - **⚡ Fast Performance**: Low-latency, quick sync, efficient caching.
  - **🔒 Secure & Reliable**: Built-in auth, protected API, secure access rules.
  - **📈 Scalable**: Handles multiple users, auto-scales, no server management.
  - **💰 Cost-Effective**: Free tier, pay-as-you-grow, no upfront costs.

---

## 🛠️ Key Components Built

### **Backend (Python/Flask) 🖥️**:

- **🤖 Question Generation**: Utilizes **Google Gemini AI** to generate questions dynamically.
- **✅ Answer Validation**: Ensures responses are checked accurately for various math topics.
- **🔥 Firebase Integration**: Stores questions, answers, and user progress data.
- **📦 Fallback System**: Provides **pre-defined questions** in case AI generation fails.

### **Frontend (React/TypeScript) 🎨**:

- **🖌️ Clean UI**: Intuitive interface for easy navigation.
- **📊 Real-time Question Display**: Students can **view & answer** questions interactively.
- **✍️ Interactive Workspace**: Includes a **drawing canvas** for solving problems visually.
- **📖 Formula Reference**: Displays **relevant formulas** based on selected topics.
- **⏳ Timer System**: Allows for **timed practice sessions**.
- **💡 Hint System**: Offers **progressive hints** to guide students.
- **🔄 Similar Question Feature**: Generates **new variations** of questions for additional practice.

---


### **Prerequisites 📝**

- 🐍 Python 3.x
- 💻 Node.js & npm
- 🔥 Firebase account

## 📦 Installation & Setup 🛠️

### **Backend Setup 🖥️**

### 🛠 **Environment Setup**  

### 📌 **Step 1: Gemini API Key:**

1. Visit **Google AI Studio** ([makersuite.google.com](https://makersuite.google.com))
2. Sign in with your Google account
3. Click **"Get API Key"** in the top right
4. Create a new API key

```sh
echo "GOOGLE_GEMINI_API_KEY=your_key_here" > .env
```

### 📌 **Step 2:** Place `firebase-key.json` in: 
 
1. Go to **Firebase Console** ([console.firebase.google.com](https://console.firebase.google.com))
2. Select your project
3. Click **⚙️ (Settings) > Project settings**
4. Go to the **"Service accounts"** tab
5. Click **"Generate New Private Key"**
6. Save the downloaded JSON as **firebase-key.json**
7. Place in the project root directory

📂 `backend/config/keys/ 🔑` 

### then 
```sh
# Clone the repository 🌀
git clone https://github.com/alexrajsingh1/ai-math-generator1.git
cd ai-math-generator1/backend

# Create and activate a virtual environment 🌍
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies 📦
pip install -r requirements.txt

# Start the Flask server 🚀
python app.py
```


### **Frontend Setup 🎨**

```sh
# Navigate to frontend directory 🏗️
cd ../frontend

# Install dependencies 📦
npm install axios react-router-dom @types/react-router-dom react-canvas-draw @types/react-canvas-draw

# Start the React app ⚛️
npm start
```

Here’s your updated **Environment Setup** section with emojis! 🚀🔥  

---
 

✅ **Now you're ready to rock!** 🎸🎯  

### 🚀 **Project Running URLs:**  

- 🖥 **Frontend:** [http://localhost:3000](http://localhost:3000)  
- ⚙️ **Backend:** [http://localhost:5000](http://localhost:5000)  

💡 **Time to build something amazing!** ✨🔥

## 🛠 Key Code Examples

### **🔥 Backend (Python/Flask)**

#### 🤖 AI-Powered Question Generation

```python
def generate_math_question(topic: str, difficulty: str) -> dict:
    model = initialize_gemini()
    prompt = f"""
    Generate a {difficulty} math question about {topic}.
    Return only valid JSON with this structure:
    {{
        "question": "Clear mathematical question",
        "answer": "Precise answer",
        "explanation": "Step-by-step solution",
        "similar_question": "Related practice question"
    }}
    """
    response = model.generate_content(prompt)
    return json.loads(response.text)
```

#### ✅ Smart Answer Validation

```python
def validate_answer(user_answer: str, correct_answer: str, topic: str) -> dict:
    validators = {
        'algebra': validate_algebraic,
        'geometry': validate_geometric,
        'statistics': validate_statistical,
        'calculus': validate_calculus
    }
    
    is_correct = validators[topic](user_answer, correct_answer)
    return {
        'is_correct': is_correct,
        'feedback': "Excellent! 🎉" if is_correct else "Try again! 😊"
    }
```

### **🎨 Frontend (React/TypeScript)**

#### 🧠 Question Generator Component

```tsx
const QuestionGenerator: React.FC = () => {
    const [topic, setTopic] = useState<TopicType>('algebra');
    const [difficulty, setDifficulty] = useState<DifficultyType>('medium');

    const generateQuestion = async () => {
        const question = await api.generateQuestion(topic, difficulty);
        // Handle new question
    };

    return (
        <div className="generator">
            <select value={topic} onChange={(e) => setTopic(e.target.value as TopicType)}>
                <option value="algebra">Algebra</option>
                <option value="geometry">Geometry</option>
                <option value="calculus">Calculus</option>
            </select>
            <button onClick={generateQuestion}>Generate Question</button>
        </div>
    );
};
```

#### 🔗 API Service

```tsx
const api = {
    generateQuestion: async (topic: string, difficulty: string) => {
        const response = await axios.post('/api/generate-question', { topic, difficulty });
        return response.data;
    },
    
    validateAnswer: async (userAnswer: string, correctAnswer: string) => {
        const response = await axios.post('/api/validate-answer', { user_answer: userAnswer, correct_answer: correctAnswer });
        return response.data;
    }
};
```

---

## 📂 Folder Structure

```
ai-math-generator1
├── backend 🚀
│   ├── .env 🌍
│   ├── app.py 🐍
│   ├── config ⚙️
│   │   ├── __pycache__
│   │   │   └── firebase_config.cpython-312.pyc
│   │   ├── firebase_config.py 🔥
│   │   └── keys
│   │       └── firebase-key.json 🔑
│   ├── requirements.txt 📜
│   └── services 🛠️
│       ├── __pycache__
│       │   ├── gemini_service.cpython-312.pyc
│       │   └── question_service.cpython-312.pyc
│       ├── gemini_service.py 🤖
│       └── question_service.py 🧩
└── frontend 🎨
    ├── README.md 📘
    ├── package-lock.json 📦
    ├── package.json 📦
    ├── src 📂
    │   ├── App.css 🎨
    │   ├── App.test.tsx ✅
    │   ├── App.tsx 🚀
    │   ├── components 🏗️
    │   │   ├── Canvas
    │   │   │   └── SolvingCanvas.tsx ✍️
    │   │   ├── Formula
    │   │   │   └── FormulaDisplay.tsx 🔢
    │   │   ├── Generator
    │   │   │   └── QuestionGenerator.tsx 🎲
    │   │   ├── Layout
    │   │   │   └── Layout.tsx 🏠
    │   │   ├── Progress
    │   │   │   └── ProgressBar.tsx 📊
    │   │   └── Question
    │   │       ├── QuestionCard.tsx 🎴
    │   │       └── QuestionTimer.tsx ⏳
    │   ├── constants
    │   │   └── formulas.ts 📝
    │   ├── context
    │   │   └── ScoreContext.tsx 🏆
    │   ├── index.css 🎨
    │   ├── index.tsx 🚀
    │   ├── logo.svg 🎨
    │   ├── react-app-env.d.ts 🛠️
    │   ├── reportWebVitals.ts 📊
    │   ├── services
    │   │   └── api.ts 🌐
    │   ├── setupTests.ts ✅
    │   └── types
    │       └── index.ts 📜
    └── tsconfig.json ⚙️

```


---

## 🚀 Conclusion 🎯

AI Math Tutor is a **step towards the future 🚀** of **AI-driven interactive math education 📚**. With **dynamic question generation 🤖**, **real-time feedback ✅**, and **adaptive learning 🔄**, this project aims to **revolutionize the way students engage with mathematics**! 🌟🔢

By leveraging the power of **Google Gemini AI, Firebase, and modern web technologies**, we ensure a **seamless and efficient** learning experience for students of all levels. The integration of **intelligent answer validation, progress tracking, and interactive problem-solving tools** sets a new standard for **math education technology**. 

Looking ahead, AI Math Tutor has immense potential for **expansion and enhancement**, such as adding **voice-based interactions, AI-driven tutoring bots, and multilingual support** to further personalize and improve the learning journey. 🚀🎓
