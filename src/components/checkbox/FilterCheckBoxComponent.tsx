import { useEffect, useState } from 'react'
import { getRandomColor } from 'utils/random'
import { pushTag, spliceTag } from 'src/store/features/tag/tagSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import CheckBoxComponent from './CheckBoxComponent'

interface FilterCheckBoxComponentProps {
    title: string
    parentHandler: Function
}

function FilterCheckBoxComponent({
    title,
    parentHandler,
}: FilterCheckBoxComponentProps) {
    const tags = useAppSelector((state) => state.tagReducer.tags)
    const dispatch = useAppDispatch()

    function handleChecked(isEffect: boolean = false) {
        // 외부에서 변경되는 경우 isEffect true
        if (isEffect) {
            parentHandler('checked')
        } else {
            dispatch(
                pushTag({
                    title,
                    backgroundColor: getRandomColor(),
                })
            )
            parentHandler('checked')
        }
    }

    function handleCanceled(isEffect: boolean = false) {
        // 외부에서 변경되는 경우 isEffect true
        if (isEffect) {
            parentHandler('canceled')
        } else {
            dispatch(spliceTag(title))
            parentHandler('canceled')
        }
    }

    function checkTagInStore(): boolean {
        const idx = tags.findIndex((tag) => tag.title === title)
        if (idx === -1) {
            return false
        }
        return true
    }

    const [isTagInStore, setIsTagInStore] = useState(false)

    useEffect(() => {
        if (checkTagInStore()) {
            setIsTagInStore(true)
        } else {
            setIsTagInStore(false)
        }
    }, [tags])

    return (
        <div>
            <CheckBoxComponent
                title={title}
                checkedHandlerProp={handleChecked}
                canceledHandlerProp={handleCanceled}
                effectState={isTagInStore}
            />
        </div>
    )
}

export default FilterCheckBoxComponent
