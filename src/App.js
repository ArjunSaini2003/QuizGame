import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.jsonserve.com/Uw5CrX", { mode: "no-cors" })
      .then((response) => setQuestions(response.data.questions))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setQuestions([
          {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correct_answer: "Paris",
          },
          {
            question: "Which is the largest planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct_answer: "Jupiter",
          },
          {
            question: "Who developed the theory of relativity?",
            options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
            correct_answer: "Albert Einstein",
          },
          {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"],
            correct_answer: "Mitochondria",
          },
          {
            question: "Which is the longest river in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correct_answer: "Nile",
          }
        ]);
      });
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="quiz-container d-flex align-items-center justify-content-center vh-100">
      <div className="card quiz-card shadow-lg p-4 text-center">
        <h2 className="mb-4 text-black">🎯 Quiz Challenge</h2>
        {!quizStarted ? (
          <button className="btn btn-primary" onClick={handleStartQuiz}>Start Quiz</button>
        ) : showResult ? (
          <div>
            <h3 className="text-black">Your Score: {score} / {questions.length}</h3>
            <button className="btn btn-warning mt-3" onClick={() => window.location.reload()}>
              🔄 Restart Quiz
            </button>
          </div>
        ) : questions.length > 0 ? (
          <div>
            <h4 className="mb-3 text-black">{questions[currentQuestionIndex].question}</h4>
            <div className="list-group">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action quiz-option ${selectedAnswer === option ? (option === questions[currentQuestionIndex].correct_answer ? 'correct' : 'wrong') : ''}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="progress mt-4">
              <div
                className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              >
                {currentQuestionIndex + 1} / {questions.length}
              </div>
            </div>
          </div>
        ) : (
          <h4 className="text-white">Loading questions...</h4>
        )}
      </div>
    </div>
  );
};

export default App;
