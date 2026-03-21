import { faFile, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

const File = ({ file, dispatch }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(file.name);
  const renameInputRef = useRef(null);

  useEffect(() => {
    if (isRenaming) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [isRenaming]);

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter" && renameValue.trim()) {
      dispatch({
        type: "rename",
        payload: { id: file.id, name: renameValue.trim() },
      });
      setIsRenaming(false);
    }
    if (e.key === "Escape") {
      setRenameValue(file.name);
      setIsRenaming(false);
    }
  };

  const deleteFile = () => {
    dispatch({ type: "delete", payload: { id: file.id } });
  };

  return (
    <div className="hover:bg-gray-100 flex items-center px-2 py-1 w-72">
      <span className="text-xs mr-4 text-gray-500">
        <FontAwesomeIcon icon={faFile} />
      </span>

      {isRenaming ? (
        <input
          ref={renameInputRef}
          type="text"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={handleRenameKeyDown}
          onBlur={() => {
            setRenameValue(file.name);
            setIsRenaming(false);
          }}
          className="border grow text-sm px-1"
        />
      ) : (
        <span className="grow">{file.name}</span>
      )}

      <span className="ml-4" onClick={() => setIsRenaming(true)} title="Rename">
        <FontAwesomeIcon className="cursor-pointer text-xs" icon={faPencil} />
      </span>
      <span className="ml-4" onClick={deleteFile} title="Delete">
        <FontAwesomeIcon className="cursor-pointer text-xs" icon={faTrash} />
      </span>
    </div>
  );
};

export default File;
