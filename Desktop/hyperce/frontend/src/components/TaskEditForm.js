import React, { useState } from 'react';
import api from '../api'; 

function TaskEditForm({ task, setEditingTask, setTasks }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.due_date);
    const [completedd, setCompleted] = useState(task.completed);

    const handleTaskEdit = () => {
        api.put(`/api/tasks/${task.id}/`, {
            title: title,
            description: description,
            due_date: dueDate,
            completed: completedd
        })
        .then(response => {
            setTasks(prevTasks =>
                prevTasks.map(prevTask =>
                    prevTask.id === task.id ? response.data : prevTask
                )
            );
            setEditingTask(null);
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Edit Task</h2>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={completedd ? 'completed-input' : 'not-completed-input'}
            />
            <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={completedd ? 'completed-input' : 'not-completed-input'}
            />
            <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />
            <label>
                Completed:
                <input
                    type="checkbox"
                    checked={completedd}
                    onChange={() => setCompleted(!completedd)}  
                />
            </label>
            <button onClick={handleTaskEdit}>Save</button>
            <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
    );
}

export default TaskEditForm;
