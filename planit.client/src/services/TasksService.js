import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService{
    async createTask(projectId, body){
        const res = await api.post('api/projects/'+ projectId + '/tasks', body)
        logger.log(res.data)
        AppState.tasks = [...AppState.tasks, res.data]
    }


    async getTasks(id){
        const res = await api.get('api/projects/'+ id +'/tasks')
        logger.log(res.data)
        AppState.tasks = res.data
    }

   

    async edit(updatedTask){
        // let updatedTask = AppState.tasks.find(t => t.id == id)
        
        // updatedTask.isComplete = !updatedTask.isComplete
        
        const res = await api.put('api/projects/'+ updatedTask.projectId + '/tasks/' + updatedTask.id, updatedTask)
        logger.log(res.data)
    }
    async remove(projectId, id){
        const res = await api.delete('api/projects/'+ projectId + '/tasks/' + id)
        AppState.tasks = AppState.tasks.filter(t => t.id != id)
    }

    async countTaskWeight(id){
        let tasks = AppState.tasks.filter(t => t.sprintId == id)
    }

}


export const tasksService = new TasksService()