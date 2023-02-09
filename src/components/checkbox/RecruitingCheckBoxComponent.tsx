import useLogger from 'hooks/useLogger'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setIsRecruiting } from 'src/store/features/isRecruiting/postCreateSlice'
import { useAppSelector } from 'src/store/hooks'
import CheckBoxComponent from './CheckBoxComponent'

function RecruitingCheckBoxComponent() {
    const isRecruiting = useAppSelector(
        (state) => state.isRecruitingReducer.isRecruiting
    )
    const dispatch = useDispatch()
    const logger = useLogger('RecruitingCheckBoxComponent')

    function handleChecked() {
        logger.log('handleChecked()')
        dispatch(setIsRecruiting({ isRecruiting: true }))
    }
    function handleCanceled() {
        logger.log('handleCanceled()')
        dispatch(setIsRecruiting({ isRecruiting: false }))
    }

    useEffect(() => {
        logger.log(`isRecruiting : ${JSON.stringify(isRecruiting)}`)
    }, [isRecruiting])

    return (
        <CheckBoxComponent
            title="모집 중만 보기"
            checkedHandlerProp={handleChecked}
            canceledHandlerProp={handleCanceled}
        />
    )
}

export default RecruitingCheckBoxComponent
