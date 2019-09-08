import mongoose from 'mongoose';
import validator from 'validator';


const TodosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    modified: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


const Todos = mongoose.model('Todos', TodosSchema);

export default Todos;

