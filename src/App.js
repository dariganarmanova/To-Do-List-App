import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from './IntroPage';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
