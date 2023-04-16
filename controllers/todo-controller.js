const {
  getAllTodosServise,
  addTodoServise,
  removeTodoServise,
  loginServise,
  toggleTodoComplitedServise,
  editTextServise,
} = require("../service/todo-service");

const getAllTodos = async (req, res, next) => {
  try {
    const params = req.body;
    const todos = await getAllTodosServise(params);
    return res.json(todos);
  } catch (e) {
    next(e);
  }
}; 
const login = async (req, res, next) => {
  try {
    const params = req.body;
    const login = await loginServise(params);
    return res.json(login);
  } catch (e) {
    next(e);
  }
};
const addTodo = async (req, res, next) => {
  try {
    const dataAddTodo = req.body;
    const todos = await addTodoServise(dataAddTodo);
    return res.json(todos);
  } catch (e) {
    next(e);
  }
};
const removeTodo = async (req, res, next) => {
  try {
    const {_id} = req.body;
    const deleteTodo = await removeTodoServise(_id);
    return res.json(deleteTodo);
  } catch (e) {
    next(e);
  }
}; 
const toggleTodoComplited = async (req, res, next) => {
  try {
    const {_id} = req.body;
    const res = await toggleTodoComplitedServise(_id);
    return res.json(res);
  } catch (e) {
    next(e);
  }
}; 
const editText = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await editTextServise(data);
    return res.json(response);
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getAllTodos,
  addTodo,
  removeTodo,
  login,
  toggleTodoComplited,
  editText,
};
