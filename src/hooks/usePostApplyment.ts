// eslint-disable-next-line import/no-extraneous-dependencies
import { useMutation } from '@tanstack/react-query'
import { ApplyObj } from 'types/apply'
import useServiceManager from './useServiceManager'

function usePostApplyment() {
    const serviceManager = useServiceManager()

    return useMutation(
        async (payload: ApplyObj) => {
            const { data } =
                await serviceManager.dataService.applyAPI.postApplyment(payload)
            return data
        },
        {
            onError: (e: Error) => {
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
                    serviceManager.domainService.popupAPI.show({
                        type: 'check',
                        content: '지원이 완료되었습니다.',
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

export default usePostApplyment
