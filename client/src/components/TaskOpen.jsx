// import { useContext, useEffect, useRef, useState } from 'react'
// import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
// import { ModalOpen } from './SimpleModal/ModalOpen'
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
// import AddIcon from '@mui/icons-material/Add'
// import DeleteIcon from '@mui/icons-material/Delete'
// import { useDispatch } from 'react-redux'
// import { openModal } from '../Redux/slices/createModalOpen'
// import { useHttp } from '../hooks/http.hook'
// import { AuthContext } from '../context/AuthContext'
// // import PropTypes from 'prop-types'


// export const TaskOpen = ({tasks, onTaskAdded, onTaskDeleted}) => {
//     const {request, clearError} = useHttp()
//     const inputRef = useRef(null) // Реф для input
//     const [newTask, setNewTask] = useState('')
//     const [selectedTaskId, setSelectedTaskId] = useState(null)
//     const [selectedTaskTitle, setSelectedTaskTitle] = useState('')
//     const [selectedTaskDescription, setSelectedTaskDescription] = useState('')
//     const [isInputVisible, setIsInputVisible] = useState(false) // Показывать ли input
//     const [tasksList, setTasksList] = useState(tasks || [])
//     const dispatch = useDispatch()
//     const { token } = useContext(AuthContext)

//     useEffect(() => {
//         setTasksList(tasks)
//     },[tasks])

//     const handleAddTask = async (event) => {
//         if(event){
//             event.preventDefault()
//         }
//         clearError() // Очищаем ошибки перед новым запросом

//         if(!newTask.trim()) {
//             alert('Название задачи не может быть пустым!')
//             return
//         }

//         try {
//             const userId = JSON.parse(localStorage.getItem('UserData')).userId
//             const task = await request('/api/tasks/add', 'POST', { newTask, userId}, {
//                 Authorization: `Bearer ${token}`
//             })

//             console.log('Добавленная задача: ', task)
//             const addedTask = task.data

//             if(onTaskAdded) onTaskAdded(addedTask)
//             setNewTask('')
//             setIsInputVisible(false)
//         } catch (e) {
//             console.error('Ошибка при добавлении задачи: ', e.message)
//         }
//     }

//     const handleTaskUpdated = (updatedTask) => {
//         // Обновляем задачу в общем списке
//         setTasksList((prevTasks) => prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)))
//         setSelectedTaskTitle(updatedTask.title)
//     }

//     useEffect(() => {
//             const handleClickOutside = event => {
//                 if(inputRef.current && !inputRef.current.contains(event.target)) {
//                     if(newTask.trim() !== '') {
//                         handleAddTask() // Если в input есть текст, добавляем задачу
//                     } else {
//                         setIsInputVisible(false) // Просто скрываем input
//                     }
//                 }
//                 setSelectedTaskDescription('')
//             }
    
//             if(isInputVisible) {
//                 document.addEventListener('mousedown', handleClickOutside)
//             }
    
//             return () => {
//                 document.removeEventListener('mousedown', handleClickOutside)
//             }
//         }, [isInputVisible, newTask])

//     const handleTaskClick = async (id, title) => {
//         try {
//             const fetched = await request(`/api/tasks/task/${id}`, 'GET', null, {
//                 Authorization: `Bearer ${token}`
//             })
//             setSelectedTaskDescription(fetched.description)
//             setSelectedTaskTitle(title)
//             setSelectedTaskId(fetched._id)
//             // console.log(fetched.description)
//         } catch (e) {
//             console.error('Ошибка при загрузке задачи: ', e.message)
//         }
//         dispatch(openModal())
//     }

//     const handleDeleteTask = async (id) => {
//         try {
//             await request(`/api/tasks/delete/${id}`, 'DELETE', null, {
//                 Authorization: `Bearer ${token}`
//             })
//             // Удаляем задачу из локального состояния
//             setTasksList(prevTasks => prevTasks.filter(task => task._id !== id))
            
//             // Вызываем callback для родителя
//             if(onTaskDeleted) onTaskDeleted(id)
//             // const newTask = fetched.data

//             // setTasksList(prevTasks => [...prevTasks, newTask])

//             // if(onTaskAdded) onTaskAdded(newTask)
//         } catch (e) {
//             console.error('Ошибка при удаление задачи', e)
//         }
//     }
//     return (
//     <div className="tasks-open">
//         <div className="tasks-w-title">
//             <TipsAndUpdatesIcon />
//             Open
//         </div>
//         {/* Список задач */}
//         <ul className="adding-list">
//             {
//                 tasksList.map((task) => (
//                     <li key={task._id} onClick={() => handleTaskClick(task._id, task.title)}>
//                         {task.title} <DeleteIcon onClick={(e) =>{
//                             e.stopPropagation()
//                             handleDeleteTask(task._id)
//                         }} /></li>
//                 ))
//             }
//             {/* Кнопка или поле ввода */}
//             {isInputVisible ? (
//                 <input 
//                     ref={inputRef}
//                     type="text"
//                     value={newTask}
//                     onChange={(e) => setNewTask(e.target.value)}
//                     onKeyDown={(e) => {
//                             if(e.key === 'Enter') handleAddTask(); // Обрабатываем нажатие Enter
//                     }}
//                     placeholder="Введите название задачи"
//                     className="tasks-open__inp-title"
//                     autoFocus
//                 />
//                 ): (
//                 <button onClick={() => setIsInputVisible(true)} className="tasks-addbtn"><AddIcon /> Добавить задачу</button>
//                 )}
//         </ul>
//         {tasks.length == 0 ? (
//             <div className="tasks-warrior">
//                 <ul>
//                     <li><CheckCircleOutlineIcon /></li>
//                     <li className="warrior-text">Задачи отсутствуют</li>
//                 </ul>
//             </div>
//         ) : null }
//         <ModalOpen setSelectedTaskDescription={setSelectedTaskDescription} onTaskUpdated={handleTaskUpdated} title={selectedTaskTitle} id={selectedTaskId} descriptionModal={selectedTaskDescription}/>
//     </div>
//     )
// }

// TaskOpen.PropTypes = {
//     tasks: PropTypes.arrayOf(
//         PropTypes.shape({
//             _id: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired
//         })
//     ).isRequired,
//     onTaskAdded: PropTypes.func,
//     onTaskDeleted: PropTypes.func
// }































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