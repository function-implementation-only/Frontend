import React, { useState } from 'react'
import styled from 'styled-components'
import { TECHSTACK, TechObj } from '../../lib/constants'

const PostPageLayout = styled.div`
    width: 400px;
    form {
        display: flex;
        flex-direction: column;
    }
`

function PostPage() {
    const [categoryValue, setCategoryValue] = useState('')
    const [durationValue, setDurationValue] = useState('')
    const [peopleNumValue, setPeopleNumValue] = useState('')
    const [placeValue, setPlaceValue] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [techStackValue, setTechStackValue] = useState<string[]>([])
    const [startDateValue, setstartDateValue] = useState({})

    const [imgFileValue, setImgFileValue] = useState<FileList | null>(null)

    const [titleValue, setTitleValue] = useState('')
    const [contentsValue, setContentsValue] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const formData = new FormData()
        const data = {
            title: titleValue,
            contents: contentsValue,
            category: categoryValue,
            duration: durationValue,
            peopleNum: peopleNumValue,
            place: placeValue,
            tech: 'JAVASCRIPT',
            // 아직 Spring 서버에서 배열로 받을 수 없어 하나의 값으로 처리
            startDate: startDateValue,
        }
        formData.append(
            'data',
            new Blob([JSON.stringify(data)], { type: 'application/json' })
            // Spring 서버를 위한 처리
        )
        if (imgFileValue) {
            formData.append('image', imgFileValue[0])
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await window.context.postAPI.postAnnouncement(
                formData
            )
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    }

    return (
        <PostPageLayout>
            <form onSubmit={handleSubmit}>
                <label htmlFor="categorySelect">
                    모집 구분
                    <br />
                    <select
                        name="category"
                        id="categorySelect"
                        value={categoryValue}
                        onChange={(e) => {
                            setCategoryValue(e.target.value)
                        }}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="PROJECT">프로젝트</option>
                        <option value="STUDY">스터디</option>
                    </select>
                </label>
                <label htmlFor="durationSelect">
                    진행 기간
                    <br />
                    <select
                        name="duration"
                        id="durationSelect"
                        value={durationValue}
                        onChange={(e) => {
                            setDurationValue(e.target.value)
                        }}
                    >
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
                    <select
                        name="peopleNum"
                        id="peopleNumSelect"
                        value={peopleNumValue}
                        onChange={(e) => {
                            setPeopleNumValue(e.target.value)
                        }}
                    >
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
                    <select
                        name="place"
                        id="placeSelect"
                        value={placeValue}
                        onChange={(e) => {
                            setPlaceValue(e.target.value)
                        }}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="ONLINE">온라인</option>
                        <option value="OFFLINE">오프라인</option>
                    </select>
                </label>
                <label htmlFor="techStackSelect">
                    기술 스택
                    <br />
                    <select
                        multiple
                        name="techStack"
                        id="techSelect"
                        onChange={(e) => {
                            const options = Array.from(e.target.options)
                            const selected = options
                                .filter((o) => o.selected)
                                .map((o) => o.value)

                            setTechStackValue(selected)
                        }}
                    >
                        {TECHSTACK.map((item: TechObj) => {
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
                        type="date"
                        onChange={(e) => {
                            setstartDateValue(e.target.value)
                        }}
                    />
                </label>
                <input
                    type="text"
                    placeholder="제목을 입력해주세요."
                    onChange={(e) => {
                        setTitleValue(e.target.value)
                    }}
                    value={titleValue}
                />
                <input
                    type="text"
                    placeholder="내용을 입력해주세요."
                    onChange={(e) => {
                        setContentsValue(e.target.value)
                    }}
                    value={contentsValue}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setImgFileValue(e.target.files)
                    }}
                />
                <button type="submit">작성하기</button>
            </form>
        </PostPageLayout>
    )
}

export default PostPage
