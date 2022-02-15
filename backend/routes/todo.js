import Express from "express";
const router = Express.Router();

import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "./../controller/todo.js";

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
