import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'please enter a valid email']
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User = mongoose.model('User', UserSchema);
export default User;

