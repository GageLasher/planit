import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class ProjectsService {
   async remove(projectId, userId) {
        const projectToDelete = await this.getProject(projectId)
        if(projectToDelete.creatorId.toString() !== userId){
            throw new Forbidden("this is not your project")
        }
        await dbContext.Projects.findByIdAndDelete(projectId)
        // await projectToDelete.delete()
        return "deleted"
    }
   async getProjects(query = {}) {
        const projects = await dbContext.Projects.find(query).populate('creator', )
        return projects
    }
  async getProject(id) {
       const project = await dbContext.Projects.findById(id).populate('creator', 'name')
       if(!project){
        throw new BadRequest('No project to be found')
       }
       return project
   }
   async create(body) {
        const project = await dbContext.Projects.create(body)
        await project.populate('creator', 'name')
        return project
    }

}

export const projectsService = new ProjectsService()