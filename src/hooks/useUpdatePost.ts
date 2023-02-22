import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useServiceManager from './useServiceManager'

function useUpdatePost() {
    const navigate = useNavigate()
    const serviceManager = useServiceManager()

    return useMutation(
        async (parameter: { formData: FormData; id: string }) => {
            const { data } =
                await serviceManager.dataService.postAPI.updatePost(
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
                    // FIXME : i18n 라이브러리로 다국어 지원 해보기?
                    navigate('/')
                }
            },
        }
    )
}

export default useUpdatePost
