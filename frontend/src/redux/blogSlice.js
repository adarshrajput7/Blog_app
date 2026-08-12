import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        loading: false,
        blog: []
    },

    reducers: {
        setLoading: (state, action)=>{
            state.loading = action.payload
        },
        setBlog: (state, action) => {
            state.blog = action.payload
        },
        // ✅ Single blog update karne ke liye
        updateSingleBlog: (state, action) => {
            const index = state.blog.findIndex(b => b._id === action.payload._id);
            if (index !== -1) {
                state.blog[index] = action.payload;
            }
        }
    }

})

export const { setLoading, setBlog, updateSingleBlog } = blogSlice.actions
export default blogSlice.reducer
