import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = () => {
  const [queindex, setQueIndex] = useState(0); /// it keeps track of the index of current question
  const [submitque, setSubmitQue] = useState(false); /// this is whether the quiz has been submitted or not
  const [score, setScore] = useState(0); //it storing the score of the quiz
  //   const [answerGiven, setAnswerGiven] = useState(null);
  const [clickedOption, setClickedOption] = useState(0); // it stores the index of option that has been clicked

  const [answeredQuestions, setAnsweredQuestions] = useState(0); //counts the number of answered questions
  const [showResult, setShowResult] = useState(false); //whether to show the quiz result, controls show

  const [time, setTime] = useState(60); // 10 minutes in seconds

  const questions = [
    {
      id: 1,
      Question: "Which language runs in a web browser?",
      Options: ["Java", "C", "Python", "JavaScript"],
      Answer: 3,
    },
    {
      id: 2,
      Question: "What does CSS stand for?",
      Options: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats",
      ],
      Answer: 1,
    },
    {
      id: 3,
      Question: "What does HTML stand for?",
      Options: [
        "Hypertext Markup Language",
        "Hypertext Markdown Language",
        "Hyperloop Machine Language",
        "Helicopters Terminals Motorboats Lamborginis",
      ],
      Answer: 0,
    },
    {
      id: 4,
      Question: "What year was JavaScript launched?",
      Options: ["1996", "1995", "1994", "none of the above"],
      Answer: 1,
    },
    {
      id: 5,
      Question: "What my fav food?",
      Options: ["spicy", "sweet", "bitter", "none of the above"],
      Answer: 0,
    },
  ];

  //handling the next button 
  const handlenextbtn = () => {
    handleScore(clickedOption);
    setAnsweredQuestions((prev) => prev + 1);

    if (queindex === questions.length - 1) { //if the it is last btn do submitque as true
      setSubmitQue(true);
      //   setClickedOption("");
      setShowResult(true);
    } else {
      setQueIndex((prevIndex) => prevIndex + 1); // this is for next btn
      setClickedOption(0);
    }
  };

  //---------------------------------------------------------------------------------

  const btntxt = queindex === questions.length - 1 ? "Submit" : "Next";

  //---------------------------------------------------------------------------------

  const handleScore = (givenOption) => {
    if (
      givenOption === questions[queindex].Options[questions[queindex].Answer]
    ) {
      setScore(score + 2);
    }
    // setAnswerGiven(givenOption);
  };

  //---------------------------------------------------------------------------------

  const playAgain = () => {
    setQueIndex(0);
    setSubmitQue(false);
    setScore(0);
    setClickedOption(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setTime(600);
  };

  //---------------------------------------------------------------------------------

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

  const formatTime = (time) => {  //MM:SS to see time in readable minute and second format
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  //---------------------------------------------------------------------------------
  const greeting =
    score >= 6
      ? "Congratulations! You passed the quiz."
      : "Better luck next time.";

  //---------------------------------------------------------------------------------

  return (
    <div className="container">
      <h1>Quiz application</h1>

      {!submitque && questions[queindex] && (
        <div key={questions[queindex].id}>
          <p>{questions[queindex].Question}</p>

          {questions[queindex].Options.map((option, index) => (
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
        <button className="next-btn" onClick={handlenextbtn}>
          {btntxt}
        </button>
      )}
      {showResult && (
        <div>
          <h2>Quiz Results</h2>
          <p>
            You score : {score} out of {questions.length * 2}
            
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
    </div>
  );
};

export default Quiz;
