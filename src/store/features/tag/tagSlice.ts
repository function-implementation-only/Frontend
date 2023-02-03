import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Tag = {
    title: string
    source: string
    value: string
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
        filterTagByCategory: (state, action: PayloadAction<string>) => {
            state.tags = state.tags.filter(
                (item) => item.source !== action.payload
            )
        },
    },
})

// Action creators are generated for each case reducer function
export const { pushTag, spliceTag, filterTagByCategory } = tagSlice.actions

export default tagSlice.reducer
