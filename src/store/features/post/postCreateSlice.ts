import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

type PeopleNumObj = {
    id: string
    part?: string
    num?: number
}

type TechObj = {
    id: string
    part?: string
    techs?: string[]
}

// Define a type for the slice state
interface PostState {
    peopleNumArr: PeopleNumObj[]
    techList: TechObj[]
    peopleNumArrError: string
    techListError: string
}

// Define the initial state using that type
const initialState: PostState = {
    peopleNumArr: [{ id: uuidv4(), part: '', num: null }],
    techList: [{ id: uuidv4(), part: '', techs: [] }],
    peopleNumArrError: '',
    techListError: '',
}

export const postCreateSlice = createSlice({
    name: 'PostCreate',
    initialState,
    reducers: {
        pushPeopleNumObj: (state, action: PayloadAction<PeopleNumObj>) => {
            state.peopleNumArr.push(action.payload)
        },
        splicePeopleNumObj: (state, action: PayloadAction<string>) => {
            const idx = state.peopleNumArr.findIndex(
                (peopleNumObj) => peopleNumObj.id === action.payload
            )
            state.peopleNumArr.splice(idx, 1)
        },
        setPeopleNumRecruitPart: (
            state,
            action: PayloadAction<PeopleNumObj>
        ) => {
            const idx = state.peopleNumArr.findIndex(
                (peopleNumObj) => peopleNumObj.id === action.payload.id
            )
            state.peopleNumArr[idx].part = action.payload.part
        },
        setPeopleNum: (state, action: PayloadAction<PeopleNumObj>) => {
            const idx = state.peopleNumArr.findIndex(
                (peopleNumObj) => peopleNumObj.id === action.payload.id
            )
            state.peopleNumArr[idx].num = action.payload.num
        },
        pushTechObj: (state, action: PayloadAction<TechObj>) => {
            state.techList.push(action.payload)
        },
        spliceTechObj: (state, action: PayloadAction<string>) => {
            const idx = state.techList.findIndex(
                (techObj) => techObj.id === action.payload
            )
            state.techList.splice(idx, 1)
        },
        setTechListRecruitPart: (state, action: PayloadAction<TechObj>) => {
            const idx = state.techList.findIndex(
                (techObj) => techObj.id === action.payload.id
            )
            state.techList[idx].part = action.payload.part
        },
        setTechList: (state, action: PayloadAction<TechObj>) => {
            const idx = state.techList.findIndex(
                (techObj) => techObj.id === action.payload.id
            )
            state.techList[idx].techs = action.payload.techs
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    pushPeopleNumObj,
    setPeopleNumRecruitPart,
    setPeopleNum,
    splicePeopleNumObj,
    pushTechObj,
    spliceTechObj,
    setTechListRecruitPart,
    setTechList,
} = postCreateSlice.actions

export default postCreateSlice.reducer
