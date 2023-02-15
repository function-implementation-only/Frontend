import { useRef, useState, useEffect } from 'react'
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
import { useAppSelector } from 'src/store/hooks'
import TechListSelectComponent from 'components/TechListSelectComponent'
import useGetPostForUpdate from 'hooks/useGetPostForUpdate'
import useLogger from 'hooks/useLogger'
import {
    muiLabelStyleObj,
    muiMenuItemStyleObj,
    muiSelectMenuPropsObj,
    muiSelectStyleObj,
} from 'src/styles/mui/custom'
import PlaceHolderComponent from 'components/common/PlaceHolderComponent'

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

    const isUpdate = /update/.test(location.pathname)
    // 페이지 url로 수정 페이지인지 판단
    const { id: paramId } = useParams()
    const [serverData, setServerData] = useState<ContentResponse>(null)
    const [isInitializedForUpdate, setIsInitializedForUpdate] = useState(false)
    // 수정시 초기값 세팅 여부

    const { register, handleSubmit, setValue, control } = useForm<Inputs>()

    const peopleNumArr = useAppSelector(
        (state) => state.postCreateReducer.peopleNumArr
    )
    const techListFromStore = useAppSelector(
        (state) => state.postCreateReducer.techList
    )

    function handleCancel() {
        navigate('/')
    }

    function setValueForUpdate() {
        setValue('category', serverData.category)
        setValue('duration', serverData.duration)
        setValue('place', serverData.place)
        setValue('title', serverData.title)
        setValue('postState', serverData.postState)
        setValue('collaborationTool', serverData.collaborationTool)
        editorRef.current.getInstance().setHTML(serverData.contentsParsed)
        setIsInitializedForUpdate(true)
    }

    async function initializeServerData(): Promise<void> {
        logger.log('initializeServerData()')
        setServerData(await useGetPostForUpdate(paramId))
    }

    useEffect(() => {
        if (isUpdate && isInitializedForUpdate === false) {
            initializeServerData()
        }
    }, [])

    useEffect(() => {
        if (isUpdate && serverData && isInitializedForUpdate === false) {
            setValueForUpdate()
        }
    }, [isInitializedForUpdate])

    const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
        const formData = new FormData()
        const inputDataCopied: PostObj = JSON.parse(JSON.stringify(inputData))

        peopleNumArr.forEach((item) => {
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
                                                            sx={{
                                                                color: 'var(--primary-color)',
                                                                '&.Mui-checked':
                                                                    {
                                                                        color: 'var(--primary-color)',
                                                                    },
                                                            }}
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
                                                            sx={{
                                                                color: 'var(--primary-color)',
                                                                '&.Mui-checked':
                                                                    {
                                                                        color: 'var(--primary-color)',
                                                                    },
                                                            }}
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
                        </FormControl>
                    </FormRow>

                    <FormRow marginBottom="24px">
                        <FormLabel id="PeopleNum-label" sx={muiLabelStyleObj}>
                            모집 인원
                        </FormLabel>
                        <PeopleNumSelectBox>
                            {peopleNumArr?.map((item) => (
                                <PeopleNumSelectComponent
                                    key={item.id}
                                    id={item.id}
                                />
                            ))}
                        </PeopleNumSelectBox>
                    </FormRow>

                    <FormRow marginBottom="36px">
                        <FormLabel id="techList-label" sx={muiLabelStyleObj}>
                            기술 스택
                        </FormLabel>
                        <TechListSelectBox>
                            {techListFromStore?.map((item) => (
                                <TechListSelectComponent
                                    key={item.id}
                                    id={item.id}
                                />
                            ))}
                        </TechListSelectBox>
                    </FormRow>

                    <FormCol>
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
                                    defaultValue=""
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
                                {...register('title')}
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
                            <WriteButton>
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
