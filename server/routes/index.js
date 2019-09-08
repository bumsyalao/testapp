import Todo from '../controllers/TodoController';

module.exports = (app) => {
    app.get('/api', (req,res) => {
        res.send('Hello World');
    });
    //api to get all todos
    app.get('/api/v1/todos', Todo.getAllTodos);

    //api to create todo
    app.post('/api/v1/todo', Todo.createTodo);
    
    //api to edit todo
    app.put('/api/v1/todo/:id', Todo.editTodo);

    //api to delete todo
    app.delete('/api/v1/todo/:id', Todo.deleteTodo);
};
