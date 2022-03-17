import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService {
    async addNote(projectId, body){
        const res = await api.post('api/projects/' + projectId + '/notes', body)
        logger.log(res.data)
        AppState.notes = [...AppState.notes, res.data]
        logger.log(AppState.notes)
    }
    async getNotes(id){
        const res = await api.get('api/projects/' +id + '/notes')
        AppState.notes = res.data
    }
    async remove(id){
        const res = await api.delete('api/projects/' + AppState.activeProject.id + '/notes/' + id)
        AppState.notes = AppState.notes.filter(n => n.id !== id)
    }
}


export const notesService = new NotesService()