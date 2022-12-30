import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import useServiceManager from './useServiceManager'

function useDeletePost() {
    const navigate = useNavigate()
    const serviceManager = useServiceManager()

    return useMutation(
        async (id: string) => {
            const { data } =
                await serviceManager.dataService.postAPI.deletePost(id)
            return data
        },
        {
            onError: (e) => {
                console.log(e)
            },
            onSuccess: (data) => {
                if (data.success) {
                    alert('공고가 삭제되었습니다.')
                    // FIXME : i18n 라이브러리로 다국어 지원 해보기?
                    navigate('/')
                }
            },
        }
    )
}

export default useDeletePost
