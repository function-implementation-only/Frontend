import { useMutation } from '@tanstack/react-query'
import useServiceManager from './useServiceManager'

function useDeletePost() {
    const serviceManager = useServiceManager()

    return useMutation(
        async (id: string) => {
            const { data } =
                await serviceManager.dataService.postAPI.deletePost(id)
            return data
        },
        {
            onError: (e) => {
                serviceManager.domainService.popupAPI.removeLoadingPopup()
                serviceManager.domainService.popupAPI.show({
                    content: e.toString(),
                    buttons: [
                        {
                            label: '확인',
                            clickHandler: () => {
                                serviceManager.domainService.popupAPI.closeTopPopup()
                            },
                        },
                    ],
                })
            },
            onSuccess: (data) => {
                if (data.success) {
                    serviceManager.domainService.popupAPI.removeLoadingPopup()
                    serviceManager.domainService.popupAPI.show({
                        type: 'check',
                        content: '공고가 삭제되었습니다.',
                        buttons: [
                            {
                                label: '확인',
                                clickHandler: () => {
                                    serviceManager.domainService.popupAPI.closeTopPopup()
                                    window.location.replace('/')
                                },
                            },
                        ],
                    })
                }
            },
        }
    )
}

export default useDeletePost
