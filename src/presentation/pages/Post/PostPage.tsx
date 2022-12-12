/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { TechObj, TECHLIST } from '../../../lib/constants'

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

const PostPageLayout = styled.div`
    width: 400px;
    form {
        display: flex;
        flex-direction: column;
    }
`

function PostPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const { id } = useParams()

    const isUpdate = /update/.test(location.pathname)

    const { register, handleSubmit, setValue } = useForm<Inputs>()
    const [imgFiles, setImgFiles] = useState<FileList | null>(null)

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

        try {
            const { data } = isUpdate
                ? await window.context.postAPI.updatePost(id, formData)
                : await window.context.postAPI.createPost(formData)
            if (data.success) {
                alert('공고가 정상적으로 작성되었습니다.')
                // FIX ME : i18n 라이브러리로 다국어 지원 해보기?
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function intializeForUpdate() {
        const {
            data: { data },
        } = await window.context.postAPI.getOnePost(id)

        setValue('category', data.category)
        setValue('contents', data.contents)
        setValue('duration', data.duration)
        setValue('peopleNum', Number(data.peopleNum))
        setValue('place', data.place)
        setValue('startDate', dayjs(data.startDate).format('YYYY-MM-DD'))
        setValue('title', data.title)
        setValue(
            'techList',
            data.techs.map((item: { id: number; tech: string }) => {
                return item.tech
            })
        )

        // techList와 img 초기화 추가 필요
    }

    useEffect(() => {
        if (isUpdate) {
            intializeForUpdate()
        }
    }, [])

    return (
        <PostPageLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="categorySelect">
                    모집 구분
                    <br />
                    <select id="categorySelect" {...register('category')}>
                        <option value="">--Please choose an option--</option>
                        <option value="PROJECT">프로젝트</option>
                        <option value="STUDY">스터디</option>
                    </select>
                </label>
                <label htmlFor="durationSelect">
                    진행 기간
                    <br />
                    <select id="durationSelect" {...register('duration')}>
                        <option value="">--Please choose an option--</option>
                        <option value="ONE">1개월</option>
                        <option value="TWO">2개월</option>
                        <option value="THREE">3개월</option>
                        <option value="FOUR">4개월</option>
                        <option value="FIVE">5개월</option>
                        <option value="SIX">6개월 이상</option>
                    </select>
                </label>
                <label htmlFor="peopleNumSelect">
                    모집 인원
                    <br />
                    <select id="peopleNumSelect" {...register('peopleNum')}>
                        <option value="">--Please choose an option--</option>
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
                </label>
                <label htmlFor="placeSelect">
                    진행 방식
                    <br />
                    <select id="placeSelect" {...register('place')}>
                        <option value="">--Please choose an option--</option>
                        <option value="ONLINE">온라인</option>
                        <option value="OFFLINE">오프라인</option>
                    </select>
                </label>
                <label htmlFor="techListSelect">
                    기술 스택
                    <br />
                    <select multiple id="techSelect" {...register('techList')}>
                        {TECHLIST.map((item: TechObj) => {
                            return (
                                <option key={item.value} value={item.value}>
                                    {item.value}
                                </option>
                            )
                        })}
                    </select>
                </label>
                <label htmlFor="startDateSelect">
                    시작 예정일
                    <br />
                    <input
                        id="startDateSelect"
                        type="date"
                        {...register('startDate')}
                    />
                </label>
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setImgFiles(e.target.files)
                    }}
                />
                <button type="submit">
                    {isUpdate ? '수정하기' : '작성하기'}
                </button>
            </form>
        </PostPageLayout>
    )
}

export default PostPage
