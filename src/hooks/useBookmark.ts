import useServiceManager from './useServiceManager'

async function useBookmark(paramId: string) {
    const serviceManager = useServiceManager()

    try {
        const { data } = await serviceManager.dataService.likesAPI.postLikes(
            paramId
        )
        serviceManager.domainService.popupAPI.removeLoadingPopup()
        if (data.data) {
            serviceManager.domainService.popupAPI.show({
                type: 'check',
                content: '해당 공고가 북마크되었습니다.',
                buttons: [
                    {
                        label: '확인',
                        clickHandler: () => {
                            serviceManager.domainService.popupAPI.closeTopPopup()
                            window.location.reload()
                        },
                    },
                ],
            })
        } else {
            serviceManager.domainService.popupAPI.show({
                type: 'check',
                content: '북마크가 취소되었습니다.',
                buttons: [
                    {
                        label: '확인',
                        clickHandler: () => {
                            serviceManager.domainService.popupAPI.closeTopPopup()
                            window.location.reload()
                        },
                    },
                ],
            })
        }
    } catch (e) {
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
    }
}

export default useBookmark
