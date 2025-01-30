import { createSlice } from '@reduxjs/toolkit'

const createTaskModalDone = createSlice({
    name: 'modalDone',
    initialState: {
        value: false
    },
    reducers: {
        modalDone: (state) => {
            state.value = !state.value
        }
    }
})

export default createTaskModalDone.reducer
export const { modalDone } = createTaskModalDone.actions