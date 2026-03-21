import React, { useState, useRef, useEffect } from "react";
import File from "./File";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faFileCirclePlus,
  faFolder,
  faFolderPlus,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const Folder = ({ node, dispatch }) => {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeType, setNewNodeType] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);

  const addInputRef = useRef(null);
  const renameInputRef = useRef(null);

  // Auto-focus add input when it appears
  useEffect(() => {
    if (showInput) addInputRef.current?.focus();
  }, [showInput]);

  // Auto-focus rename input when it appears
  useEffect(() => {
    if (isRenaming) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select(); // select all text for quick replace
    }
  }, [isRenaming]);

  const toggleOpen = () => setOpen((prev) => !prev);

  const add = (type) => {
    setShowInput(true);
    setNewNodeType(type);
    setOpen(true);
  };

  const handleAddKeyDown = (e) => {
    if (e.key === "Enter" && newNodeName.trim()) {
      dispatch({
        type: "add",
        payload: { name: newNodeName.trim(), parentId: node.id, type: newNodeType },
      });
      resetInput();
    }
    if (e.key === "Escape") resetInput();
  };

  const resetInput = () => {
    setNewNodeName("");
    setShowInput(false);
    setNewNodeType("");
  };

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter" && renameValue.trim()) {
      dispatch({
        type: "rename",
        payload: { id: node.id, name: renameValue.trim() },
      });
      setIsRenaming(false);
    }
    if (e.key === "Escape") {
      setRenameValue(node.name);
      setIsRenaming(false);
    }
  };

  const deleteNode = () => {
    dispatch({ type: "delete", payload: { id: node.id } });
  };

  return (
    <div>
      <h6 className="text-md capitalize hover:bg-gray-200 w-80 min-w-fit flex items-center p-1 px-2">
        <span className="mr-4 text-xs text-gray-500">
          <FontAwesomeIcon icon={faFolder} />
        </span>

        {isRenaming ? (
          <input
            ref={renameInputRef}
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleRenameKeyDown}
            onBlur={() => {
              setRenameValue(node.name);
              setIsRenaming(false);
            }}
            className="border grow text-sm px-1"
          />
        ) : (
          <span className="grow">{node.name}</span>
        )}

        <span className="ml-4" onClick={() => setIsRenaming(true)} title="Rename">
          <FontAwesomeIcon className="cursor-pointer" icon={faPencil} />
        </span>
        <span className="ml-4" onClick={() => add("folder")} title="Add folder">
          <FontAwesomeIcon className="cursor-pointer" icon={faFolderPlus} />
        </span>
        <span className="ml-4" onClick={() => add("file")} title="Add file">
          <FontAwesomeIcon className="cursor-pointer" icon={faFileCirclePlus} />
        </span>
        <span className="ml-4" onClick={deleteNode} title="Delete">
          <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
        </span>
        <span className="ml-4" onClick={toggleOpen}>
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={open ? faChevronUp : faChevronDown}
          />
        </span>
      </h6>

      <ul className="pl-4">
        {open &&
          node?.children?.map((childNode) =>
            childNode.type === "folder" ? (
              <li key={childNode.id}>
                <Folder node={childNode} dispatch={dispatch} />
              </li>
            ) : (
              <li key={childNode.id}>
                <File file={childNode} dispatch={dispatch} />
              </li>
            )
          )}

        {showInput && (
          <li>
            <input
              ref={addInputRef}
              type="text"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              onKeyDown={handleAddKeyDown}
              onBlur={resetInput}
              placeholder={`New ${newNodeType}...`}
              className="border w-72 px-1 text-sm"
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Folder;