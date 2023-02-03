import { useEffect, useState } from 'react'
import { getRandomColor } from 'utils/random'
import {
    pushTag,
    filterTagByCategory,
    spliceTag,
} from 'src/store/features/tag/tagSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { ConstantObj } from 'lib/constants'
import CheckBoxComponent from './CheckBoxComponent'

interface FilterCheckBoxComponentProps {
    constantsArray: ConstantObj<string>[]
    parentHandler: Function
}

function FilterAllCheckBoxComponent({
    constantsArray,
    parentHandler,
}: FilterCheckBoxComponentProps) {
    const tags = useAppSelector((state) => state.tagReducer.tags)
    const dispatch = useAppDispatch()

    function handleChecked(isEffect: boolean = false) {
        // 외부에서 변경되는 경우 isEffect true
        if (isEffect) {
            parentHandler('checked')
        } else {
            const { source } = constantsArray[0]
            dispatch(filterTagByCategory(source))
            constantsArray.forEach((item) => {
                dispatch(
                    pushTag({
                        title: item.title,
                        value: item.value,
                        backgroundColor: getRandomColor(),
                        source: item.source,
                    })
                )
            })
            parentHandler('checked')
        }
    }

    function handleCanceled(isEffect: boolean = false) {
        // 외부에서 변경되는 경우 isEffect true
        if (isEffect) {
            parentHandler('canceled')
        } else {
            constantsArray.forEach((item) => {
                dispatch(spliceTag(item.title))
            })
            parentHandler('canceled')
        }
    }

    function checkAllTagsInStore(): boolean {
        let cnt = 0
        const { source } = constantsArray[0]

        tags.forEach((item) => {
            if (item.source === source) {
                cnt += 1
            }
        })
        if (cnt !== constantsArray.length) {
            return false
        }
        return true
    }

    const [isTagInStore, setIsTagInStore] = useState(false)

    useEffect(() => {
        if (checkAllTagsInStore()) {
            setIsTagInStore(true)
        } else {
            setIsTagInStore(false)
        }
    }, [tags])

    return (
        <div>
            <CheckBoxComponent
                title="전체"
                checkedHandlerProp={handleChecked}
                canceledHandlerProp={handleCanceled}
                effectState={isTagInStore}
            />
        </div>
    )
}

export default FilterAllCheckBoxComponent
