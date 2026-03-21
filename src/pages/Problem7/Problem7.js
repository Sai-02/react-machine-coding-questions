import Solution from "./components/Solution";

const Problem7 = () => {
  return (
    <div className="p-4">
      <h1>File Explorer</h1>

      <h2>Requirements</h2>
      <ul>
        <li>Render nested file/folder structure</li>
        <li>Folders → expand/collapse</li>
        <li>Files → leaf nodes</li>
        <li>Indentation based on depth</li>
      </ul>

      <h2>Core Features</h2>
      <ul>
        <li>Expand / Collapse folders</li>
        <li>Recursive rendering</li>
        <li>Folder (▶/▼) & File (📄) icons</li>
      </ul>

      <h2>Bonus (if time)</h2>
      <ul>
        <li>Add / Delete node</li>
        <li>Rename node</li>
        <li>Expand / Collapse all</li>
      </ul>

      <h2>Data Shape</h2>
      <pre className="bg-gray-100 p-2 rounded">
        {`{
  id: "1",
  name: "root",
  type: "folder",
  children: [...]
}`}
      </pre>

      <Solution />
    </div>
  );
};

export default Problem7;
