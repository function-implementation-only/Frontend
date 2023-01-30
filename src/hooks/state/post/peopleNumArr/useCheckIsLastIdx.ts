import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'

function useCheckIsLastIdx(PeopleNumObjId: string) {
    const peopleNumArr = useAppSelector(
        (state) => state.postCreateReducer.peopleNumArr
    )
    const [isLastIdx, setIsLastIdx] = useState(false)

    useEffect(() => {
        const idx = peopleNumArr.findIndex(
            (peopleNum) => peopleNum.id === PeopleNumObjId
        )
        if (idx !== peopleNumArr.length - 1) {
            setIsLastIdx(false)
        } else {
            setIsLastIdx(true)
        }
    })

    return isLastIdx
}

export default useCheckIsLastIdx
