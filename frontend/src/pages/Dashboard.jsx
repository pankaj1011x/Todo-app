import React, { useEffect, useState } from "react";
import AddTaskButton from "../components/AddtaskButton";
import TaskForm from "../components/TaskForm";
import EditTaskForm from "../components/EditTaskForm";
import axios from "axios";

const Dashboard = () => {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState();
  const [isEditTaskVisible, setIsEditTaskVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  const authToken = localStorage.getItem("authToken");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/todo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos(res.data.todos);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setIsEditTaskVisible(true);
  };

  const toggleTodoStatus = async (todo) => {
    try {
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, done: !todo.done } : t
        )
      );

      const updatedTodo = { done: !todo.done };
      await axios.put(
        `http://localhost:3000/api/v1/todo/${todo.id}`,
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      fetchTodos();
    } catch (error) {
      console.error("Failed to update todo status", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center py-4">
      <div className="bg-black w-full max-w-2xl p-8 rounded-lg">
        <div className="text-white font-extrabold text-3xl mb-5">Today</div>

        <AddTaskButton onClick={() => setIsAddTaskVisible(true)} />

        {isAddTaskVisible && (
          <TaskForm
            onClose={() => setIsAddTaskVisible(false)}
            fetchTodos={fetchTodos}
          />
        )}
        {isEditTaskVisible && selectedTodo && (
          <EditTaskForm
            todo={selectedTodo}
            onClose={() => setIsEditTaskVisible(false)}
            fetchTodos={fetchTodos}
          />
        )}

        <div className="mt-6">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white text-black p-4 rounded-md mb-4 shadow-md flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    checked={todo.done}
                    type="checkbox"
                    onChange={() => toggleTodoStatus(todo)}
                    className="w-5 h-5 mr-3 accent-black rounded-md"
                  />
                  <div className="flex flex-col">
                    <h3
                      className={`font-bold ${
                        todo.done ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <p
                      className={`${
                        todo.done ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
