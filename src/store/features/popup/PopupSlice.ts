import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface PopupState {
    popupIsShowing: boolean
}

// Define the initial state using that type
const initialState: PopupState = {
    popupIsShowing: false,
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setpopupIsShowing: (state, action: PayloadAction<PopupState>) => {
            state.popupIsShowing = action.payload.popupIsShowing
        },
    },
})

// Action creators are generated for each case reducer function
export const { setpopupIsShowing } = popupSlice.actions

export default popupSlice.reducer
