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
            <h1>Welcome to To-Do-App!</h1>
            <div className="lists">
                <ul>
                    <li>You can plan your day with this App!</li>
                    <li>Free and easy to use</li>
                </ul>
                <button className="button-45" onClick={handleClickLogin}>Click to Login Page</button>
                <button className="button-45" onClick={handleClickSignup}>Click to SignUp Page</button>
            </div>
            <div className="d-flex flex-column justify-content-center w-100 h-100">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="btn-group my-5">
                        <a
                            href="https://codepen-api-export-production.s3.us-west-2.amazonaws.com/zip/PEN/pyBNzX/1578778289271/pure-css-gradient-background-animation.zip"
                            className="btn btn-outline-light"
                            aria-current="page"
                        >
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroPage;
