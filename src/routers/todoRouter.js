const express = require('express');
const Todo = require('../models/todoModel');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res, next) => {
  Todo.find()
    .select("_id completed description")
    .exec()
    .then(todos => {
      res.json({
        msg: "Listing all todos",
        count: todos.length,
        data: todos
      });
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  findById(id)
    .then(todo => {
      res.json({
        msg: `Requested todo number ${id}`,
        data: todo
      });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { description } = req.body;
  const todoData = {
    _id: new mongoose.Types.ObjectId(),
    description: description ? description : ''
  };
  const todo = new Todo(todoData);
  todo.save().then(result => {
    console.log('Created a todo successfully');
    res.json({
      msg: "Created new todo successfully",
      data: result
    });
  }).catch(next);
});

router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  Todo.update({ _id: id }, { $set: req.body }, { runValidators: true })
    .exec()
    .then(result => {
      res.json({
        msg: "Todo successfully updated",
        data: result
      });
    }).catch(next);
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Todo.remove({ _id: id }).exec().then(result => {
    res.json({
      msg: "Todo successfully deleted",
      data: result
    });
  }).catch(next);
});

async function findById(id) {
  try {
    const todo = await Todo.findById(id).exec()
    if (!todo) {
      const err = new Error("No todo with specified id was found");
      err.status = 404;
      throw err;
    }
    return todo;
  } catch (err) {
    if (err.name != "CastError") {
      throw err;
    }
    err = new Error("Invalid id");
    err.status = 400;
    throw err;
  }
}

module.exports = router;
