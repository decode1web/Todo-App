import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice"
import modalTaskReducer from './slices/modalTaskSlice'


const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        modalTask: modalTaskReducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: ['tasks/fetchTasks']
        }
    })
})

export default store
