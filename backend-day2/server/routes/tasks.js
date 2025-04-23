const express = require("express");
const router = express.Router();
const toCsv = require("../utils/toCsv");

let tasks = [];
let idCounter = 1;

router.post("/tasks", (req, res) => {
  const { title } = req.body;
  const task = {
    id: idCounter++,
    title,
    status: "todo",
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.get("/tasks", (req, res) => {
  const { status } = req.query;
  const filtered = status ? tasks.filter((t) => t.status === status) : tasks;
  res.status(200).json(filtered);
});

router.patch("/tasks/:id", (req, res) => {
  const { status } = req.body;

  const validStatuses = ["todo", "in-progress", "done"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid Status" });
  }

  const task = tasks.find((t) => t.id == req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;

  res.json(task);
});

router.get("/tasks.csv", (req, res) => {
  const csv = toCsv(tasks);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="tasks.csv"');
  res.send(csv);
});

module.exports = router;
