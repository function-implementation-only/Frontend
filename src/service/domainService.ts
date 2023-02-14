import { PopupAPI, PopupAPIInterface } from 'src/domain/ui/popup/popupAPI'

export interface DomainServiceInterface {
    popupAPI: PopupAPIInterface
}

export class DomainService implements DomainServiceInterface {
    popupAPI

    constructor() {
        this.popupAPI = new PopupAPI()
    }
}
