import { configureStore } from '@reduxjs/toolkit'
import tagReducer from './features/tag/tagSlice'
import postCreateReducer from './features/post/postCreateSlice'
import isRecruitingReducer from './features/isRecruiting/postCreateSlice'
import popupReducer from './features/popup/PopupSlice'

export const store = configureStore({
    reducer: {
        tagReducer,
        postCreateReducer,
        isRecruitingReducer,
        popupReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
