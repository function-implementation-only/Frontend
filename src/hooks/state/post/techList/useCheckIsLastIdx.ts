import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'

function useCheckIsLastIdx(techObjId: string) {
    const techList = useAppSelector((state) => state.postCreateReducer.techList)
    const [isLastIdx, setIsLastIdx] = useState(false)

    useEffect(() => {
        const idx = techList.findIndex((tech) => tech.id === techObjId)
        if (idx !== techList.length - 1) {
            setIsLastIdx(false)
        } else {
            setIsLastIdx(true)
        }
    })

    return isLastIdx
}

export default useCheckIsLastIdx
