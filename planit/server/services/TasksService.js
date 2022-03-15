import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TasksService{
async create(body){
    const task = await dbContext.Tasks.create(body)
    await task.populate('creator')
    return task
}
async getAll(id){
    const tasks = await dbContext.Tasks.find({projectId: id})
    return tasks
}
async update(update){
    const original = await dbContext.Tasks.findById(update.id)
    original.name = update.name ? update.name : original.name
    original.weight = update.weight != null ? update.weight : original.weight
    original.isComplete = update.isComplete ? update.isComplete : original.isComplete
    original.sprintId = update.sprintId !== "" ? update.sprintId : original.sprintId
    await original.save()
    await original.populate('sprint')
    return original
}
async remove(body){
    const taskToDelete = await dbContext.Tasks.findById(body.id)
    if(taskToDelete.creatorId.toString() !== body.creatorId){
        throw new Forbidden("first years cant enter forbidden forest")
    }
    await dbContext.Tasks.findByIdAndDelete(body.id)
    return "deleted"
}
}

export const tasksService = new TasksService()