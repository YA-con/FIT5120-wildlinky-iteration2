import React, { useState, useEffect } from "react";
import quizData from "./QuizData";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};
const buttonBaseStyle = {
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};
const Quiz = ({ onQuit }) => {
  const [shuffledQuizData, setShuffledQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    resetQuiz();
  }, []);

  const resetQuiz = () => {
    const preparedData = quizData.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuizData(preparedData);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResult(false);
  };

  const handleOptionClick = (selectedOption) => {
    if (userAnswers[currentQuestion] !== undefined) return;
  
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption
    }));
  
    const isCorrect = selectedOption === shuffledQuizData[currentQuestion].correctAnswer;
  
    if (isCorrect) {
      setTimeout(() => {
        if (currentQuestion < shuffledQuizData.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setShowResult(true);
        }
      }, 500);
    }
  };
  

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleFinish = () => {
    setShowResult(true);
  };

  if (shuffledQuizData.length === 0) {
    return <p>Loading quiz...</p>;
  }

  const totalQuestions = shuffledQuizData.length;
  const questionItem = shuffledQuizData[currentQuestion];
  const selectedAnswer = userAnswers[currentQuestion];
  const correctAnswer = questionItem.correctAnswer;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  if (showResult) {
    const correctCount = Object.keys(userAnswers).filter((key) => {
      return userAnswers[key] === shuffledQuizData[key].correctAnswer;
    }).length;
    const incorrect = totalQuestions - correctCount;
    const accuracy = ((correctCount / totalQuestions) * 100).toFixed(2);

    return (
      <div style={{ textAlign: "center" }}>
        <h2>🎉 Quiz Completed!</h2>
        <p>✅ Correct: {correctCount}</p>
        <p>❌ Incorrect: {incorrect}</p>
        <p>📈 Accuracy: {accuracy}%</p>

        <div style={{ marginTop: "20px" }}>
          <button onClick={resetQuiz} style={buttonStyle}>
            🔁 Retake Quiz
          </button>
          <button
            onClick={onQuit}
            style={{ ...buttonStyle, marginLeft: "10px" }}
          >
            🔙 Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "200px",
      }}
    >
      {/* --- Progress --- */}
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
        Question {currentQuestion + 1} / {totalQuestions}
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "#eee",
          height: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            backgroundColor: "#4caf50",
            height: "100%",
            borderRadius: "5px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* --- Question & Options --- */}
      <div style={{ flexGrow: 1 }}>
        <h3 style={{ minHeight: "60px" }}>{questionItem.question}</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {questionItem.options.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => handleOptionClick(opt)}
              style={{
                cursor:
                  userAnswers[currentQuestion] === undefined
                    ? "pointer"
                    : "default",
                padding: "15px",
                margin: "12px 0",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "0.3s",
                backgroundColor: selectedAnswer
                  ? opt === correctAnswer
                    ? "#d4edda"
                    : opt === selectedAnswer
                    ? "#f8d7da"
                    : "white"
                  : "white",
                fontWeight: "500",
                fontSize: "16px",
                textAlign: "center",
                userSelect: "none",
                pointerEvents: selectedAnswer !== undefined ? "none" : "auto",
              }}
              onMouseEnter={(e) => {
                if (userAnswers[currentQuestion] === undefined) {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (userAnswers[currentQuestion] === undefined) {
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                }
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>

      {/* --- Navigation Buttons --- */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        {currentQuestion > 0 && (
          <button
            onClick={handlePrev}
            style={{
              ...buttonBaseStyle,
              backgroundColor: "#9e9e9e",
              marginRight: "10px",
            }}
          >
            Previous
          </button>
        )}
        {currentQuestion < totalQuestions - 1 && (
          <button
            onClick={handleNext}
            style={{ ...buttonBaseStyle, backgroundColor: "#4caf50" }}
          >
            Next
          </button>
        )}
        {currentQuestion === totalQuestions - 1 && (
          <button
            onClick={handleFinish}
            style={{ ...buttonBaseStyle, backgroundColor: "#2196f3" }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default Quiz;
