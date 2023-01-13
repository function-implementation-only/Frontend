import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'

function useCheckIsMax() {
    const peopleNumArr = useAppSelector(
        (state) => state.postCreateReducer.peopleNumArr
    )
    const [isMax, setIsMax] = useState(false)

    useEffect(() => {
        if (peopleNumArr.length === 3) {
            setIsMax(true)
        } else {
            setIsMax(false)
        }
    })

    return isMax
}

export default useCheckIsMax
