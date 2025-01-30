import { useContext, useEffect, useRef, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../context/AuthContext'
import { addTask, fetchTasks } from '../Redux/slices/tasksSlice'
import { ModalOpen } from './SimpleModal/ModalOpen'


export const DoneTask = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null) // Реф для input
    const { token, userId } = useContext(AuthContext)
    const [isInputVisible, setIsInputVisible] = useState(false) // Показывать ли input
    const [newTask, setNewTask] = useState('')
    const tasks = useSelector(state => state.tasks.tasks)
    const doneTasks = tasks.filter(task => task.status === 'done')

    useEffect(() => {
        dispatch(fetchTasks({userId, token}))
    },[dispatch, userId, token])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(inputRef.current && !inputRef.current.contains(event.target)) {
                setIsInputVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },[])


    const handleAddTask = () => {
        if(newTask.trim() !== ''){
            dispatch(addTask({title: newTask, userId, token}))
            setNewTask('') // Очистка input
            setIsInputVisible(false)
        }
    }

    return (
    <div className="tasks-done">
        <div className="tasks-w-title">
            <CheckCircleOutlineIcon />
            Done
        </div>
        {/* Список задач */}
        <ul className="adding-list">
            {
                doneTasks.map((task) => (
                    <li key={task._id} className='done-line-title'>
                        <div className='d-c-s'><CheckCircleIcon  style={{ color: "#64f664" }} /> Завершенный</div>
                        {task.title}
                    </li>
                ))
            }
            {/* Кнопка или поле ввода */}
            {isInputVisible ? (
                <input 
                    ref={inputRef}
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => {
                            if(e.key === 'Enter') handleAddTask(); // Обрабатываем нажатие Enter
                    }}
                    placeholder="Введите название задачи"
                    className="tasks-open__inp-title"
                    autoFocus
                />
                ): null}
        </ul>
        {doneTasks.length == 0 ? (
            <div className="tasks-warrior done-tasks-warrior">
                <ul>
                    <li><CheckCircleOutlineIcon /></li>
                    <li className="warrior-text">Задачи отсутствуют</li>
                </ul>
            </div>
        ) : null }
        <ModalOpen />
    </div>
    )
}