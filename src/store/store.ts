import { configureStore } from '@reduxjs/toolkit'
import tagReducer from './features/tag/tagSlice'
import postCreateReducer from './features/post/postCreateSlice'
import isRecruitingReducer from './features/isRecruiting/postCreateSlice'

export const store = configureStore({
    reducer: {
        tagReducer,
        postCreateReducer,
        isRecruitingReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
