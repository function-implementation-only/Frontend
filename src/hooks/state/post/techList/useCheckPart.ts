import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'

function useCheckPart() {
    const [isFrontEndSet, SetIsFrontEndSet] = useState(false)
    const [isBackEndSet, SetIsBackEndSet] = useState(false)
    const [isMobileSet, SetIsMobileSet] = useState(false)
    const [isEtcSet, SetIsEtcSet] = useState(false)

    const techList = useAppSelector((state) => state.postCreateReducer.techList)

    function initializeSetPart() {
        SetIsFrontEndSet(false)
        SetIsBackEndSet(false)
        SetIsMobileSet(false)
        SetIsEtcSet(false)
    }

    useEffect(() => {
        initializeSetPart()
        techList.forEach((techObj) => {
            // eslint-disable-next-line default-case
            switch (techObj.part) {
                case 'FrontEnd':
                    SetIsFrontEndSet(true)
                    break
                case 'BackEnd':
                    SetIsBackEndSet(true)
                    break
                case 'Mobile':
                    SetIsMobileSet(true)
                    break
                case 'Etc':
                    SetIsEtcSet(true)
                    break
            }
        })
    }, [techList])

    return { isFrontEndSet, isBackEndSet, isMobileSet, isEtcSet }
}

export default useCheckPart
