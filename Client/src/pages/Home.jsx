import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    // --- State Management ---
    const [tab, setTab] = useState(1);
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState('');

    // --- Side Effects ---
    useEffect(() => {
        axios.get('http://localhost:5000/read-tasks')
            .then(res => {
                setTodos(res.data);
            });
    }, []);

    // --- Event Handlers ---
    const handleTabs = (tab) => {
        setTab(tab);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        axios.post('http://localhost:5000/new-task', { task })
            .then(res => {
                setTodos(res.data);
                setTask('');
            });
    };

    const handleEdit = (id, task) => {
        setIsEdit(true);
        setTask(task);
        setUpdatedTask(task);
        setUpdateId(id);
    };

    const updateTask = () => {
        if (!updatedTask.trim()) return;

        axios.post('http://localhost:5000/update-task', { updateId, updatedTask })
            .then(res => {
                setTodos(res.data);
                setTask('');
                setUpdatedTask('');
                setIsEdit(false);
            });
    };

    const handleDelete = (id) => {
        axios.post('http://localhost:5000/delete-task', { id })
            .then(res => {
                setTodos(res.data);
            });
    };

    const handleComplete = (id) => {
        axios.post('http://localhost:5000/complete-task', { id })
            .then(res => {
                setTodos(res.data);
            });
    };

    // --- Render Component ---
    return (
        <div className='bg-gray-100 w-screen h-screen'>
            <div className='flex flex-col justify-start items-center h-full gap-1 pt-10'>
                
                <h2 className='font-bold text-2xl mb-4'>Do-it</h2>

                {/* Input Section */}
                <div className='flex gap-3'>
                    <input
                        value={isEdit ? updatedTask : task}
                        onChange={e => isEdit ? setUpdatedTask(e.target.value) : setTask(e.target.value)}
                        type='text'
                        placeholder='Enter todo'
                        className='w-64 p-2 outline-none border border-blue-300 rounded-md'
                    />
                    <button
                        onClick={isEdit ? updateTask : handleAddTask}
                        className='bg-blue-600 text-white w-24 py-2 rounded-md text-center'
                    >
                        {isEdit ? "Update" : "Add"}
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className='flex text-sm w-80 justify-evenly mt-4'>
                    <p onClick={() => handleTabs(1)} className={`${tab === 1 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>All</p>
                    <p onClick={() => handleTabs(2)} className={`${tab === 2 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>Active</p>
                    <p onClick={() => handleTabs(3)} className={`${tab === 3 ? 'text-blue-700' : 'text-black'} cursor-pointer`}>Completed</p>
                </div>

                {/* Task List Container */}
                <div className='flex-1 overflow-y-auto w-full flex flex-col items-center' style={{ scrollbarWidth: 'none' }}>
                    
                    {/* Tab 1: All Tasks */}
                    {tab === 1 && todos?.map(todo => (
                        <div key={todo.id} className='flex justify-between bg-white p-3 w-80 mt-3 rounded-md'>
                            <div>
                                <p className='text-lg font-semibold'>{todo.task}</p>
                                <p className='text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className='text-sm text-gray-700'>Status : {todo.status}</p>
                            </div>
                            <div className='flex flex-col text-sm justify-start items-start'>
                                <button className='text-blue-600 cursor-pointer' onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>
                                <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete</button>
                                <button className='text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Complete</button>
                            </div>
                        </div>
                    ))}

                    {/* Tab 2: Active Tasks */}
                    {tab === 2 && todos?.filter(todo => todo.status === 'active').map(todo => (
                        <div key={todo.id} className='flex justify-between bg-white p-3 w-80 mt-3 rounded-md'>
                            <div>
                                <p className='text-lg font-semibold'>{todo.task}</p>
                                <p className='text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className='text-sm text-gray-700'>Status : {todo.status}</p>
                            </div>
                            <div className='flex flex-col text-sm justify-start items-start'>
                                <button className='text-blue-600 cursor-pointer' onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>
                                <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete</button>
                                <button className='text-green-600 cursor-pointer' onClick={() => handleComplete(todo.id)}>Complete</button>
                            </div>
                        </div>
                    ))}

                    {/* Tab 3: Completed Tasks */}
                    {tab === 3 && todos?.filter(todo => todo.status === 'completed').map(todo => (
                        <div key={todo.id} className='flex justify-between bg-white p-3 w-80 mt-3 rounded-md'>
                            <div>
                                <p className='text-lg font-semibold'>{todo.task}</p>
                                <p className='text-xs text-gray-600'>{new Date(todo.createdAt).toLocaleDateString()}</p>
                                <p className='text-sm text-gray-700'>Status : {todo.status}</p>
                            </div>
                            <div className='flex flex-col text-sm justify-center items-center'>
                                <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Home;