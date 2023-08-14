import React, { useState } from 'react';
//import axios from 'axios';
import api from '../api'; 
function TaskForm({ setTasks }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleTaskCreate = () => {
        api.post('/api/tasks/', {
            title: title,
            description: description,
            due_date: dueDate,
            completed: false
        })
        .then(response => {
            setTasks(prevTasks => [...prevTasks, response.data]);
            setTitle('');
            setDescription('');
            setDueDate('');
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Create Task</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <input
                type="date"
                placeholder="Completion date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />
            <button onClick={handleTaskCreate}>Create</button>
        </div>
    );
}

export default TaskForm;
