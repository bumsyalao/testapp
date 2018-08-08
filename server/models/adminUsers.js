import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const SALT_WORK_FACTOR = 10;

const AdminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'please enter a valid email']
    },
    password: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

AdminUserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

AdminUserSchema.methods.comparePassword = function (candidatePassword, callBack) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};

const AdminUser = mongoose.model('User', AdminUserSchema);
export default AdminUser;

