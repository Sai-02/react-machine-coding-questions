import Solution from "./components/Solution";

const Problem5 = () => {
  return (
    <div className="p-4">
      <h1 className="">Problem 5</h1>
      <div>
        <h3>Task</h3>
        <p>
          Build a <strong>Task Flow Board</strong> application with
          drag-and-drop functionality to manage tasks across different stages.
        </p>

        <h4>Stages</h4>
        <ul className="flex gap-2">
          <li>Todo</li>
          <li>In Progress</li>
          <li>Done</li>
        </ul>

        <h4>Core Features</h4>
        <ul>
          <li>Add new tasks</li>
          <li>Edit task titles using inline editing</li>
          <li>Delete tasks</li>
          <li>Move tasks between columns via drag-and-drop</li>
          <li>Tasks can move between stages</li>
        </ul>

        <ul>
          <li>Display total count of tasks in each column header</li>
          <li>Cache task data (e.g., using local storage)</li>
          <li>Allow  movement of tasks (Done → In Progress → Todo)</li>
        </ul>
      </div>
      <Solution />
    </div>
  );
};

export default Problem5;
