import AdminUsers from '../controllers/adminUsers';

module.exports = (app) => {
    app.get('/api', (req,res) => {
        res.send('Hello World');
    });
    //api to register admin user
    app.post('/api/v1/adminuser/register', AdminUsers.register);
    //api to login admin user
    app.post('/api/v1/adminuser/login', AdminUsers.login);
};
