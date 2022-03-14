import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectsService } from "../services/ProjectsService";
import BaseController from "../utils/BaseController";

export class ProjectsController extends BaseController {
    constructor(){
        super('api/projects')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createProject)
        .get('', this.getProjects)
        .get('/:id', this.getProject)
        .delete('/:id', this.remove)
    }
    async createProject(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const project = await projectsService.create(req.body)
            res.send(project)
        } catch (error) {
            next(error)
        }
    }
    async getProjects(req, res, next){
        try {
            const projects = await projectsService.getProjects(req.query)
            res.send(projects)
        } catch (error) {
            next(error)
        }
    }
    async getProject(req, res, next){
        try {
            const project = await projectsService.getProject(req.params.id)
            res.send(project)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next){
        try {
            
            const message = await projectsService.remove(req.params.id, req.userInfo.id )
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}