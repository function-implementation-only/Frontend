import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import useCheckIsLastIdx from 'hooks/state/post/techList/useCheckIsLastIdx'
import useCheckIsMax from 'hooks/state/post/techList/useCheckIsMax'
import useCheckPart from 'hooks/state/post/techList/useCheckPart'
import { TECHLIST, TECH_PART } from 'lib/constants'
import { useState } from 'react'
import {
    pushTechObj,
    setTechList,
    setTechListRecruitPart,
    spliceTechObj,
} from 'src/store/features/post/postCreateSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const TechListSelectComponentLayout = styled.div`
    display: flex;
    align-items: center;
`

const OperatorButton = styled.button`
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
`
const PlusButton = styled(OperatorButton)`
    background: center / cover no-repeat url('/src/assets/images/plus.svg');
`
const MinusButton = styled(OperatorButton)`
    background: center / cover no-repeat url('/src/assets/images/minus.svg');
`

interface TechListSelectComponentProps {
    id: string
}

function TechListSelectComponent({ id }: TechListSelectComponentProps) {
    const dispatch = useAppDispatch()
    const techList = useAppSelector((state) => state.postCreateReducer.techList)

    const isLastIdx = useCheckIsLastIdx(id)
    const isMax = useCheckIsMax()
    const { isFrontEndSet, isBackEndSet, isMobileSet, isEtcSet } =
        useCheckPart()

    const [techPart, setTechPart] = useState('')

    function handleTechPartChange(e: SelectChangeEvent<string>) {
        setTechPart(e.target.value)
        dispatch(
            setTechListRecruitPart({
                id,
                part: e.target.value,
            })
        )
    }

    function handleTechListChange(e: SelectChangeEvent<any>) {
        // FIXME : 나중에 value 값 타입 재설정
        dispatch(
            setTechList({
                id,
                techs: e.target.value,
            })
        )
    }

    function handleTechListPlusClick() {
        if (techList.length === 4) return
        // 프론트엔드, 백엔드, 모바일, 기타
        dispatch(pushTechObj({ id: uuidv4(), part: '', techs: [''] }))
    }

    function handleTechListMinusClick() {
        dispatch(spliceTechObj(id))
    }
    return (
        <TechListSelectComponentLayout>
            <FormControl
                sx={{ m: 0.5, minWidth: 120 }}
                size="small"
                id="techListRecruitPart-label"
            >
                <Select
                    id="techListRecruitPartSelect"
                    displayEmpty
                    defaultValue=""
                    aria-labelledby="techListRecruitPart-label"
                    onChange={handleTechPartChange}
                >
                    <MenuItem value="" disabled>
                        선택해주세요.
                    </MenuItem>
                    {TECH_PART.map((item) => {
                        return (
                            <MenuItem
                                value={item.value}
                                key={item.title}
                                disabled={
                                    (isFrontEndSet &&
                                        item.title === '프론트엔드') ||
                                    (isBackEndSet && item.title === '백엔드') ||
                                    (isMobileSet && item.title === '모바일') ||
                                    (isEtcSet && item.title === '기타')
                                }
                            >
                                {item.title}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl
                sx={{ m: 0.5, minWidth: 120, maxWidth: 300 }}
                size="small"
                id="techList-label"
            >
                <Select
                    id="techListSelect"
                    displayEmpty
                    aria-labelledby="techList-label"
                    multiple
                    defaultValue={[]}
                    renderValue={(selected: string[]) => {
                        if (selected.length === 0) {
                            return <em>파트를 먼저 선택해주세요.</em>
                        }

                        return selected.join(', ')
                    }}
                    onChange={handleTechListChange}
                >
                    <MenuItem disabled>파트를 먼저 선택해주세요.</MenuItem>
                    {TECHLIST.filter((item) => item.type === techPart).map(
                        (item) => {
                            return (
                                <MenuItem value={item.value} key={item.title}>
                                    {item.title}
                                </MenuItem>
                            )
                        }
                    )}
                </Select>
            </FormControl>
            {isLastIdx ? (
                isMax ? (
                    ''
                ) : (
                    <PlusButton onClick={handleTechListPlusClick} />
                )
            ) : (
                <MinusButton onClick={handleTechListMinusClick} />
            )}
        </TechListSelectComponentLayout>
    )
}

export default TechListSelectComponent
