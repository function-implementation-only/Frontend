import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import { useMutation, useQuery } from 'react-query'
import { CATEGORY, ConstantObj, PLACE, TECHLIST } from '../../../lib/constants'
import { PostResponse } from '../../../types/response'
import SelectComponent from '../../components/SelectComponent'
import RadioComponent from '../../components/RadioComponent'
import { Inputs } from '../../../types/post'
import { DefaultButton } from '../../components/HeaderComponent'

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

const SelectComponentBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`

const RadioComponentBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, max-content);
    grid-auto-flow: column;
    grid-column-gap: 26px;
`

const TextCss = css`
    border: 1px solid #e9ecef;
    padding: 13px 12px;
    margin-bottom: 12px;
`

const Title = styled.input`
    ${TextCss}
`

const Contents = styled.textarea`
    ${TextCss}
    resize: none;
    height: 412px;
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
    const location = useLocation()
    const navigate = useNavigate()

    const { id: paramId } = useParams()

    const isUpdate = /update/.test(location.pathname)

    const { register, handleSubmit, setValue } = useForm<Inputs>()
    const [imgFiles, setImgFiles] = useState<FileList | null>(null)

    const [isInitialized, setIsInitialized] = useState(false)
    // 수정시 초기값 세팅 여부

    function setServerData(serverData: PostResponse) {
        setValue('category', serverData.category)
        setValue('contents', serverData.contents)
        setValue('duration', serverData.duration)
        setValue('peopleNum', Number(serverData?.peopleNum))
        setValue('place', serverData.place)
        setValue('startDate', dayjs(serverData.startDate).format('YYYY-MM-DD'))
        setValue('title', serverData.title)
        setValue(
            'techList',
            serverData.techs.map((item: { id: number; tech: string }) => {
                return item.tech
            })
        )
        // FIX ME : 이미지 초기화 로직에 대해서 고민해보기
        setIsInitialized(true)
    }

    useQuery('setServerData', async () => {
        if (isUpdate && !isInitialized) {
            const { data } = await window.context.postAPI.getOnePost(paramId)
            setServerData(data.data)
        }
    })
    // FIX ME : 에러 핸들링 추가
    // 수정시 초기화 로직

    const updateMutation = useMutation(
        async (parameter: { formData: FormData; id?: string }) => {
            const { data } = await window.context.postAPI.updatePost(
                parameter.formData,
                parameter.id
            )
            return data
        },
        {
            onError: (e) => {
                console.log(e)
            },
            onSuccess: (data) => {
                if (data.success) {
                    alert('공고가 정상적으로 수정되었습니다.')
                    // FIX ME : i18n 라이브러리로 다국어 지원 해보기?
                    navigate('/')
                }
            },
        }
    )
    const createMutation = useMutation(
        async (formdata: FormData) => {
            const { data } = await window.context.postAPI.createPost(formdata)
            return data
        },
        {
            onError: (e) => {
                console.log(e)
            },
            onSuccess: (data) => {
                if (data.success) {
                    alert('공고가 정상적으로 작성되었습니다.')
                    // FIX ME : i18n 라이브러리로 다국어 지원 해보기?
                    navigate('/')
                }
            },
        }
    )

    const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
        const formData = new FormData()
        const dataCopied = inputData
        const { techList } = inputData
        delete dataCopied.techList

        formData.append(
            'data',
            new Blob([JSON.stringify(inputData)], { type: 'application/json' })
            // Spring 서버를 위한 처리
        )
        formData.append(
            'techList',
            new Blob([JSON.stringify(techList)], { type: 'application/json' })
            // Spring 서버를 위한 처리
        )
        if (imgFiles) {
            formData.append('image', imgFiles[0])
        }

        if (isUpdate) {
            updateMutation.mutate({ formData, id: paramId })
        } else {
            createMutation.mutate(formData)
        }
    }

    const category = register('category')
    const place = register('place')

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
                        <SelectComponentBox>
                            <SelectComponent
                                title="모집 구분"
                                htmlFor="categorySelect"
                            >
                                <RadioComponentBox>
                                    {CATEGORY.map((item) => {
                                        return (
                                            <RadioComponent
                                                key={item.title}
                                                title={item.title}
                                                value={item.value}
                                                name={category.name}
                                                onChange={category.onChange}
                                                onBlur={category.onBlur}
                                                inputRef={category.ref}
                                            />
                                        )
                                    })}
                                </RadioComponentBox>
                            </SelectComponent>
                            <SelectComponent
                                title="진행 기간"
                                htmlFor="durationSelect"
                            >
                                <select
                                    id="durationSelect"
                                    {...register('duration')}
                                >
                                    <option value="">
                                        --Please choose an option--
                                    </option>
                                    <option value="ONE">1개월</option>
                                    <option value="TWO">2개월</option>
                                    <option value="THREE">3개월</option>
                                    <option value="FOUR">4개월</option>
                                    <option value="FIVE">5개월</option>
                                    <option value="SIX">6개월 이상</option>
                                </select>
                            </SelectComponent>
                            <SelectComponent
                                title="모집 인원"
                                htmlFor="peopleNumSelect"
                            >
                                <select
                                    id="peopleNumSelect"
                                    {...register('peopleNum')}
                                >
                                    <option value="">
                                        --Please choose an option--
                                    </option>
                                    <option value={1}>1명</option>
                                    <option value={2}>2명</option>
                                    <option value={3}>3명</option>
                                    <option value={4}>4명</option>
                                    <option value={5}>5명</option>
                                    <option value={6}>6명</option>
                                    <option value={7}>7명</option>
                                    <option value={8}>8명</option>
                                    <option value={9}>9명</option>
                                    <option value={10}>10명 이상</option>
                                </select>
                            </SelectComponent>
                            <SelectComponent
                                title="진행 방식"
                                htmlFor="placeSelect"
                            >
                                <RadioComponentBox>
                                    {PLACE.map((item) => {
                                        return (
                                            <RadioComponent
                                                key={item.title}
                                                title={item.title}
                                                value={item.value}
                                                name={place.name}
                                                onChange={place.onChange}
                                                onBlur={place.onBlur}
                                                inputRef={place.ref}
                                            />
                                        )
                                    })}
                                </RadioComponentBox>
                            </SelectComponent>
                            <SelectComponent
                                title="기술 스택"
                                htmlFor="techSelect"
                            >
                                <select
                                    multiple
                                    id="techSelect"
                                    {...register('techList')}
                                >
                                    {TECHLIST.map((item: ConstantObj) => {
                                        return (
                                            <option
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.value}
                                            </option>
                                        )
                                    })}
                                </select>
                            </SelectComponent>
                            <SelectComponent
                                title="시작 예정일"
                                htmlFor="startDateSelect"
                            >
                                <input
                                    id="startDateSelect"
                                    type="date"
                                    {...register('startDate')}
                                />
                            </SelectComponent>
                            <SelectComponent
                                title="이미지 파일"
                                htmlFor="imgFile"
                            >
                                <input
                                    id="imgFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setImgFiles(e.target.files)
                                    }}
                                />
                            </SelectComponent>
                        </SelectComponentBox>
                    </FormRow>
                    <FormCol>
                        <Title
                            type="text"
                            placeholder="제목을 입력해주세요."
                            {...register('title')}
                        />
                        <Contents
                            placeholder="내용을 입력해주세요."
                            {...register('contents')}
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
