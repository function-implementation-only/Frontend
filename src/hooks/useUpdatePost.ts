import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

function useUpdatePost() {
    return useMutation(
        async (parameter: { formData: FormData; id: string }) => {
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
}

export default useUpdatePost
