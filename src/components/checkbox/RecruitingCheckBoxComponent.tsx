import React from 'react'
import CheckBoxComponent from './CheckBoxComponent'

function RecruitingCheckBoxComponent() {
    function handleChecked() {
        console.log('show post recruiting')
        // FIXME: 핸들러 교체 필요
    }
    function handleCanceled() {
        console.log('cancel showing post recruiting')
        // FIXME: 핸들러 교체 필요
    }

    return (
        <CheckBoxComponent
            title="모집 중만 보기"
            checkedHandlerProp={handleChecked}
            canceledHandlerProp={handleCanceled}
        />
    )
}

export default RecruitingCheckBoxComponent
