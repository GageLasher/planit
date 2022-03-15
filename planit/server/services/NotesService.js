import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class NotesService {
    async create(body){
        const note = await dbContext.Notes.create(body)
        await note.populate('creator')
        return note
    }
    async getAll(id){
        const notes = await dbContext.Notes.find({projectId: id}).populate('creator')
        return notes
    }
    async remove(body){
        const noteToDelete = await dbContext.Notes.findById(body.id)
        if(noteToDelete.creatorId.toString() !== body.creatorId){
            throw new Forbidden("You cant delete, not your note")
        }
        await dbContext.Notes.findByIdAndDelete(body.id)
        return "Delorted"
    }
}

export const notesService = new NotesService()