import { Auth0Provider } from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";
import BaseController from "../utils/BaseController";

export class TasksController extends BaseController{
    constructor(){
        super('api/projects/:projectId/tasks')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .get('', this.getAll)
        .put('/:taskId', this.update)
        .delete('/:taskId', this.remove)
    }
    async create(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            req.body.isComplete = false
            req.body.projectId = req.params.projectId
            const task = await tasksService.create(req.body)
            res.send(task)
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id

            
            const task = await tasksService.getAll(req.params.projectId)
            res.send(task)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            req.body.id = req.params.taskId
            const updated = await tasksService.update(req.body)
            res.send(updated)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            req.body.projectId = req.params.projectId
            req.body.id = req.params.taskId
            const message = await tasksService.remove(req.body)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}