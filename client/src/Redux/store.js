import { configureStore } from "@reduxjs/toolkit";
import modalOpen from './slices/createModalOpen'
import modalInProgress from './slices/createModalInProgress'
import modalDone from './slices/createModalDone'
import tasksReducer from "./slices/tasksSlice"
import modalTaskReducer from './slices/modalTaskSlice'


const store = configureStore({
    reducer: {
        modalOpen,
        modalInProgress,
        modalDone,
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