
import React, { useState, useEffect } from 'react';
import api from '../api';
function TaskList({ tasks, setTasks, setEditingTask }) {
    const [sortBy, setSortBy] = useState('due_date'); // Default sorting by due date
    const [filterByCompleted, setFilterByCompleted] = useState('all'); // Default filtering

    useEffect(() => {
        api.get(`/api/tasks/?ordering=${sortBy}&completed=${filterByCompleted}`)
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, [sortBy, filterByCompleted, setTasks]);

    const handleTaskDelete = (taskId) => {
        api.delete(`/api/tasks/${taskId}/`)
            .then(response => {
                console.log("Task deleted:", response.data);
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => console.error(error));
    };

    

    return (
        <div>
            <h2>Tasks</h2>

            <div>
                <label>Sort by: </label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="due_date">Due Date</option>
                    <option value="completed">Completion Status</option>
                </select>
                <label>Filter by completion: </label>
                <select value={filterByCompleted} onChange={e => setFilterByCompleted(e.target.value)}>
                    <option value="all">All</option>
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>
            </div>



            <table className="task-table" >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td className={task.completed ? 'completed-input' : 'not-completed-input'}>{task.title}</td>
                            <td className={task.completed ? 'completed-input' : 'not-completed-input'}>{task.description}</td>
                            <td>{task.due_date}</td>
                            <td>{task.completed ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => setEditingTask(task)}>Edit</button>
                                <button className="delete-button" onClick={() => handleTaskDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
