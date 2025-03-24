import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default model('Project', projectSchema);