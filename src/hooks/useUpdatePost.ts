import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ServiceManager } from 'src/manager/serviceManager'

function useUpdatePost() {
    const navigate = useNavigate()

    return useMutation(
        async (parameter: { formData: FormData; id: string }) => {
            const { data } =
                await ServiceManager.getInstance().dataService.postAPI.updatePost(
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
