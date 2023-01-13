import { configureStore } from '@reduxjs/toolkit'
import tagReducer from './features/tag/tagSlice'
import postCreateReducer from './features/post/postCreateSlice'

export const store = configureStore({
    reducer: {
        tagReducer,
        postCreateReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
