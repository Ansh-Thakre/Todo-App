import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");
  // Local state keeps form controlled and predictable

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevents default form reload behavior (SPA best practice)

    if (!text.trim()) return;
    // Basic validation to avoid empty or whitespace-only todos

    addTodo(text.trim());
    // Passing cleaned input ensures consistent data in database/state

    setText("");
    // Resetting input improves UX after successful submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full"
    >
      <input
        type="text"
        placeholder="Enter a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 rounded bg-gray-700 text-gray-200 focus:outline-none w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 px-4 py-3 rounded hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
