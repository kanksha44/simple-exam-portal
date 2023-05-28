import Quiz from "./Component/Quiz/Quiz.jsx";
import Student from "./Component/Student/Student.jsx";
import Login from "./Component/Login/Login.jsx";
import Admin from "./Component/Admin/Admin.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
