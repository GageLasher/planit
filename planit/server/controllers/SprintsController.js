import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController{
    constructor(){
        super('api/projects/:projectId/sprints')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createSprint)

    }
    async createSprint(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const sprint = await sprintsService.createSprint(req.body)
            res.send(sprint)
        } catch (error) {
            next(error)
        }
    }
}