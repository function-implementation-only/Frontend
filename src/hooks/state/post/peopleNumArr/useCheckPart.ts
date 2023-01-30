import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'

function useCheckPart() {
    const [isFrontEndSet, SetIsFrontEndSet] = useState(false)
    const [isBackEndSet, SetIsBackEndSet] = useState(false)
    const [isDesignerSet, SetIsDesignerSet] = useState(false)
    const [isPmSet, SetIsPmSet] = useState(false)
    const [isMobileSet, SetIsMobileSet] = useState(false)

    const peopleNumArr = useAppSelector(
        (state) => state.postCreateReducer.peopleNumArr
    )

    function initializeSetPart() {
        SetIsFrontEndSet(false)
        SetIsBackEndSet(false)
        SetIsDesignerSet(false)
        SetIsPmSet(false)
        SetIsMobileSet(false)
    }

    useEffect(() => {
        initializeSetPart()
        peopleNumArr.forEach((peopleNumObj) => {
            // eslint-disable-next-line default-case
            switch (peopleNumObj.part) {
                case 'FrontEnd':
                    SetIsFrontEndSet(true)
                    break
                case 'BackEnd':
                    SetIsBackEndSet(true)
                    break
                case 'Designer':
                    SetIsDesignerSet(true)
                    break
                case 'PM':
                    SetIsPmSet(true)
                    break
                case 'Mobile':
                    SetIsMobileSet(true)
                    break
            }
        })
    }, [peopleNumArr])

    return { isFrontEndSet, isBackEndSet, isDesignerSet, isPmSet, isMobileSet }
}

export default useCheckPart
