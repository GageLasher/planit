import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController{
 constructor(){
     super('api/projects/:projectId/notes')
     this.router
     .use(Auth0Provider.getAuthorizedUserInfo)
     .post('', this.create)
     .get('', this.getAll)
     .delete('/:noteId', this.remove)
 }
 async create(req, res, next){
     try {
         req.body.creatorId = req.userInfo.id
         req.body.projectId = req.params.projectId
         const note = await notesService.create(req.body)
         res.send(note)
     } catch (error) {
         next(error)
     }
 }
 async getAll(req, res, next){
     try {
         req.body.projectId = req.params.projectId
         const notes = await notesService.getAll(req.params.projectId)
         res.send(notes)
     } catch (error) {
         next(error)
     }
 }
 async remove(req, res, next){
     try {
         req.body.creatorId = req.userInfo.id
         req.body.projectId = req.params.projectId
         req.body.id = req.params.noteId
         const message = await notesService.remove(req.body)
         res.send(message)
     } catch (error) {
         next(error)
     }
 }   
}