import users from '../models/users';
import validator from 'validator';

class Users {
  createUser(req, res) {
    if(req.body.email && validator.isEmail(req.body.email)) {
      users.findOne({ email: req.body.email }).exec((err, existingUser) => {
        if(existingUser) {
          return res.status(409).send({
            success: false,
            error: 'existing user',
            message: 'A user with the email already exist'
          });
        }
        const newUser = new users(req.body.email);
        newUser.save((err) => {
          if(err){
            return res.status(400).send({
              success: false,
              error: 'Bad request',
              message: 'There was an error creating User'
            });
          }
          //return new user
          return res.ststus(201).send({
            success: true,
            message: 'User has been created succesfully',
            newUser
          });
        });
      });
    }
    else {
      return res.status(400).send({
        success: false,
        error: 'Bad Request',
        message: 'Please enter a valid email'
      });
    }
  }

  // retrieveUsers(req, res) {
    // users.f
  // }

  deleteUser(req, res){
    user.findOne({ _id: req.params.userId })
    .exec()
    .then((foundUser) => {
      users.findByIdAndRemove({ _id: req.params.userId }, (err) => {
        if(err) {
          return res.status(500).send({
            success: false,
            error: 'delete error',
            message: 'There was an error while deleting user, please try again later'
          });
        }
        return res.status(200).send({
          success: true,
          message: 'User has been deleted succesfully'
        });
      });
    }).catch(error =>
      res.status(400).send({
        success: false,
        error: error.messae,
        message: 'Bad Request'
      }));
  }
  
}