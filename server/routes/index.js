import Users from '../controllers/UsersController';
import auth from '../middleware/auth';

module.exports = (app) => {
    app.get('/api', (req,res) => {
        res.send('Hello World');
    });
    //api to register admin user
    app.post('/api/v1/register', Users.register);
    //api to login admin user
    app.post('/api/v1/login', Users.login);
    //api to create user
    app.post('/api/v1/createuser', auth.checkToken, Users.createUser);
    //api to get all users
    app.get('/api/v1/users/:selectPage', auth.checkToken, Users.retrieveUsers);
    //api to delete user
    app.delete('/api/v1/user/:userId', auth.checkToken, Users.deleteUser);
};
