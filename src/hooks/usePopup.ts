import useServiceManager from './useServiceManager'

function usePopup(content: string) {
    const serviceManager = useServiceManager()
    serviceManager.domainService.popupAPI.show({
        content,
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

export default usePopup
