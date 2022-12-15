import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { useMutation, useQuery } from 'react-query'
import { ConstantObj, TECHLIST } from '../../../lib/constants'
import { PostResponse } from '../../../types/response'
import SelectComponent from '../../components/SelectComponent'

type Inputs = {
    title: string
    contents: string
    category: string
    duration: string
    peopleNum: number
    place: string
    techList?: string[]
    // 아직 Spring 서버에서 배열로 받을 수 없어 하나의 값으로 처리
    startDate: Date | string
}

const PostPageLayout = styled.div``

const PostPageRow = styled.div``

const PostPageTitle = styled.h1`
    font-size: 22px;
    font-weight: 700;
`

const FormLayout = styled.form``

const FormRow = styled.div``

const FormCol = styled.div`
    display: flex;
    flex-direction: column;
`

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
                        <SelectComponent title="모집 구분" id="categorySelect">
                            <select
                                id="categorySelect"
                                {...register('category')}
                            >
                                <option value="">
                                    --Please choose an option--
                                </option>
                                <option value="PROJECT">프로젝트</option>
                                <option value="STUDY">스터디</option>
                            </select>
                        </SelectComponent>
                        <SelectComponent title="진행 기간" id="durationSelect">
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
                        <SelectComponent title="모집 인원" id="peopleNumSelect">
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
                        <SelectComponent title="진행 방식" id="placeSelect">
                            <select id="placeSelect" {...register('place')}>
                                <option value="">
                                    --Please choose an option--
                                </option>
                                <option value="ONLINE">온라인</option>
                                <option value="OFFLINE">오프라인</option>
                            </select>
                        </SelectComponent>
                        <SelectComponent title="기술 스택" id="techSelect">
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
                            id="startDateSelect"
                        >
                            <input
                                id="startDateSelect"
                                type="date"
                                {...register('startDate')}
                            />
                        </SelectComponent>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setImgFiles(e.target.files)
                            }}
                        />
                    </FormRow>
                    <FormCol>
                        <input
                            type="text"
                            placeholder="제목을 입력해주세요."
                            {...register('title')}
                        />
                        <input
                            type="text"
                            placeholder="내용을 입력해주세요."
                            {...register('contents')}
                        />
                    </FormCol>
                    <FormRow>
                        <button type="submit">
                            {isUpdate ? '수정하기' : '작성하기'}
                        </button>
                    </FormRow>
                </FormLayout>
            </PostPageRow>
        </PostPageLayout>
    )
}

export default PostPage
