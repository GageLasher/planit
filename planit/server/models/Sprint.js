import { Schema } from "mongoose";

export const SprintSchema = new Schema({
    name: {type: String, required: true},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Profile', required: true},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'}

    
},
{ timestamps: true, toJSON: { virtuals: true } }
)

SprintSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Profile',
    justOne: true
  })