import { ServiceManager } from 'src/manager/serviceManager'

function useServiceManager() {
    return ServiceManager.getInstance()
}

export default useServiceManager
