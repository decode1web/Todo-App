import { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault"

export const HomePage = () => {
    const [projects, setProjects] = useState([]) // Список проектов
    const [title, setTitle] = useState('') // Название проектов
    const [description, setDescription] = useState('') // Описание проекта

    // // Загружаем данные из localStorage при монтировании компонента
    // useEffect(() => {
    //     const savedProjects = localStorage.getItem("projects")
    //     if(savedProjects) {
    //         setProjects(JSON.parse(savedProjects)) // Парсим сохранённые данные
    //     }
    // },[])

    // // Сохраняем данные в localStorage при изменении массива проектов
    // useEffect(() => {
    //     localStorage.setItem("projects", JSON.stringify(projects))
    // },[projects])

    // Добавление нового проекта
    const addProject = () => {
        if(!title || !description) {
            alert("Заполните название и описание!")
            return
        }
        const newProject = {
            id: Date.now(),
            title,
            description,
            completed: false,
        }
        setProjects([...projects, newProject])
        setTitle('')
        setDescription('')
    }

    // Удаление проекта
    const deleteProject = id => {
        setProjects(projects.filter(project => project.id !== id))
    }

    // Изменение статуса готовности
    const toggleCompletion = id => {
        setProjects(
            projects.map(project => 
                project.id === id ? {...project, completed: !project.completed} : project
            )
        )
    }
    return (
        <>
            <a href="/auth" className="sign-btn" >Войти</a>
            <div className="container">
                <div className="block">
                    <label htmlFor="task-name">Название проекта</label>
                    <input 
                        type="text" 
                        id="task-name" 
                        placeholder="Сверстать Landing Page..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Описание проекта"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className="btn" onClick={addProject}>Добавить задачу</button>
                </div>
                {
                    projects.length > 0 ? (
                        projects.map(project => (
                        <div 
                            key={project.id}
                            className={`block ${project.completed ? "completed" : "uncompleted"}`}
                        >
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="actions">
                                <button className="toggleCompletion-btn" onClick={() => toggleCompletion(project.id)}>{project.completed ? <DisabledByDefaultIcon style={{color: "#dc3545"}} fontSize="large" /> : <CheckBoxIcon style={{color: "#28a745"}} fontSize="large"/>}</button>
                                <button className="delete-btn" onClick={() => deleteProject(project.id)}><DeleteIcon fontSize="large" style={{color: "#f44336"}} /></button>
                            </div>
                        </div>
                    ))
                ): null
                }
            </div>
        </>
    )
}