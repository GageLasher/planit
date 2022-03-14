import { Schema } from "mongoose";

export const SprintSchema = new Schema({
    name: {type: String, required: true},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project'},
    
})