import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './mainpage.css';
const MainPage = () => {
    const [toDos, setToDos] = useState([]);
    const [title, setTitle] = useState('');
    const location = useLocation();
    const userId = location.state?.userId || "";
    //performing side effects for setodos
    useEffect(() => {
        const fetchToDos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/todo-list/${userId}`);
                setToDos(response.data);
            } catch (error) {
                console.error("Error fetching to-do items", error);
            }
        };

        fetchToDos();
    }, [userId]);

    const addToDo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/todo-list", { userId, title });
            if (response.data) {
                setToDos([...toDos, response.data]);
                setTitle('');
            }
        } catch (error) {
            console.error("Error adding to-do item", error);
        }
    };

    const deleteToDo = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/todo-list/${id}`);
            setToDos(toDos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Error deleting to-do item", error);
        }
    };

    const updateToDo = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:8000/todo-list/${id}`, updatedData);
            console.log('Update successful:', response.data);
        } catch (error) {
            console.error('Error updating to-do item:', error);
        }
    };


    return (
        <div className="todo-list">
            <h1>To-Do For Today:</h1>
            <form onSubmit={addToDo}>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add new to do"
                />
                <button type="submit">Add new To Do</button>
            </form>
            <ul>
                {toDos.map(todo => (
                    <li key={todo._id}>
                        <span>{todo.title}</span>
                        <button onClick={() => deleteToDo(todo._id)}>Delete</button>
                        <button onClick={() => {
                            const newTitle = prompt("New title:", todo.title);
                            if (newTitle) {
                                updateToDo(todo._id, newTitle);
                            }
                        }}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MainPage;
