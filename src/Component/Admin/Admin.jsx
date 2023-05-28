import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  const handleQuestionAddition = (e) => {
    e.preventDefault();
    const questionInput = e.target.elements.question;
    const optionsInput = e.target.elements.options;
    const answerInput = e.target.elements.answer;
    const imageInput = e.target.elements.image;

    const newQuestion = {
      id: questions.length + 1,
      question: questionInput.value,
      options: optionsInput.value.split(","),
      answer: parseInt(answerInput.value),
      // image: imageInput.files[0] || null, // Get the uploaded image file or set it to null if no image is selected
    };

    setQuestions([...questions, newQuestion]);

    // Clear the form fields after adding the question
    questionInput.value = "";
    optionsInput.value = "";
    answerInput.value = "";
    // imageInput.value = null;

    localStorage.setItem(
      "questions",
      JSON.stringify([...questions, newQuestion])
    );
  };

  const handleQuestionEdit = (questionId) => {
    const updatedQuestion = prompt("Enter the updated question");
    const updatedOptions = prompt(
      "Enter the updated options (comma-separated)"
    );
    const updatedAnswer = parseInt(
      prompt("Enter the updated answer (option index)")
    );
    // const updateImage = prompt("Uplaod updated image")
    // const updateImage = prompt("Upload the updated image (provide the image URL)");

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            question: updatedQuestion,
            options: updatedOptions.split(","),
            answer: updatedAnswer,
            // image: updateImage ? URL.createObjectURL(updateImage) : question.image,
            // image: updateImage ? updateImage : question.image,
          };
        }
        return question;
      })
    );

    localStorage.setItem("questions", JSON.stringify(questions));
  };

  const handleQuestionDelete = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
    );

    localStorage.setItem("questions", JSON.stringify(questions));
  };

  return (
    <div>
      <div className="Admin-dashboard">
        <div className="add-questions">
          <form onSubmit={handleQuestionAddition}>
            <input
              type="text"
              name="question"
              placeholder="Question"
              required
            />
            <input
              type="text"
              name="options"
              placeholder="Options (comma-separated)"
              required
            />
            <input
              type="number"
              name="answer"
              placeholder="Answer (option index)"
              required
            />
            <input type="file" name="image" placeholder="uplaod image" />
            <button type="submit">Add Question</button>
          </form>
        </div>
        <div className="questions-list">
          <h2>Questions</h2>
          {questions.map((question) => (
            <div key={question.id}>
              <p>{question.question}</p>
              <p>Options: {question.options.join(", ")}</p>
              <p>Answer: {question.answer}</p>
              {/* <img src={URL.createObjectURL(question.image)} alt="Question" /> */}
              <button onClick={() => handleQuestionEdit(question.id)}>
                Edit
              </button>
              <button onClick={() => handleQuestionDelete(question.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="logout-btn">
        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
};

export default Admin;
