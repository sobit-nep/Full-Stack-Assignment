import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEditForm from './components/TaskEditForm';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    return (
        <div className="App">
            <h1>Todo App</h1>
            <TaskForm setTasks={setTasks} />
            <TaskList tasks={tasks} setTasks={setTasks} setEditingTask={setEditingTask} />
            {editingTask && (
                <TaskEditForm
                    task={editingTask}
                    setTasks={setTasks}
                    setEditingTask={setEditingTask}
                />
            )}
        </div>
    );
}

export default App;
