import { useReducer, useMemo, useState, useCallback, useEffect } from "react";
import { STATUS } from "../constant";
import AddTaskModal from "./AddTaskModal";
import TaskList from "./TaskList";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTask":
      return {
        tasks: [...state.tasks, action.payload],
      };

    case "editTask": {
      const { id, updatedTask } = action.payload;

      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      );

      return {
        tasks: newTasks,
      };
    }

    case "deleteTask": {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload,
      );

      return {
        tasks: updatedTasks,
      };
    }

    default:
      return state;
  }
};

const initialState = () => {
  const savedTasks = localStorage.getItem("tasks");

  return {
    tasks: savedTasks ? JSON.parse(savedTasks) : [],
  };
};

const Solution = () => {
  const [state, dispatch] = useReducer(reducer, {}, initialState);

  const [shouldOpenAddTask, setShouldOpenAddTask] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  const inProgressTasks = useMemo(() => {
    return (
      state.tasks?.filter((task) => task.status === STATUS.IN_PROGRESS) || []
    );
  }, [state.tasks]);

  const todoTasks = useMemo(() => {
    return state.tasks?.filter((task) => task.status === STATUS.TO_DO) || [];
  }, [state.tasks]);

  const doneTasks = useMemo(() => {
    return state.tasks?.filter((task) => task.status === STATUS.DONE) || [];
  }, [state.tasks]);

  const addTask = useCallback((task) => {
    dispatch({
      type: "addTask",
      payload: task,
    });
    setShouldOpenAddTask(false);
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({
      type: "deleteTask",
      payload: id,
    });
  }, []);

  const editTask = useCallback((id, task) => {
    dispatch({
      type: "editTask",
      payload: {
        id,
        updatedTask: task,
      },
    });
  }, []);

  const openAddTaskModal = () => {
    setShouldOpenAddTask(true);
  };

  return (
    <div>
      <div>
        <button
          className="bg-blue-500 rounded text-white py-1 px-2"
          onClick={openAddTaskModal}
        >
          Add Task
        </button>

        {shouldOpenAddTask && (
          <AddTaskModal
            addTask={addTask}
            shouldOpen={shouldOpenAddTask}
            closeModal={() => setShouldOpenAddTask(false)}
          />
        )}
      </div>

      <div className="flex justify-around">
        <TaskList
          tasks={todoTasks}
          status={STATUS.TO_DO}
          deleteTask={deleteTask}
          editTask={editTask}
        />

        <TaskList
          tasks={inProgressTasks}
          status={STATUS.IN_PROGRESS}
          deleteTask={deleteTask}
          editTask={editTask}
        />

        <TaskList
          tasks={doneTasks}
          status={STATUS.DONE}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
};

export default Solution;
