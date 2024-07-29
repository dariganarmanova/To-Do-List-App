import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/signup", { email, password });
            if (response.data === "exists") {
                alert("User already exists");
            } else if (response.data === "notexist") {
                navigate('/todo-list', { state: { id: email } });
            }
        } catch (error) {
            alert("Error occurred");
            console.log(error);
        }
    };

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
