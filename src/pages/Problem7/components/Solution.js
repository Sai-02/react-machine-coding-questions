import React, { useReducer, useEffect } from "react";
import Folder from "./Folder";

const INITIAL_TREE = {
  id: crypto.randomUUID(),
  name: "root",
  type: "folder",
  children: [
    {
      id: crypto.randomUUID(),
      name: "File1",
      type: "file",
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "rename": {
      if (state.id === action.payload.id) {
        return { ...state, name: action.payload.name };
      }
      if (!state.children) return state;
      return {
        ...state,
        children: state.children.map((val) => reducer(val, action)),
      };
    }

    case "delete": {
      if (state.id === action.payload.id) return null;
      if (!state.children) return state;
      return {
        ...state,
        children: state.children
          .map((val) => reducer(val, action))
          .filter(Boolean),
      };
    }

    case "add": {
      if (state.id === action.payload.parentId) {
        const newNode =
          action.payload.type === "folder"
            ? { id: crypto.randomUUID(), name: action.payload.name, type: "folder", children: [] }
            : { id: crypto.randomUUID(), name: action.payload.name, type: "file" };
        return { ...state, children: [...state.children, newNode] };
      }
      if (!state.children) return state;
      return {
        ...state,
        children: state.children.map((val) => reducer(val, action)),
      };
    }

    default:
      return state;
  }
}

function getFromLocalStorage() {
  try {
    const saved = localStorage.getItem("folder-tree");
    return saved ? JSON.parse(saved) : INITIAL_TREE;
  } catch {
    return INITIAL_TREE;
  }
}

const Solution = () => {
  const [tree, dispatch] = useReducer(reducer, null, getFromLocalStorage);

  // Sync to localStorage on every tree change
  useEffect(() => {
    localStorage.setItem("folder-tree", JSON.stringify(tree));
  }, [tree]);

  return (
    <div className="mt-5">
      <Folder node={tree} dispatch={dispatch} />
    </div>
  );
};

export default Solution;