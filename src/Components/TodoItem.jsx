import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ todo, deleteTodo, toggleTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  // Local UI state controls edit mode (kept separate from global todo state)

  const [newText, setNewText] = useState(todo.text);
  // Initialize with existing todo text so editing feels seamless

  const handleUpdate = () => {
    if (!newText.trim()) return;
    // Prevent updating with empty/whitespace value

    updateTodo(todo.id, newText.trim());
    // Passing only required data (id + updated text)
    // Keeps component reusable and avoids unnecessary coupling

    setIsEditing(false);
    // Exit edit mode only after successful update trigger
  };

  return (
    <div className="bg-gray-700 p-3 rounded flex justify-between items-center">
      {isEditing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          // Controlled input ensures predictable editing behavior

          className="flex-1 p-1 rounded bg-gray-600 text-gray-200"
          autoFocus
          // autoFocus improves UX by focusing immediately when editing starts
        />
      ) : (
        <span
          className={`flex-1 transition ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
          // UI reflects state (completed) declaratively
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-3 ml-3">
        <button onClick={() => toggleTodo(todo.id, todo.completed)}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        {/* Passing current completed state allows parent to handle toggle logic cleanly */}

        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="text-green-400">
              Save
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setNewText(todo.text);
              }}
              className="text-red-400"
            >
              Cancel
            </button>
            {/* Resetting text on cancel avoids stale edits */}
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        )}

        <button onClick={() => deleteTodo(todo.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        {/* Only id is passed to keep action functions minimal and focused */}
      </div>
    </div>
  );
};

export default TodoItem;
