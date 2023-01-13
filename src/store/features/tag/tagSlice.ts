import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Tag = {
    title: string
    backgroundColor: string
}

// Define a type for the slice state
interface TagState {
    tags: Tag[]
}

// Define the initial state using that type
const initialState: TagState = {
    tags: [],
}

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        pushTag: (state, action: PayloadAction<Tag>) => {
            state.tags.push(action.payload)
        },
        spliceTag: (state, action: PayloadAction<string>) => {
            const idx = state.tags.findIndex(
                (tag) => tag.title === action.payload
            )
            state.tags.splice(idx, 1)
        },
    },
})

// Action creators are generated for each case reducer function
export const { pushTag, spliceTag } = tagSlice.actions

export default tagSlice.reducer
