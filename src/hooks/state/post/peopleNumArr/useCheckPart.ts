import { useEffect, useState } from 'react'
import { useAppSelector } from 'src/store/hooks'

function useCheckPart() {
    const [isFrontEndSet, SetIsFrontEndSet] = useState(false)
    const [isBackEndSet, SetIsBackEndSet] = useState(false)
    const [isDesignSet, SetIsDesignSet] = useState(false)

    const peopleNumArr = useAppSelector(
        (state) => state.postCreateReducer.peopleNumArr
    )

    function initializeSetPart() {
        SetIsFrontEndSet(false)
        SetIsBackEndSet(false)
        SetIsDesignSet(false)
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
                case 'Design':
                    SetIsDesignSet(true)
                    break
            }
        })
    }, [peopleNumArr])

    return { isFrontEndSet, isBackEndSet, isDesignSet }
}

export default useCheckPart
