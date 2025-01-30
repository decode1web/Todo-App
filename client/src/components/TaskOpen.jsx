import { useContext, useEffect, useRef, useState } from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import { ModalOpen } from './SimpleModal/ModalOpen'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../Redux/slices/modalTaskSlice'
import { AuthContext } from '../context/AuthContext'
import { addTask, deleteTask, fetchTasks } from '../Redux/slices/tasksSlice'


export const TaskOpen = () => {
    const dispatch = useDispatch()
    const inputRef = useRef(null) // Реф для input
    const { token, userId } = useContext(AuthContext)
    const [isInputVisible, setIsInputVisible] = useState(false) // Показывать ли input
    const [newTask, setNewTask] = useState('')
    const tasks = useSelector(state => state.tasks.tasks)
    const openTasks = tasks.filter(task => task.status === 'open')

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
            dispatch(addTask({title: newTask, userId, token, status: 'open'}))
            setNewTask('') // Очистка input
            setIsInputVisible(false)
        }
    }

    const handleDeleteTask = taskId => {
        dispatch(deleteTask({taskId, token}))
    }

    const handleTaskClick = async (id) => {
        dispatch(openModal(id))
    }

    return (
    <div className="tasks-open">
        <div className="tasks-w-title">
            <TipsAndUpdatesIcon />
            Open
        </div>
        {/* Список задач */}
        <ul className="adding-list">
            {
                openTasks.map((task) => (
                    <li key={task._id} onClick={() => handleTaskClick(task._id)}>
                        {task.title} <DeleteIcon onClick={(e) =>{
                            e.stopPropagation()
                            handleDeleteTask(task._id)
                        }} /></li>
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
                ): (
                <button onClick={() => setIsInputVisible(true)} className="tasks-addbtn"><AddIcon /> Добавить задачу</button>
                )}
        </ul>
        {openTasks.length == 0 ? (
            <div className="tasks-warrior">
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
