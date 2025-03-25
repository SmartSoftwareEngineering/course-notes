import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['todo', 'in-progress', 'done'],
      message: '{VALUE} is not supported as status'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default model('Task', taskSchema);