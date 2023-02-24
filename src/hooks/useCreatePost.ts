import { useMutation } from '@tanstack/react-query'
import useServiceManager from './useServiceManager'

function useCreatePost() {
    const serviceManager = useServiceManager()

    return useMutation(
        async (formData: FormData) => {
            const { data } =
                await serviceManager.dataService.postAPI.createPost(formData)
            return data
        },
        {
            onError: (e) => {
                console.log(e)
            },
            onSuccess: (data) => {
                if (data.success) {
                    alert('공고가 정상적으로 작성되었습니다.')
                    // FIXME : i18n 라이브러리로 다국어 지원 해보기?
                    window.location.replace('/')
                }
            },
        }
    )
}

export default useCreatePost
