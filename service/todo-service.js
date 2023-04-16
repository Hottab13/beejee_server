const ObjectId = require("mongodb").ObjectId;

const Login = require("../models/login");
const Todo = require("../models/todo");
const ApiErrors = require("../exceptions/error-api");

const getAllTodosServise = async (params) => {
  const options = {
    page: params?.page || 1,
    limit: 3,
    sort: { userName: params.sort || -1 },
  };
  const todos = await Todo.paginate({}, options);
  return { todos };
};
const addTodoServise = async (dataAddTodo) => {
  if (!dataAddTodo) {
    throw ApiErrors.BadRequest(`Ошибка при создания задачи!`);
  }
  const todoCreate = await Todo.create({
    userName: dataAddTodo.userName,
    еmail: dataAddTodo.еmail,
    text: dataAddTodo.text,
    userName: dataAddTodo.userName,
    complited: false,
    editedAdmin: false,
  });
  return todoCreate;
};
const loginServise = async (data) => {
  if (!data) {
    throw ApiErrors.BadRequest(`Ошибка авторизации!`);
  }
  const login = await Login.findOne({
    login: data.login,
    pass: data.pass,
  });
  return login;
};
const removeTodoServise = async (id) => {
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка при удалении задачи!`);
  }
  const deleteTodo = await Todo.deleteOne({ _id: id });
  return deleteTodo;
};
const toggleTodoComplitedServise = async (id) => {
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка!`);
  }
  console.log(id);
  const res = await Todo.findByIdAndUpdate(
    id,
    {
      complited: true,
    },
    { new: true }
  );
  return res;
};
const editTextServise = async (params) => {
  if (!params) {
    throw ApiErrors.BadRequest(`Ошибка!`);
  }
  console.log(params);
  const res = await Todo.findByIdAndUpdate(
    params._id,
    {
      text: params.text,
      editedAdmin: true,
    },
    { new: true }
  );
  return res;
};
module.exports = {
  getAllTodosServise,
  addTodoServise,
  removeTodoServise,
  loginServise,
  toggleTodoComplitedServise,
  editTextServise,
};
