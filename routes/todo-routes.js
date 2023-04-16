const Router = require("express");
const router = new Router();
const {
  getAllTodos,
  addTodo,
  removeTodo,
  login,
  toggleTodoComplited,
  editText,
} = require("../controllers/todo-controller");

router.post("/get-todos/", getAllTodos);
router.post("/add-todo/", addTodo);
router.post("/login/", login);
router.post("/togge-todo-complited/", toggleTodoComplited);
router.post("/edit-text/", editText);
router.delete("/remove-todo/", removeTodo);

module.exports = router;
