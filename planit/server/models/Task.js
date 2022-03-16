import { Schema } from "mongoose";

export const TaskSchema = new Schema({
    name: {type: String, required: true},
    weight: {type: Number, required: true},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'},
    sprintId: {type: Schema.Types.ObjectId, ref: 'Sprint'},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Profile', required: true},
    isComplete: {type: Boolean, default: true}

    
},
{ timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
  })
  TaskSchema.virtual('sprint', {
    localField: 'sprintId',
    foreignField: '_id',
    justOne: true,
    ref: 'Sprint'
  })