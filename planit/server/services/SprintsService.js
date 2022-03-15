import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class SprintsService {
    async getAllSprints(query = {}) {
const sprints = await dbContext.Sprints.find(query).populate('project', 'name')

return sprints
    }
    async createSprint(body){
        const sprint = await dbContext.Sprints.create(body)
        return sprint
    }
}

export const sprintsService = new SprintsService()