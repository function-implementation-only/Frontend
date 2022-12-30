import { DataService } from 'src/service/dataService'

export interface ServiceManagerInterface {
    dataService: DataService
}

export class ServiceManager implements ServiceManagerInterface {
    private static instance: ServiceManagerInterface

    dataService

    constructor() {
        this.dataService = new DataService()
    }

    public static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ServiceManager()
        return this.instance
    }
}
