import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class SprintsService {
    async getAllSprints(id) {
const sprints = await dbContext.Sprints.find({projectId: id}).populate('creator')

return sprints
    }
    async createSprint(body){
        const sprint = await dbContext.Sprints.create(body)
        await sprint.populate('creator')
        return sprint
    }
    async remove(body){
        const sprint = await dbContext.Sprints.findById(body.sprintId)
        if(sprint.creatorId.toString() !== body.creatorId) {
            throw new Forbidden(" this isn't your sprint")
        }
        await dbContext.Sprints.findByIdAndDelete(body.sprintId)
        return "deleted"
    }
}

export const sprintsService = new SprintsService()