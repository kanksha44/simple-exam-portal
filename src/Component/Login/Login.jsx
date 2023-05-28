import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="content">
        <h1>Online Exam Portal</h1>
        <p>Please select Login</p>
        <div className="login-btn">
          <button onClick={() => navigate("./admin")}>Admin</button>
          <button onClick={() => navigate("./student")}>Student</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
