import { useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const {request, error, clearError} = useHttp()
    const message = useMessage()
    const [newTask, setNewTask] = useState({ title: '', description: ''})
    // Полуние задач с сервера
    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         try {
    //             const response = await fetch('/tasks', {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 }
    //             })
    //             const data = await response.json()
    //             setTasks(data)
    //         } catch (e) {
    //             return e
    //         }
    //     }
    //     fetchTasks()
    // },[])

    useEffect(() => {
        message(error)
        clearError()
    },[error, clearError, message])

    const changeHandler = ev => {
        setNewTask({...newTask, [ev.target.name]: ev.target.value})
    }

    // Функция для добавления задачи
    const handleAddTask = async () => {
        try {
            // console.log(auth.userId)
            const data = await request('https://todo-app-2xd6.onrender.com/api/tasks', 'POST', {...newTask}, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message)
        } catch (e) {return e}
    }
    
    return (
        <div>
            <h1>Your Tasks</h1>
            {error && message(error)}

            {/* Форма для добавления задачи */}
            <div>
                <input
                    type="text"
                    onChange={changeHandler}
                    name="title"
                    placeholder="Task title"
                    required
                />
                <textarea
                    value={newTask.description}
                    onChange={changeHandler}
                    name="description"
                    placeholder="Task description"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>


            {/* Список задач */}
            {/* <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <span>{task.completed ? 'Completed' : 'Not Completed'}</span>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}
