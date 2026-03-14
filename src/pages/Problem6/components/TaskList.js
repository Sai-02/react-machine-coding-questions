import Task from "./Task";
const TaskList = ({ status, tasks, editTask, deleteTask }) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        console.log(e, e.dataTransfer, e.dataTransfer.getData("text/plain"));
        const id = e.dataTransfer.getData("text/plain");
        editTask(id, { status });
      }}
      className="w-72 min-h-[500px] bg-gray-100 p-4 rounded-xl"
    >
      <h2 className="capitalize text-center mb-4">
        {status} ({tasks.length})
      </h2>

      <div className="flex flex-col gap-4 justify-center">
        {tasks.map((task) => {
          return <Task key={tasks.id} task={task} deleteTask={deleteTask} editTask={editTask} />;
        })}
      </div>
    </div>
  );
};

export default TaskList;
