
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {
    async getProjects(){
        const res = await api.get('api/projects')
        // logger.log(res.data)
        AppState.projects = res.data
    }
    async createProject(body){
        const res = await api.post('api/projects', body)
        // logger.log(res.data)
        AppState.projects = [...AppState.projects, res.data]
        AppState.activeProject = res.data
    }
    async getActiveProject(id){
        const res = await api.get('api/projects/'+id)
        AppState.activeProject = res.data
        
    }
    async remove(id){
        const res = await api.delete('api/projects/'+id)
        AppState.projects = AppState.projects.filter(p => p.id != id)
        AppState.activeProject = {}
    }

}


export const projectsService = new ProjectsService()