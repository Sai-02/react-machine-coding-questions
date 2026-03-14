import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STATUS } from "../constant";

const statusStyles = {
  [STATUS.TO_DO]: {
    card: "bg-yellow-50 border-yellow-300",
    badge: "bg-yellow-200 text-yellow-800",
  },
  [STATUS.IN_PROGRESS]: {
    card: "bg-blue-50 border-blue-300",
    badge: "bg-blue-200 text-blue-800",
  },
  [STATUS.DONE]: {
    card: "bg-green-50 border-green-300",
    badge: "bg-green-200 text-green-800",
  },
};

const Task = ({ task, deleteTask, editTask }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const saveTitle = () => {
    editTask(task.id, { title });
    setIsEditingTitle(false);
  };

  const saveDescription = () => {
    editTask(task.id, { description });
    setIsEditingDesc(false);
  };

  const style = statusStyles[task.status];

  return (
    <div
      className={`shadow-md border rounded-lg p-4 flex flex-col gap-2 w-64 min-h-40 
      transition hover:shadow-xl cursor-grab ${style.card}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${style.badge}`}
        >
          {task.status}
        </span>

        <FontAwesomeIcon
          className="cursor-pointer text-gray-500 hover:text-red-500"
          onClick={() => deleteTask(task.id)}
          icon={faTrash}
        />
      </div>

      {/* Title */}
      {isEditingTitle ? (
        <input
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveTitle();
          }}
        />
      ) : (
        <div
          className="font-semibold text-gray-800 cursor-pointer"
          onClick={() => setIsEditingTitle(true)}
        >
          {task.title}
        </div>
      )}

      {/* Description */}
      {isEditingDesc ? (
        <textarea
          className="border rounded px-2 py-1 text-sm resize-none focus:outline-none focus:ring"
          value={description}
          autoFocus
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={saveDescription}
        />
      ) : (
        <div
          className="text-sm text-gray-600 cursor-pointer line-clamp-3"
          onClick={() => setIsEditingDesc(true)}
        >
          {task.description || "No description"}
        </div>
      )}
    </div>
  );
};

export default Task;
