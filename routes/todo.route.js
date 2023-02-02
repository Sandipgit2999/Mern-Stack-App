const { Router } = require("express");
const { TodoModel } = require("../Models/todo.model");
const TodosController = Router();

TodosController.get("/:todoId", async (req, res) => {
  if (req.params) {
    const todos = await TodoModel.findOne({
      userId: req.body.userId,
      id: req.params.id,
    });
    res.send(todos);
  } else {
    const todos = await TodoModel.find({ userId: req.body.userId });
    res.send(todos);
  }
});

TodosController.get("/", async (req, res) => {
  console.log(req.params);
  console.log(req.query);

  const todos = await TodoModel.find({
    userId: req.body.userId,
    ...req.query,
  });
  res.send(todos);
});

TodosController.post("/create", async (req, res) => {
  const payload = req.body;

  if (payload.taskname && payload.status && payload.tag) {
    const new_todo = new TodoModel(payload);
    await new_todo.save();
    res.send({ msg: "todo added successfully" });
  } else {
    res.send({ msg: "please fill all the details" });
  }
});

TodosController.put("/:todoId", async (req, res) => {
  const payload = req.body;
  const { todoId } = req.params;
  const new_todo = await TodoModel.updateOne(
    { _id: todoId, userId: req.body.userId },
    {
      $set: payload,
    }
  );
  res.send({ msg: "successfully updated" });
});

TodosController.delete("/:todoId", async (req, res) => {
  const payload = req.body;
  const { todoId } = req.params;
  const new_todo = await TodoModel.deleteOne({
    _id: todoId,
    userId: req.body.userId,
  });
  res.send({ msg: "successfully deleted" });
});
module.exports = {
  TodosController,
};
