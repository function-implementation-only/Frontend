import { AxiosResponse } from 'axios'
import { ApplyObj } from 'types/apply'
import { APIResponse, ApplyResponse } from 'types/response'
import setInterceptors from '../interceptor'

export interface ApplyAPIInterface {
    postApplyment: (
        payload: ApplyObj
    ) => Promise<AxiosResponse<APIResponse<ApplyResponse>>>
    getApplyment: (
        applymentId: number
    ) => Promise<AxiosResponse<APIResponse<ApplyResponse>>>
    deleteApplyment: (
        applymentId: number
    ) => Promise<AxiosResponse<APIResponse<string>>>
    getAllMyApplyment: () => Promise<
        AxiosResponse<APIResponse<ApplyResponse[]>>
    >
}

export class ApplyAPI implements ApplyAPIInterface {
    postApplyment(
        payload: ApplyObj
    ): Promise<AxiosResponse<APIResponse<ApplyResponse>>> {
        return setInterceptors.post(`applyments`, payload)
    }

    getApplyment(
        applymentId: number
    ): Promise<AxiosResponse<APIResponse<ApplyResponse>>> {
        return setInterceptors.get(`applyments/${applymentId}`)
    }

    deleteApplyment(
        applymentId: number
    ): Promise<AxiosResponse<APIResponse<string>>> {
        return setInterceptors.delete(`applyments/${applymentId}`)
    }

    getAllMyApplyment(): Promise<AxiosResponse<APIResponse<ApplyResponse[]>>> {
        return setInterceptors.get(`applyments/my`)
    }
}
