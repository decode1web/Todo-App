import { createSlice } from '@reduxjs/toolkit'

const createModalInProgress = createSlice({
    name: 'modalInProgress',
    initialState: {
        value: false
    },
    reducers: {
        modalProgress: (state) => {
            state.value = !state.value
        }
    }
})

export default createModalInProgress.reducer
export const { modalProgress } = createModalInProgress.actions