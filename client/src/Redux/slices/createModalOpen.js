import { createSlice } from "@reduxjs/toolkit";


const createTaskModalOpen = createSlice({
    name: "modalOpen",
    initialState: {
        value: false
    },
    reducers: {
        openModal: (state) => {
            state.value = !state.value
        }
    }
})

export default createTaskModalOpen.reducer
export const { openModal } = createTaskModalOpen.actions