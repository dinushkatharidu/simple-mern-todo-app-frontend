import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClipboardOutline } from "react-icons/io5";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/api/todos`, {
        text: newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`${API_URL}/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggling todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white/90 rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center tracking-tight">
          Task Manager
        </h1>

        <form
          onSubmit={addTodo}
          className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 rounded-lg shadow focus-within:ring-2 focus-within:ring-blue-300 transition"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 bg-transparent focus:ring-0 focus:outline-none"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            required
            aria-label="Add new todo"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shadow"
          >
            Add Task
          </button>
        </form>
        <div className="mt-6">
          {todos.length === 0 ? (
            <div className="text-center text-gray-400 flex flex-col items-center py-10">
              <IoClipboardOutline size={50} className="mb-2" />
              <span>No tasks yet. Add your first task!</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-blue-100 shadow-sm">
                      <input
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner bg-white"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        aria-label="Edit todo"
                      />
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="h-10 w-10 flex items-center justify-center bg-green-500 hover:bg-green-600 focus:bg-green-700 text-white rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                          aria-label="Save"
                        >
                          <MdOutlineDone size={22} />
                        </button>
                        <button
                          className="h-10 w-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 focus:bg-gray-400 text-gray-700 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                          onClick={() => setEditingTodo(null)}
                          aria-label="Cancel"
                        >
                          <IoClose size={22} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 shadow-sm transition group">
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={() => toggleTodo(todo._id)}
                          className={`h-7 w-7 flex-shrink-0 border-2 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 transition ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-blue-400 text-gray-400 hover:text-blue-500"
                          }`}
                          aria-label={
                            todo.completed
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        >
                          {todo.completed && <MdOutlineDone size={20} />}
                        </button>
                        <span
                          className={`truncate font-medium text-gray-800 transition select-text ${
                            todo.completed
                              ? "line-through text-gray-400"
                              : "group-hover:text-blue-700"
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          className="h-9 w-9 flex items-center justify-center text-blue-500 hover:text-blue-700 focus:text-blue-800 rounded-lg hover:bg-blue-50 focus:bg-blue-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                          onClick={() => startEditing(todo)}
                          aria-label="Edit"
                        >
                          <MdModeEditOutline size={19} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="h-9 w-9 flex items-center justify-center text-red-500 hover:text-red-700 focus:text-red-800 rounded-lg hover:bg-red-50 focus:bg-red-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                          aria-label="Delete"
                        >
                          <FaTrash size={17} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
