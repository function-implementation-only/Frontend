import { DataService } from 'src/service/dataService'
import { DomainService } from 'src/service/domainService'

export interface ServiceManagerInterface {
    dataService: DataService
    domainService: DomainService
}

export class ServiceManager implements ServiceManagerInterface {
    private static instance: ServiceManagerInterface

    dataService

    domainService

    constructor() {
        this.dataService = new DataService()
        this.domainService = new DomainService()
    }

    public static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ServiceManager()
        return this.instance
    }
}
