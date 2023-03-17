import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import useCheckIsLastIdx from 'hooks/state/post/techList/useCheckIsLastIdx'
import useCheckIsMax from 'hooks/state/post/techList/useCheckIsMax'
import useCheckPart from 'hooks/state/post/techList/useCheckPart'
import { TECHLIST, TECH_PART, TEXT } from 'lib/constants'
import { useState, useEffect } from 'react'
import {
    pushTechObj,
    setTechList,
    setTechListRecruitPart,
    spliceTechObj,
} from 'src/store/features/post/postCreateSlice'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
    muiMenuItemStyleObj,
    muiSelectMenuPropsObj,
    muiSelectStyleObj,
} from 'src/styles/mui/custom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import PlaceHolderComponent from './common/PlaceHolderComponent'

const TechListSelectComponentLayout = styled.div`
    display: flex;
    align-items: center;
    padding-top: 16px;
`

const OperatorButton = styled.button`
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 10px;
`
const PlusButton = styled(OperatorButton)`
    background: center / cover no-repeat url('/assets/images/plus.svg');
`
const MinusButton = styled(OperatorButton)`
    background: center / cover no-repeat url('/assets/images/minus.svg');
`

interface TechListSelectComponentProps {
    id: string
    // eslint-disable-next-line react/require-default-props
    isUpdate?: boolean
}

function TechListSelectComponent({
    id,
    isUpdate,
}: TechListSelectComponentProps) {
    const dispatch = useAppDispatch()
    const techList = useAppSelector((state) => state.postCreateReducer.techList)

    const isLastIdx = useCheckIsLastIdx(id)
    const isMax = useCheckIsMax()
    const { isFrontEndSet, isBackEndSet, isMobileSet, isEtcSet } =
        useCheckPart()

    let techObjSelf: {
        id: string
        part?: string
        techs?: string[]
    }

    if (isUpdate) {
        techObjSelf = techList.find((item) => id === item.id)
    }

    const [techPart, setTechPart] = useState('')
    const [techListSelect, setTechListSelect] = useState(
        isUpdate && techObjSelf?.techs ? techObjSelf.techs : []
    )

    useEffect(() => {
        if (isUpdate) {
            setTechPart(techObjSelf.part)
        }
        // too many re-render 오류로 마운트시 값 설정
    }, [])

    function handleTechPartChange(e: SelectChangeEvent<string>) {
        setTechPart(e.target.value)
        setTechListSelect([])
        dispatch(
            setTechListRecruitPart({
                id,
                part: e.target.value,
            })
        )
    }

    function handleTechListChange(e: SelectChangeEvent<any>) {
        setTechListSelect(e.target.value)
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
        dispatch(pushTechObj({ id: uuidv4(), part: '', techs: [] }))
    }

    function handleTechListMinusClick() {
        dispatch(spliceTechObj(id))
    }
    return (
        <TechListSelectComponentLayout>
            <FormControl
                sx={{ m: 0, marginRight: '10px', minWidth: 100 }}
                size="small"
                id="techListRecruitPart-label"
            >
                <Select
                    id="techListRecruitPartSelect"
                    sx={muiSelectStyleObj}
                    MenuProps={muiSelectMenuPropsObj}
                    displayEmpty
                    defaultValue={
                        isUpdate && techObjSelf?.part ? techObjSelf.part : ''
                    }
                    aria-labelledby="techListRecruitPart-label"
                    onChange={handleTechPartChange}
                >
                    <MenuItem value="" disabled>
                        <PlaceHolderComponent text={TEXT.PLACEHOLDER_CHOICE} />
                    </MenuItem>
                    {TECH_PART.map((item) => {
                        return (
                            <MenuItem
                                sx={muiMenuItemStyleObj}
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
                sx={{ m: 0, marginRight: '10px', minWidth: 150, maxWidth: 300 }}
                size="small"
                id="techList-label"
            >
                <Select
                    id="techListSelect"
                    sx={muiSelectStyleObj}
                    MenuProps={muiSelectMenuPropsObj}
                    displayEmpty
                    aria-labelledby="techList-label"
                    multiple
                    value={techListSelect}
                    renderValue={(selected: string[]) => {
                        if (selected.length === 0) {
                            return (
                                <PlaceHolderComponent
                                    text={TEXT.PLACEHOLDER_CHOICE}
                                />
                            )
                        }

                        return selected.join(', ')
                    }}
                    onChange={handleTechListChange}
                >
                    <MenuItem disabled>
                        <PlaceHolderComponent text={TEXT.PLACEHOLDER_CHOICE} />
                    </MenuItem>
                    {TECHLIST.filter((item) => item.type === techPart).map(
                        (item) => {
                            return (
                                <MenuItem
                                    sx={muiMenuItemStyleObj}
                                    value={item.value}
                                    key={item.title}
                                >
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
