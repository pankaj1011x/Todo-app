import React from "react";

const AddTaskButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className="flex gap-3 cursor-pointer">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          color="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <p className="text-white">Add a task</p>
    </div>
  );
};

export default AddTaskButton;
