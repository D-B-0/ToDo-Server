const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  completed: { type: Boolean, default: false },
  description: { type: String, required: [true, "Must specify a description"] }
});

module.exports = mongoose.model('Todo', todoSchema);
