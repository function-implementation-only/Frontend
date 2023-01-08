import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import tagReducer from './features/tag/tagSlice'

export const store = configureStore({
    reducer: {
        counterReducer,
        tagReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
