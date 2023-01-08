import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import useUpdatePost from 'src/hooks/useUpdatePost'
import useCreatePost from 'src/hooks/useCreatePost'
import usePostById from 'src/hooks/usePostById'
import {
    CATEGORY,
    ConstantObj,
    DURATION,
    PEOPLENUM,
    PLACE,
    TECHLIST,
} from 'lib/constants'
import SelectComponent from 'components/SelectComponent'
import RadioComponent from 'components/RadioComponent'
import { DefaultButton } from 'components/HeaderComponent'
import { ContentResponse } from 'types/response'
import { Inputs } from 'types/post'

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

    const { id: paramId } = useParams()

    const isUpdate = /update/.test(location.pathname)
    // 페이지 url로 수정 페이지인지 판단

    const { register, handleSubmit, setValue } = useForm<Inputs>()
    const [imgFiles, setImgFiles] = useState<FileList | null>(null)

    const [isInitialized, setIsInitialized] = useState(false)
    // 수정시 초기값 세팅 여부

    const category = register('category')
    const place = register('place')

    function setServerData(serverData: ContentResponse) {
        setValue('category', serverData.category)
        setValue('contents', serverData.contents)
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
        // FIXME : 메서드명 고민 필요
        const formData = new FormData()
        const inputDataCopied = JSON.parse(JSON.stringify(inputData))
        const { techList } = inputData
        delete inputDataCopied.techList

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
            useUpdatePost().mutate({ formData, id: paramId })
        } else {
            useCreatePost().mutate(formData)
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
                                    {DURATION.map((item) => {
                                        return (
                                            <option
                                                value={item.value}
                                                key={item.title}
                                            >
                                                {item.title}
                                            </option>
                                        )
                                    })}
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
                                    {PEOPLENUM.map((item) => {
                                        return (
                                            <option
                                                value={item.value}
                                                key={item.title}
                                            >
                                                {item.title}
                                            </option>
                                        )
                                    })}
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
