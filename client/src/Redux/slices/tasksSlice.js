import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Асинхронный экшен для получения задач
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({userId, token} , { rejectedWithValue }) => {
        try {
            const response = await fetch(`https://todo-app-2xd6.onrender.com/api/tasks/user/${userId}`,{
                method: 'GET',
                body: null,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if(!response.ok){
                throw new Error('Что-то пошло не так')
            }

            const data = await response.json()
            return data
        } catch (e) {
            console.log('Ошибка в fetchTasks: ', e.message)
            return rejectedWithValue(e.message)
        }
    }
)

// Асинхронный экшен для добавления задачи
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({title, userId, token, status}, {rejectedWithValue}) => {
        try {
            const response = await fetch('https://todo-app-2xd6.onrender.com/api/tasks/add', {
                method: 'POST',
                body: JSON.stringify({title, userId, status}),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })

            if(!response.ok) {
                throw new Error('Ошибка при добавлении задачи')
            }

            return await response.json()
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

// Асинхронный экшен для удаления задачи
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({taskId, token}, { rejectedWithValue }) => {
        try {
            const response = await fetch(`https://todo-app-2xd6.onrender.com/api/tasks/delete/${taskId}`, {
                method: 'DELETE',
                body: null,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if(!response.ok) {
                throw new Error('Ошибка при удалении задачи')
            }
            return taskId
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

export const updateTaskStatus = createAsyncThunk(
    'tasks/updateStatus',
    async ({taskId, status, token}, {rejectedWithValue}) => {
        try {
            const response = await fetch(`https://todo-app-2xd6.onrender.com/api/tasks/status/${taskId}`,{
                method: 'PUT',
                body: JSON.stringify({status}), // Отправляем новый статус
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if(!response.ok) {
                throw new Error('Ошибка при обнавлении статуса задачи')
            }

            return await response.json()
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Обработка получения задач
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Обработка добавление задачи
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)
            })
            // Обработка удаления задачи
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload
            })

            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const updatedTask = action.payload
                const index = state.tasks.findIndex(task => task._id === updatedTask._id)
                if(index !== -1) {
                    state.tasks[index] = updatedTask // Обновляем статус в store
                }
            })
    }
})

export default tasksSlice.reducer
