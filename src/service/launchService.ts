import { Context } from 'src/context'

export interface LaunchServiceInterface {
    init: () => void
}

export class LaunchService implements LaunchServiceInterface {
    private static instance: LaunchService

    public init() {
        window.context = new Context()
        // 현재 static으로 init 메서드를 정의해도 무방하지만, 앞으로의 확장성 고려
    }

    public static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new LaunchService()
        return this.instance
    }
}
