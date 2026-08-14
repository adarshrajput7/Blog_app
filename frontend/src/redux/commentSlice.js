import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:'comment',
    initialState: {
        comment: "",
        loading:false
    },

    reducers: {
        setComment: (state, action) => {
            state.comment = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setComment, setLoading } = commentSlice.actions
export default commentSlice.reducer

