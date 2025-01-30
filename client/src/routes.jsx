import {Navigate, Route, Routes} from "react-router-dom"
import { TasksPage } from "./Pages/TasksPage"
import { CreatePage } from "./Pages/CreatePage"
import { AuthPage } from "./Pages/AuthPage"
import { HomePage } from "./Pages/HomePage"

export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Routes>
                <Route path="/tasks" element={<TasksPage />} exact/>
                <Route path="/create" element={<CreatePage />} exact />
                <Route path="*" element={<Navigate to="/tasks" replace />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/auth" element={<AuthPage />} exact />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}