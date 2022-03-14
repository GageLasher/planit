import { dbContext } from "../db/DbContext"

class SprintsService {
    async createSprint(body){
        const sprint = await dbContext.Sprint.create(body)
        return sprint
    }
}

export const sprintsService = new SprintsService()