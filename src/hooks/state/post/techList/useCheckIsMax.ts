import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'

function useCheckIsMax() {
    const techList = useAppSelector((state) => state.postCreateReducer.techList)
    const [isMax, setIsMax] = useState(false)

    useEffect(() => {
        if (techList.length === 4) {
            setIsMax(true)
        } else {
            setIsMax(false)
        }
    })

    return isMax
}

export default useCheckIsMax
