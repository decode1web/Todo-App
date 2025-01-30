import { TaskOpen } from '../components/TaskOpen'
import { InProgress } from '../components/InProgress'
import { DoneTask } from '../components/Done'
import '../css/task.css'

export const TasksPage = () => {

    return (
        <div className="tasks-page">
            <div className="tasks-wrapper">
                <TaskOpen />
                <InProgress />
                <DoneTask />
            </div>
        </div>
    )
}