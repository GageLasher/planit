import { Schema } from "mongoose";

export const SprintSchema = new Schema({
    name: {type: String, required: true},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Profile', required: true}

    
},
{ timestamps: true, toJSON: { virtuals: true } }
)

SprintSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
  })