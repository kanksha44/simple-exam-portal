import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Student = () => {
  const navigate = useNavigate();

  const [queindex, setQueIndex] = useState(0); /// it keeps track of the index of current question
  const [submitque, setSubmitQue] = useState(false); /// this is whether the quiz has been submitted or not
  const [score, setScore] = useState(0); //it storing the score of the quiz
  //   const [answerGiven, setAnswerGiven] = useState(null);
  const [clickedOption, setClickedOption] = useState(0); // it stores the index of option that has been clicked

  const [answeredQuestions, setAnsweredQuestions] = useState(0); //counts the number of answered questions
  const [showResult, setShowResult] = useState(false); //whether to show the quiz result, controls show

  const [time, setTime] = useState(60); // 10 minutes in seconds

  const storedQuestions = JSON.parse(localStorage.getItem("questions"));

  const [questions, setQuestions] = useState(storedQuestions || []);

  //handling the next button
  const handleNextBtn = () => {
    handleScore(clickedOption);
    setAnsweredQuestions((prev) => prev + 1);

    if (queindex === questions.length - 1) {
      setSubmitQue(true);
      setShowResult(true);
    } else {
      setQueIndex((prevIndex) => prevIndex + 1);
      setClickedOption(0);
    }
  };

  const btnText = queindex === questions.length - 1 ? "Submit" : "Next";

  const handleScore = (givenOption) => {
    if (
      givenOption === questions[queindex].options[questions[queindex].answer]
    ) {
      setScore(score + 2);
    }
  };

  const playAgain = () => {
    setQueIndex(0);
    setSubmitQue(false);
    setScore(0);
    setClickedOption(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setTime(600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(timer);
      setSubmitQue(true);
      setShowResult(true);
    }

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const greeting =
    score >= 6
      ? "Congratulations! You passed the quiz."
      : "Better luck next time.";

  return (
    <div className="container">
      <h1>Quiz Application</h1>

      {!submitque && questions[queindex] && (
        <div key={questions[queindex].id}>
          <p>{questions[queindex].question}</p>

          {questions[queindex].options.map((option, index) => (
            <div option-container key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="options"
                value={option}
                checked={option === clickedOption}
                onChange={() => setClickedOption(option)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      )}
      {!submitque && (
        <button className="next-btn" onClick={handleNextBtn}>
          {btnText}
        </button>
      )}
      {showResult && (
        <div>
          <h2>Quiz Results</h2>
          <p>
            Your score: {score} out of {questions.length * 2}
          </p>
          <p>{greeting}</p>
          <button className="play-again-btn" onClick={playAgain}>
            Play Again
          </button>
        </div>
      )}
      <div>
        <p className="time-remaining">Time Remaining: {formatTime(time)}</p>
      </div>
      <div className="logout-btn">
        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
};

export default Student;
