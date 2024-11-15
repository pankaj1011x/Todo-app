import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onClose, fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function onSubmitHandler() {
    const data = {
      title,
      description,
    };
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };
    axios
      .post("http://localhost:3000/api/v1/todo", data, { headers })
      .then((res) => {
        console.log(res.data);
        setTitle("");
        setDescription("");
        fetchTodos();
      })
      .catch((err) => {
        console.log("error while creating todo", err);
      });
  }
  return (
    <div className="bg-black w-full max-w-md p-4 rounded-lg border border-gray-700 shadow-md mt-5">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-black text-white pl-5 mb-3 w-full focus:outline-none"
        type="text"
        placeholder="Task name"
      />
      <br />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-black text-white pl-5 w-full focus:outline-none"
        type="text"
        placeholder="Description"
      />
      <br />
      <div className="flex justify-end mt-5">
        <button
          onClick={onClose}
          type="button"
          className="text-black bg-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Cancel
        </button>
        <button
          onClick={onSubmitHandler}
          type="button"
          className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Add task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
