import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from './IntroPage';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import MainPage from "./MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/todo-list" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;

