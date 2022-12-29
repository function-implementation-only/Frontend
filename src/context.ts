import { DataService } from 'src/service/dataService'

export interface ContextInterface {
    dataService: DataService
}

export class Context implements ContextInterface {
    dataService: DataService

    constructor() {
        this.dataService = DataService.getInstance()
    }
}
