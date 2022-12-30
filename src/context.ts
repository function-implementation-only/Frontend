import { DataService, DataServiceInterface } from 'data/dataService'

export interface ContextInterface {
    dataService: DataServiceInterface
}

export class Context implements ContextInterface {
    dataService

    constructor() {
        this.dataService = DataService.getInstance()
    }
}
