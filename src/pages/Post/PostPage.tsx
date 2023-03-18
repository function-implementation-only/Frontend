import { useRef, useState, useEffect, useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import useUpdatePost from 'src/hooks/useUpdatePost'
import useCreatePost from 'src/hooks/useCreatePost'
import {
    CATEGORY,
    DURATION,
    PLACE,
    POST_STATE,
    COLLABORATION_TOOL,
    TEXT,
    TECHLIST,
    ConstantObj,
} from 'lib/constants'
import { ContentResponse } from 'types/response'
import { Inputs, PostObj } from 'types/post'
import DefaultButton from 'components/common/DefaultButton'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
} from '@mui/material'
import PeopleNumSelectComponent from 'components/PeopleNumSelectComponent'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import TechListSelectComponent from 'components/TechListSelectComponent'
import useGetPostForUpdate from 'hooks/useGetPostForUpdate'
import useLogger from 'hooks/useLogger'
import useCheckPart from 'hooks/state/post/peopleNumArr/useCheckPart'
import {
    muiLabelStyleObj,
    muiMenuItemStyleObj,
    muiRadioStyleObj,
    muiSelectMenuPropsObj,
    muiSelectStyleObj,
} from 'src/styles/mui/custom'
import PlaceHolderComponent from 'components/common/PlaceHolderComponent'
import useServiceManager from 'hooks/useServiceManager'
import {
    ErrorCollaborationTool,
    ErrorDuration,
    ErrorPeopleNum,
    ErrorTechList,
    ErrorTitle,
} from 'components/Error'
import { v4 as uuidv4 } from 'uuid'
import {
    pushPeopleNumObj,
    pushTechObj,
} from 'src/store/features/post/postCreateSlice'

const PostPageLayout = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding-top: 24px;
    padding-bottom: 88px;
    @media (max-width: 720px) {
        max-width: 100vw;
        min-height: 100%;
    }
`

const PostPageRow = styled.div``

const PostPageTitle = styled.h1`
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 40px;
`

const FormLayout = styled.form``

const Multiple = css`
    display: flex;
    column-gap: 56px;
`

const FormRow = styled.div<{
    multiple?: boolean
    marginBottom?: string
}>`
    ${(props) => (props.multiple ? Multiple : '')}
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
`

const TextCss = css`
    border: 1px solid #e9ecef;
    padding: 13px 12px;
    margin-bottom: 12px;
`

const TitleBox = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content 1fr;
`

const Title = styled.input`
    ${TextCss}
    height: 56px;
    border-radius: 10px;
    outline: 1px solid var(--gray-250);
    border: none;
    &:focus {
        outline: 1px solid var(--primary-color);
    }
    &::placeholder {
        color: var(--gray-400);
    }
`

const FormCol = styled.div`
    display: flex;
    flex-direction: column;
`

const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
    margin-top: 10px;
`

const WriteButton = styled(DefaultButton)``
const CancelButton = styled(DefaultButton)`
    border: 1px solid var(--primary-color);
    background-color: white;
    color: var(--primary-color);
`

const PeopleNumSelectBox = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

const TechListSelectBox = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

function PostPage() {
    const editorRef = useRef(null)

    const location = useLocation()
    const navigate = useNavigate()

    const createPost = useCreatePost()
    const updatePost = useUpdatePost()

    const logger = useLogger('PostPage')

    const serviceManager = useServiceManager()

    const isUpdate = /update/.test(location.pathname)
    // 페이지 url로 수정 페이지인지 판단
    const { id: paramId } = useParams()
    const [serverData, setServerData] = useState<ContentResponse>(null)
    const [isInitializedForUpdate, setIsInitializedForUpdate] = useState(false)
    // 수정시 초기값 세팅 여부

    const [isFirst, setIsFirst] = useState(true)

    const { isFrontEndSet, isBackEndSet, isDesignerSet, isPmSet, isMobileSet } =
        useCheckPart()

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<Inputs>()

    const peopleNumArrFromStore = useAppSelector(
        (state) => state.postCreateReducer.peopleNumArr
    )
    const techListFromStore = useAppSelector(
        (state) => state.postCreateReducer.techList
    )
    const peopleNumArrError = useMemo(() => {
        let isPartSet = false
        let isNumset = false
        peopleNumArrFromStore.forEach((item) => {
            if (item.num && item.num !== null) {
                isNumset = true
            }
            if (item.part && item.part !== '') {
                isPartSet = true
            }
        })

        if ((isPartSet && isNumset) || isFirst) {
            return ''
        }
        return 'required'
    }, [peopleNumArrFromStore, isFirst])

    const techListError = useMemo(() => {
        let isPartSet = false
        let istechsSet = false
        techListFromStore.forEach((item) => {
            if (item.techs && item.techs.length > 0) {
                istechsSet = true
            }
            if (item.part && item.part !== '') {
                isPartSet = true
            }
        })

        if ((isPartSet && istechsSet) || isFirst) {
            return ''
        }
        return 'required'
    }, [techListFromStore, isFirst])

    const dispatch = useAppDispatch()

    function handleCancel() {
        navigate('/')
    }

    function setValueForUpdate() {
        logger.log('setValueForUpdate()')
        setValue('category', serverData.category)
        setValue('duration', serverData.duration)
        setValue('place', serverData.place)
        setValue('title', serverData.title)
        setValue('postState', serverData.postState)
        setValue('collaborationTool', serverData.collaborationTool)
        editorRef.current.getInstance().setHTML(serverData.contentsParsed)

        if (serverData.frontReqNum) {
            if (!isFrontEndSet) {
                dispatch(
                    pushPeopleNumObj({
                        id: uuidv4(),
                        part: 'FrontEnd',
                        num: serverData.frontReqNum,
                    })
                )
            }
        }
        if (serverData.backReqNum) {
            if (!isBackEndSet) {
                dispatch(
                    pushPeopleNumObj({
                        id: uuidv4(),
                        part: 'BackEnd',
                        num: serverData.backReqNum,
                    })
                )
            }
        }
        if (serverData.designReqNum) {
            if (!isDesignerSet) {
                dispatch(
                    pushPeopleNumObj({
                        id: uuidv4(),
                        part: 'Designer',
                        num: serverData.designReqNum,
                    })
                )
            }
        }
        if (serverData.mobileReqNum) {
            if (!isMobileSet) {
                dispatch(
                    pushPeopleNumObj({
                        id: uuidv4(),
                        part: 'Mobile',
                        num: serverData.mobileReqNum,
                    })
                )
            }
        }
        if (serverData.pmReqNum) {
            if (!isPmSet) {
                dispatch(
                    pushPeopleNumObj({
                        id: uuidv4(),
                        part: 'PM',
                        num: serverData.pmReqNum,
                    })
                )
            }
        }

        if (serverData.techs) {
            const techListObj: { [key: string]: string[] } = {
                FrontEnd: [],
                BackEnd: [],
                Mobile: [],
            }

            serverData.techs.forEach((tech: string) => {
                TECHLIST.forEach((constantObj: ConstantObj<string>) => {
                    if (tech === constantObj.value) {
                        techListObj[constantObj.type].push(constantObj.value)
                    }
                })
            })

            const keys = Object.keys(techListObj)

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < keys.length; i++) {
                const part = keys[i]
                const techs = techListObj[part]
                if (techs.length > 0) {
                    dispatch(pushTechObj({ id: uuidv4(), part, techs }))
                }
            }
        }

        setIsInitializedForUpdate(true)

        setTimeout(() => {
            serviceManager.domainService.popupAPI.removeLoadingPopup()
        }, 500)
    }

    async function initializeServerData(): Promise<void> {
        logger.log('initializeServerData()')
        setServerData(await useGetPostForUpdate(paramId))
    }

    useEffect(() => {
        if (isUpdate && isInitializedForUpdate === false) {
            serviceManager.domainService.popupAPI.setLoadingPopup()
            initializeServerData()
        }
    }, [])

    useEffect(() => {
        if (isUpdate && serverData && isInitializedForUpdate === false) {
            setValueForUpdate()
        }
    }, [serverData])

    function clickSubmitBtnHandler() {
        setIsFirst(false)
    }

    const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
        if (peopleNumArrError || techListError) {
            return
        }

        const formData = new FormData()
        const inputDataCopied: PostObj = JSON.parse(JSON.stringify(inputData))

        peopleNumArrFromStore.forEach((item) => {
            switch (item.part) {
                case 'FrontEnd':
                    inputDataCopied.frontReqNum = item.num
                    break
                case 'BackEnd':
                    inputDataCopied.backReqNum = item.num
                    break
                case 'Designer':
                    inputDataCopied.designReqNum = item.num
                    break
                case 'PM':
                    inputDataCopied.pmReqNum = item.num
                    break
                case 'Mobile':
                    inputDataCopied.mobileReqNum = item.num
                    break
                default:
                // do nothing
            }
        })

        let techList: string[] = []

        techListFromStore.forEach((item) => {
            item.techs.forEach((tech) => {
                techList.push(tech)
            })
        })

        techList = [...techList, ...inputDataCopied.collaborationTool]
        delete inputDataCopied.collaborationTool

        formData.append(
            'contents',
            JSON.stringify(editorRef.current.getInstance().getHTML())
        )

        formData.append(
            'data',
            new Blob([JSON.stringify(inputDataCopied)], {
                type: 'application/json',
            })
            // Spring 서버를 위한 처리
        )
        formData.append(
            'techList',
            new Blob([JSON.stringify(techList)], {
                type: 'application/json',
            })
            // Spring 서버를 위한 처리
        )

        serviceManager.domainService.popupAPI.setLoadingPopup()
        if (isUpdate) {
            updatePost.mutate({ formData, id: paramId })
        } else {
            createPost.mutate(formData)
        }
    }

    return (
        <PostPageLayout>
            <PostPageRow>
                <PostPageTitle>
                    {isUpdate ? '수정하기' : '글쓰기'}
                </PostPageTitle>
            </PostPageRow>
            <PostPageRow>
                <FormLayout onSubmit={handleSubmit(onSubmit)}>
                    <FormRow multiple marginBottom="24px">
                        <FormControl>
                            <FormLabel
                                id="categoryRadioGroup-label"
                                sx={muiLabelStyleObj}
                            >
                                모집 구분
                            </FormLabel>
                            <Controller
                                control={control}
                                name="category"
                                defaultValue="PROJECT"
                                render={({ field }) => (
                                    <RadioGroup
                                        row
                                        {...field}
                                        aria-labelledby="categoryRadioGroup-label"
                                        name="categoryRadioGroup"
                                    >
                                        {CATEGORY.map((item) => {
                                            return (
                                                <FormControlLabel
                                                    key={item.title}
                                                    value={item.value}
                                                    control={
                                                        <Radio
                                                            sx={
                                                                muiRadioStyleObj
                                                            }
                                                        />
                                                    }
                                                    label={item.title}
                                                />
                                            )
                                        })}
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel
                                id="placeRadioGroup-label"
                                sx={muiLabelStyleObj}
                            >
                                진행 방식
                            </FormLabel>
                            <Controller
                                control={control}
                                name="place"
                                defaultValue="ONLINE"
                                render={({ field }) => (
                                    <RadioGroup
                                        row
                                        {...field}
                                        aria-labelledby="placeRadioGroup-label"
                                        name="placeRadioGroup"
                                    >
                                        {PLACE.map((item) => {
                                            return (
                                                <FormControlLabel
                                                    key={item.title}
                                                    value={item.value}
                                                    control={
                                                        <Radio
                                                            sx={
                                                                muiRadioStyleObj
                                                            }
                                                        />
                                                    }
                                                    label={item.title}
                                                />
                                            )
                                        })}
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 0, minWidth: 100 }} size="small">
                            <FormLabel
                                id="durationSelect-label"
                                sx={muiLabelStyleObj}
                            >
                                예상 기간
                            </FormLabel>
                            <Controller
                                control={control}
                                name="duration"
                                rules={{ required: true }}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        sx={muiSelectStyleObj}
                                        MenuProps={muiSelectMenuPropsObj}
                                        displayEmpty
                                        defaultValue=""
                                        aria-labelledby="durationSelect-label"
                                    >
                                        <MenuItem value="" disabled>
                                            <PlaceHolderComponent
                                                text={TEXT.PLACEHOLDER_CHOICE}
                                            />
                                        </MenuItem>
                                        {DURATION.map((item) => {
                                            return (
                                                <MenuItem
                                                    sx={muiMenuItemStyleObj}
                                                    value={item.value}
                                                    key={item.title}
                                                >
                                                    {item.title}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                )}
                            />
                            <ErrorDuration
                                errors={errors?.duration?.type}
                                margin="10px 0 0 0"
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 0, minWidth: 150, maxWidth: 200 }}
                            size="small"
                        >
                            <FormLabel
                                id="collaborationToolSelect-label"
                                sx={muiLabelStyleObj}
                            >
                                협업 프로그램
                            </FormLabel>
                            <Controller
                                control={control}
                                name="collaborationTool"
                                rules={{ required: true }}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <Select
                                        aria-labelledby="collaborationToolSelect-label"
                                        displayEmpty
                                        multiple
                                        name="collaborationTool"
                                        sx={muiSelectStyleObj}
                                        MenuProps={muiSelectMenuPropsObj}
                                        {...field}
                                        renderValue={(selected: string[]) => {
                                            if (selected.length === 0) {
                                                return (
                                                    <PlaceHolderComponent
                                                        text={
                                                            TEXT.PLACEHOLDER_CHOICE
                                                        }
                                                    />
                                                )
                                            }

                                            return selected.join(', ')
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            <PlaceHolderComponent
                                                text={TEXT.PLACEHOLDER_CHOICE}
                                            />
                                        </MenuItem>
                                        {COLLABORATION_TOOL.map((item) => {
                                            return (
                                                <MenuItem
                                                    sx={muiMenuItemStyleObj}
                                                    value={item.value}
                                                    key={item.title}
                                                >
                                                    {item.title}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                )}
                            />
                            <ErrorCollaborationTool
                                errors={errors?.collaborationTool?.type}
                                margin="10px 0 0 0"
                            />
                        </FormControl>
                    </FormRow>

                    <FormRow marginBottom="24px">
                        <FormLabel id="PeopleNum-label" sx={muiLabelStyleObj}>
                            모집 인원
                        </FormLabel>
                        <ErrorPeopleNum
                            errors={peopleNumArrError}
                            margin="10px 0 0 0"
                        />
                        <PeopleNumSelectBox>
                            {peopleNumArrFromStore?.map((item) => (
                                <PeopleNumSelectComponent
                                    key={item.id}
                                    id={item.id}
                                    isUpdate={isUpdate}
                                />
                            ))}
                        </PeopleNumSelectBox>
                    </FormRow>

                    <FormRow marginBottom="36px">
                        <FormLabel id="techList-label" sx={muiLabelStyleObj}>
                            기술 스택
                        </FormLabel>
                        <ErrorTechList
                            errors={techListError}
                            margin="10px 0 0 0"
                        />
                        <TechListSelectBox>
                            {techListFromStore?.map((item) => (
                                <TechListSelectComponent
                                    key={item.id}
                                    id={item.id}
                                    isUpdate={isUpdate}
                                />
                            ))}
                        </TechListSelectBox>
                    </FormRow>

                    <FormCol>
                        <ErrorTitle
                            errors={errors?.title?.type}
                            margin="0 0 10px 9%"
                        />
                        <TitleBox>
                            <FormControl
                                sx={{
                                    minWidth: 110,
                                    m: 0,
                                    marginRight: '10px',
                                }}
                                size="medium"
                            >
                                <Controller
                                    control={control}
                                    name="postState"
                                    defaultValue="ON"
                                    render={({ field }) => (
                                        <Select
                                            displayEmpty
                                            {...field}
                                            sx={muiSelectStyleObj}
                                            MenuProps={muiSelectMenuPropsObj}
                                        >
                                            <MenuItem value="" disabled>
                                                <PlaceHolderComponent
                                                    text={
                                                        TEXT.PLACEHOLDER_CHOICE
                                                    }
                                                />
                                            </MenuItem>
                                            {POST_STATE.map((item) => {
                                                return (
                                                    <MenuItem
                                                        sx={{
                                                            ...muiMenuItemStyleObj,
                                                        }}
                                                        value={item.value}
                                                        key={item.title}
                                                        disabled={
                                                            !isUpdate &&
                                                            item.title ===
                                                                '모집완료'
                                                        }
                                                    >
                                                        {item.title}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <Title
                                type="text"
                                placeholder="제목을 입력해주세요."
                                {...register('title', { required: true })}
                            />
                        </TitleBox>
                        <Editor
                            previewStyle="vertical"
                            height="600px"
                            ref={editorRef}
                        />
                    </FormCol>
                    <FormRow>
                        <ButtonBox>
                            <CancelButton type="button" onClick={handleCancel}>
                                취소
                            </CancelButton>
                            <WriteButton
                                onClick={() => {
                                    clickSubmitBtnHandler()
                                }}
                            >
                                {isUpdate ? '수정' : '등록'}
                            </WriteButton>
                        </ButtonBox>
                    </FormRow>
                </FormLayout>
            </PostPageRow>
        </PostPageLayout>
    )
}

export default PostPage
