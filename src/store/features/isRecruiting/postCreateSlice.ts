import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface IsRecruitingState {
    isRecruiting: boolean
}

// Define the initial state using that type
const initialState: IsRecruitingState = {
    isRecruiting: false,
}

export const isRecruitingSlice = createSlice({
    name: 'IsRecruiting',
    initialState,
    reducers: {
        setIsRecruiting: (state, action: PayloadAction<IsRecruitingState>) => {
            state.isRecruiting = action.payload.isRecruiting
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsRecruiting } = isRecruitingSlice.actions

export default isRecruitingSlice.reducer
