import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {
    async createSprint(body, id){
        const res = await api.post('api/projects/'+ id + '/sprints', body)
        // logger.log(res.data)
        AppState.sprints = [...AppState.sprints, res.data]
    }
    async getSprints(id){
        const res = await api.get('api/projects/'+ id +'/sprints')
        logger.log(res.data)
        AppState.sprints = res.data
    }
    }    export const sprintsService = new SprintsService()