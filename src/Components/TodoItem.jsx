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
    <>
      <div className="bg-gray-700 p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        {isEditing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-600 text-gray-200 w-full sm:w-auto"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 transition wrap-break-word ${
              todo.completed ? "line-through text-gray-400" : "text-gray-100"
            }`}
          >
            {todo.text}
          </span>
        )}

        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:ml-3">
          <button
            onClick={() => toggleTodo(todo.id, todo.completed)}
            className="p-1 hover:text-green-400 transition"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>

          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="text-green-400 p-1 hover:text-green-300 transition"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewText(todo.text);
                }}
                className="text-red-400 p-1 hover:text-red-300 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="p-1 hover:text-yellow-400 transition"
              onClick={() => setIsEditing(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          )}

          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1 hover:text-red-500 transition"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
