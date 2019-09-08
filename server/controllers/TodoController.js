import Todos from '../models/Todos';

class Todo {

  //get all todos
  getAllTodos(req, res) {
    Todos.find().exec((err, allTodos) => {
      //return error if any
      if (err) {
        return res.status(404).send({
          success: false,
          message: err.message
        });
      }
      //return sucess if sucessful
      return res.status(200).send({
        sucess: true,
        message: 'Found all todos',
        allTodos
      });
    });
  }

  //create todo
  createTodo(req, res) {
    if (req.body.title.trim() && req.body.description.trim()) {

      //check if todo title already exist
      Todos.findOne({
        title: req.body.title
      }).exec((err, existingTodo) => {
        if (existingTodo) {
          return res.status(409).send({
            success: false,
            message: 'title must be unique'
          });
        }
        const todo = {
          title: req.body.title,
          description: req.body.description,
          isDone: req.body.isDone
        }
        //Add new Todo to todo model
        const newTodo = new Todos(todo);

        //save new todo
        newTodo.save((err) => {
          if (err) {
            return res.status(400).send({
              success: false,
              message: err.message
            })
          }
          return res.status(201).send({
            success: true,
            message: 'Todo succesfully created',
            newTodo
          })
        })

      })
    }
  }

  //update todo
  editTodo(req, res) {
    Todos.findOne({
        _id: req.params.id
      })
      .exec()
      .then((foundTodo) => {
        if (
          req.body.title &&
          req.body.description
        ) {
          foundTodo.title = req.body.title;
          foundTodo.description = req.body.description;
          foundTodo.isDone = req.body.isDone;
          foundTodo.modified = true;
          foundTodo.save((err) => {
            if (err) {
              return res.status(400).send({
                success: false,
                message: 'title must be unique'
              });
            }
            return res.status(200).send({
              success: true,
              message: 'Your todo has been updated succesfully',
              foundTodo
            });
          });
        } else {
          return res.status(400).send({
            success: false,
            message: 'All fields are required'
          });
        }
      })
      .catch(err =>
        res.status(400).send({
          success: false,
          error: 'Database Error',
          message: err.message
        })
      );
  }

  //delete todo
  deleteTodo(req, res) {
    Todos.findOne({
        _id: req.params.id
      })
      .exec()
      .then(() => {
        Todos.findByIdAndRemove({
          _id: req.params.id
        }, (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: 'There was an error while deleting todo, please try again later'
            });
          }
          return res.status(200).send({
            success: true,
            message: 'todo has been deleted succesfully'
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

export default new Todo();