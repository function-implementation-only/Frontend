import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import useUpdatePost from 'src/hooks/useUpdatePost'
import useCreatePost from 'src/hooks/useCreatePost'
import usePostById from 'src/hooks/usePostById'
import {
    CATEGORY,
    DURATION,
    PARSE_CONSTANT,
    PLACE,
    POST_STATE,
} from 'lib/constants'
import { ContentResponse } from 'types/response'
import { Inputs } from 'types/post'
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

const PostPageLayout = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding-top: 24px;
    padding-bottom: 88px;
`

const PostPageRow = styled.div``

const PostPageTitle = styled.h1`
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 40px;
`

const FormLayout = styled.form``

const FormRow = styled.div``

const TextCss = css`
    border: 1px solid #e9ecef;
    padding: 13px 12px;
    margin-bottom: 12px;
`

const TitleBox = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content 1fr;
`

const Title = styled.input`
    ${TextCss}
`

const FormCol = styled.div`
    display: flex;
    flex-direction: column;
`

const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
`

const WriteButton = styled(DefaultButton)``

function PostPage() {
    const editorRef = useRef(null)

    const location = useLocation()
    const { id: paramId } = useParams()

    const createPost = useCreatePost()
    const updatePost = useUpdatePost()

    const isUpdate = /update/.test(location.pathname)
    // 페이지 url로 수정 페이지인지 판단

    const { register, handleSubmit, setValue } = useForm<Inputs>()

    const [isInitialized, setIsInitialized] = useState(false)
    // 수정시 초기값 세팅 여부

    function setServerData(serverData: ContentResponse) {
        setValue('category', serverData.category)
        // setValue('contents', serverData.contents)
        setValue('duration', serverData.duration)
        setValue('peopleNum', Number(serverData.peopleNum))
        setValue('place', serverData.place)
        setValue('startDate', dayjs(serverData.startDate).format('YYYY-MM-DD'))
        setValue('title', serverData.title)
        setValue(
            'techList',
            serverData.techs.map((item: { id: number; tech: string }) => {
                return item.tech
            })
        )
        // FIXME : 이미지 초기화 로직에 대해서 고민해보기
        setIsInitialized(true)
    }

    if (isUpdate && isInitialized === false) {
        const { data: apiResponse } = usePostById(paramId)
        setServerData(apiResponse.data)
    }
    // 수정 페이지로 진입시 초기값 세팅

    const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
        const formData = new FormData()
        const inputDataCopied = JSON.parse(JSON.stringify(inputData))

        const { techList } = inputData
        delete inputDataCopied.techList
        // techList 분리

        inputDataCopied.contents = editorRef.current.editorInst.getHTML()
        console.log(editorRef.current.editorInst.getHTML())

        console.log(inputDataCopied)
        return

        formData.append(
            'data',
            new Blob([JSON.stringify(inputDataCopied)], {
                type: 'application/json',
            })
            // Spring 서버를 위한 처리
        )
        formData.append(
            'techList',
            new Blob([JSON.stringify(techList)], { type: 'application/json' })
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
                    <FormRow>
                        <FormControl>
                            <FormLabel id="categoryRadioGroup-label">
                                모집 구분
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="categoryRadioGroup-label"
                                name="categoryRadioGroup"
                            >
                                {CATEGORY.map((item) => {
                                    return (
                                        <FormControlLabel
                                            key={item.title}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.title}
                                            {...register('category')}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="placeRadioGroup-label">
                                진행 방식
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="placeRadioGroup-label"
                                name="placeRadioGroup"
                            >
                                {PLACE.map((item) => {
                                    return (
                                        <FormControlLabel
                                            key={item.title}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.title}
                                            {...register('place')}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl
                            sx={{ m: 0.5, minWidth: 120 }}
                            size="small"
                        >
                            <FormLabel id="durationSelect-label">
                                예상 기간
                            </FormLabel>
                            <Select
                                id="durationSelect"
                                displayEmpty
                                defaultValue=""
                                {...register('duration')}
                            >
                                <MenuItem value="" disabled>
                                    선택해주세요.
                                </MenuItem>
                                {DURATION.map((item) => {
                                    return (
                                        <MenuItem
                                            value={item.value}
                                            key={item.title}
                                        >
                                            {item.title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{ m: 0.5, minWidth: 120 }}
                            size="small"
                        >
                            <FormLabel id="cooperationProgramSelect-label">
                                협업 프로그램
                            </FormLabel>
                            <Select
                                id="cooperationProgramSelect"
                                displayEmpty
                                multiple
                                defaultValue={[]}
                                renderValue={(selected: string[]) => {
                                    if (selected.length === 0) {
                                        return <em>선택해주세요.</em>
                                    }

                                    const selectedParsed = selected.map(
                                        (item) => {
                                            return PARSE_CONSTANT[item]
                                        }
                                    )

                                    return selectedParsed.join(', ')
                                }}
                                {...register('cooperationProgram')}
                            >
                                <MenuItem value="" disabled>
                                    선택해주세요.
                                </MenuItem>
                                {DURATION.map((item) => {
                                    return (
                                        <MenuItem
                                            value={item.value}
                                            key={item.title}
                                        >
                                            {item.title}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </FormRow>
                    <FormCol>
                        <TitleBox>
                            <FormControl
                                sx={{ m: 0.5, minWidth: 'max-content' }}
                                size="small"
                            >
                                <Select
                                    displayEmpty
                                    defaultValue=""
                                    {...register('postState')}
                                >
                                    <MenuItem value="" disabled>
                                        선택해주세요.
                                    </MenuItem>
                                    {POST_STATE.map((item) => {
                                        return (
                                            <MenuItem
                                                value={item.value}
                                                key={item.title}
                                                disabled={
                                                    !isUpdate &&
                                                    item.title === '모집완료'
                                                }
                                            >
                                                {item.title}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
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
                            initialEditType="markdown"
                            useCommandShortcut
                            ref={editorRef}
                        />
                    </FormCol>
                    <FormRow>
                        <ButtonBox>
                            <WriteButton>
                                {isUpdate ? '수정하기' : '작성하기'}
                            </WriteButton>
                        </ButtonBox>
                    </FormRow>
                </FormLayout>
            </PostPageRow>
        </PostPageLayout>
    )
}

export default PostPage
