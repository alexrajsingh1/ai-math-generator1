import React from 'react';
import { useScore } from '../../context/ScoreContext';
import { api } from '../../services/api';
import { QuestionTimer } from './QuestionTimer';
import { SolvingCanvas } from '../Canvas/SolvingCanvas';
import { FormulaDisplay } from '../Formula/FormulaDisplay';
import { DifficultyType, TopicType } from '../../types';

const styles = {
    container: {
        background: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '700px',
        margin: '20px auto'
    },
    questionSection: {
        marginBottom: '24px'
    },
    question: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    button: {
        background: '#3b82f6',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '16px'
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        marginBottom: '16px'
    },
    hintEmoji: {
        fontSize: '36px',
        cursor: 'pointer',
        userSelect: 'none' as const,
        animation: '1s shake infinite',
        position: 'relative' as const,
        display: 'inline-block',
        textShadow: `
      0 0 10px #ff0000,
      0 0 20px #ff6b00,
      0 0 30px #ffd700
    `,
        transition: 'text-shadow 0.2s ease'
    },
    generateButton: {
        background: '#10b981',
        width: '100%'
    },
    input: {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '4px',
        marginBottom: '16px',
        fontSize: '16px'
    },
    feedback: {
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '16px',
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
        fontWeight: '500'
    },
    hintsContainer: {
        marginBottom: '16px'
    },
    hint: {
        padding: '10px',
        backgroundColor: '#dbeafe',
        borderRadius: '4px',
        marginBottom: '8px',
        color: '#1e40af',
        fontSize: '14px'
    },
    answerSection: {
        marginTop: '16px'
    },
    label: {
        fontWeight: '600',
        marginBottom: '4px'
    },
    text: {
        color: '#4b5563',
        marginBottom: '12px'
    },
    workspaceSection: {
        marginTop: '24px',
        marginBottom: '24px'
    },
    workspaceTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '12px'
    },
    formulaContainer: {
        fontFamily: 'math, serif',
        fontSize: '18px',
        padding: '12px',
        background: '#f8fafc',
        borderRadius: '6px',
        marginBottom: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    formula: {
        flex: 1,
        lineHeight: 1.5
    },
    copyButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '4px',
        borderRadius: '4px',
        transition: 'transform 0.2s ease',
        ':hover': {
            transform: 'scale(1.1)'
        },
    },
    saveLoadContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '16px'
    }
};

const ShakeAnimation = () => (
    <style>
        {`
      @keyframes shake {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(10deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-10deg); }
        100% { transform: rotate(0deg); }
      }
    `}
    </style>
);

interface QuestionCardProps {
    question: string;
    answer: string;
    explanation: string;
    similar_question?: string;
    similar_answer?: string;
    onNewQuestion: () => void;
    topic: TopicType;
    difficulty: DifficultyType;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    answer,
    explanation,
    similar_question,
    similar_answer,
    onNewQuestion,
    topic,
    difficulty
}) => {
    const [userAnswer, setUserAnswer] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [hintIndex, setHintIndex] = React.useState(0);
    const { incrementCorrect, incrementWrong } = useScore();
    const [copied, setCopied] = React.useState(false);
    const [isSimilarQuestion, setIsSimilarQuestion] = React.useState(false);
    const [currentQuestion, setCurrentQuestion] = React.useState(question);
    const [currentAnswer, setCurrentAnswer] = React.useState(answer);
    const [displayQuestion, setDisplayQuestion] = React.useState(question);
    const [displayAnswer, setDisplayAnswer] = React.useState(answer);

    const hints = explanation
    ? explanation
        .split('\n')
        .filter(hint => hint.trim().length > 0)
        .map(hint => hint.replace(/^\d+\.\s*/, '').trim())
    : [];

    const showNextHint = () => {
        if (hintIndex < hints.length) {
            setHintIndex(prev => prev + 1);
        }
    };

    React.useEffect(() => {
        setCurrentQuestion(question);
        setCurrentAnswer(answer);
    }, [question, answer]);

    const handleTrySimilarQuestion = () => {
        if (similar_question) {
            setDisplayQuestion(similar_question);
            setDisplayAnswer(similar_answer || '');
            setIsSimilarQuestion(true);
            setUserAnswer('');
            setFeedback('');
            setShowAnswer(false);
            setHintIndex(0);
        }
    };

    const handleSubmitAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userAnswer.trim()) {
            setFeedback("⚠️ Please enter an answer");
            return;
        }
        try {
            const response = await api.validateAnswer(userAnswer, displayAnswer);
            setFeedback(response.feedback);
            if (response.is_correct) {
                incrementCorrect();
                setShowAnswer(false);
            } else {
                incrementWrong();
                setShowAnswer(true);
            }
        } catch (error) {
            console.error('Error validating answer:', error);
            setFeedback("⚠️ Error checking answer");
        }
    };

    return (
        <div style={styles.container}>
            <ShakeAnimation />
            <div style={styles.formulaContainer}>
                <div style={styles.formula}>
                    <span style={{ color: '#64748b', marginRight: '8px' }}>
                        {isSimilarQuestion ? "Similar Problem" : "Problem"}:
                    </span>
                    {displayQuestion}
                </div>
                <button
                    style={styles.copyButton}
                    onClick={() => {
                        navigator.clipboard.writeText(displayQuestion);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}
                    title="Copy formula"
                >
                    {copied ? '✅' : '📋'}
                </button>
            </div>

            <form onSubmit={handleSubmitAnswer}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="✏️ Enter your answer"
                    required
                    style={styles.input}
                />
                <div style={styles.buttonContainer}>
                    <button type="submit" style={styles.button}>
                        ✅ Submit Answer
                    </button>
                    <span
                        style={styles.hintEmoji}
                        onClick={showNextHint}
                        role="button"
                        aria-label="Get hint"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.textShadow = `
                0 0 15px #ff0000,
                0 0 25px #ff6b00,
                0 0 35px #ffd700
              `;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.textShadow = `
                0 0 10px #ff0000,
                0 0 20px #ff6b00,
                0 0 30px #ffd700
              `;
                        }}
                    >
                        💡
                    </span>
                </div>
            </form>

            <FormulaDisplay topic={topic} difficulty={difficulty} />


            {hintIndex > 0 && (
                <div style={styles.hintsContainer}>
                    {hints.slice(0, hintIndex).map((hint, index) => (
                        <div key={index} style={styles.hint}>
                            🔹 Hint {index + 1}: {hint}
                        </div>
                    ))}
                </div>
            )}

            <div style={styles.questionSection}>
                <QuestionTimer
                    duration={300}
                    onTimeUp={() => {
                        setShowAnswer(true);
                        setFeedback("⏱️ Time's up! Let's see the answer.");
                        incrementWrong();
                    }}
                />
            </div>

            <div style={styles.workspaceSection}>
                <h3 style={styles.workspaceTitle}>📝 Workspace</h3>
                <SolvingCanvas />
            </div>

            {feedback && <div style={styles.feedback}>{feedback}</div>}

            {showAnswer && (
                <div style={styles.answerSection}>
                    <div style={styles.label}>🎯 Correct Answer:</div>
                    <div style={styles.text}>{currentAnswer}</div>
                    <div style={styles.label}>📖 Explanation:</div>
                    <div style={styles.text}>{explanation}</div>

                    <div style={styles.label}>🔄 Similar Question Available: ✨</div>
                    <div style={styles.text}>{similar_question ? "Yes ✅" : "No ❌"}</div>
                    <div style={styles.text}>{similar_question}</div>

                    <button
                        onClick={handleTrySimilarQuestion}
                        style={{
                            ...styles.button,
                            backgroundColor: '#8b5cf6',
                            marginTop: '12px',
                            width: '100%'
                        }}
                    >
                        🎯 Try Similar Question
                    </button>
                </div>
            )}
            <button
                style={{ ...styles.button, ...styles.generateButton }}
                onClick={onNewQuestion}
            >
                🔄 Generate New Question
            </button>
        </div>
    );
};
