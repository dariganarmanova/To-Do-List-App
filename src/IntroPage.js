import React from "react";
import './index.css';
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        navigate('/login');
    }

    const handleClickSignup = () => {
        navigate('/signup');
    }

    return (
        <div className="intro-page">
            <div className="intro-text">
                <h1>Welcome to To-Do-App!</h1>
                <p>You can plan your day with this App!<br />Free and easy to use</p>
            </div>
            <button className="button-45" onClick={handleClickLogin}>Login</button>
            <button className="button-45" onClick={handleClickSignup}>Sign Up</button>
        </div>
    );
}

export default IntroPage;
