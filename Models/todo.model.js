const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  taskname: { type: String, requred: true },
  status: { type: String, default: "pending" },
  tag: { type: String },
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = {
  TodoModel,
};
