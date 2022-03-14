import { Schema } from "mongoose";

export const NoteSchema = new Schema({
    body: {type: String, required: true},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'},
    taskId: {type: Schema.Types.ObjectId, ref: 'Task'},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Profile', required: true}
    

    
},
{ timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
  })