import TodoItem from "./TodoItem";

const TodoList = ({ todos, deleteTodo, toggleTodo, updateTodo }) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          // Using a stable unique id as key prevents unnecessary re-renders
          // and avoids React reconciliation issues

          todo={todo}
          // Passing the entire todo object keeps the component flexible
          // If more fields are added later, no need to change props structure

          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
          // Functions are passed down instead of handled here
          // This keeps TodoList purely presentational (no business logic)
        />
      ))}
    </div>
  );
};

export default TodoList;
