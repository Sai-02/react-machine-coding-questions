import { useState } from "react";
import { STATUS } from "../constant";

const AddTaskModal = ({ addTask, shouldOpen, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(STATUS.TO_DO);
  const [errors, setErrors] = useState({});

  const getUniqueId = () => Math.random().toString(36).slice(2);

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (description.length > 200) {
      newErrors.description = "Description must be < 200 chars";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const add = () => {
    if (!validate()) return;

    addTask({
      title,
      description,
      status,
      id: getUniqueId(),
    });

    // reset
    setTitle("");
    setDescription("");
    setStatus(STATUS.TO_DO);
    setErrors({});
  };

  if (!shouldOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow-lg w-80 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Add Task</h2>

        {/* Title */}
        <div>
          <input
            type="text"
            className="border w-full p-1 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            className="border w-full p-1 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <select
            className="border w-full p-1 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={STATUS.TO_DO}>{STATUS.TO_DO}</option>
            <option value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</option>
            <option value={STATUS.DONE}>{STATUS.DONE}</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-2 py-1 border rounded"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={add}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;