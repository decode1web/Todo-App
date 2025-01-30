import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Асинхронный Thunk для загрузки задачи по ID
export const fetchTaskById = createAsyncThunk(
    'modalTask/fetchTaskById',
    async ({taskId, token} , {rejectedWithValue}) => {
        try {
            const response = await fetch(`/api/tasks/task/${taskId}`, {
                method: 'GET',
                body: null,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }

            })
            if(!response.ok) {
                throw new Error('Что-то пошло не так')
            }
            return await response.json()
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

// Обновляем описание задачи
export const updateTask = createAsyncThunk(
    'modalTask/updateTask',
    async ({ taskId, description, token}, {rejectedWithValue}) => {
        try {
            const response = await fetch(`/api/tasks/task/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({description})
            })

            if(!response.ok){
                throw new Error('Ошибка при обновлении задачи')
            }

            return await response.json()
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)
const modalTaskSlice = createSlice({
    name: 'modalTask',
    initialState: {
        isModalOpen: false,
        selectedTaskId: null,
        task: null,
        loading: false,
        error: null,
    },
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.selectedTaskId = action.payload; // Передаём ID задачи
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.selectedTaskId = null;
            state.task = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                state.loading = false;
                state.task = action.payload; // Сохраняем данные задачи
            })
            .addCase(fetchTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            .addCase(updateTask.fulfilled, (state, action) => {
                state.task = action.payload
            })
    },
})

export const { openModal, closeModal } = modalTaskSlice.actions;
export default modalTaskSlice.reducer;