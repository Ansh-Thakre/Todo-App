import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import FilterBar from "../Components/FilterBar";

const TodoPage = () => {
  const { user } = useContext(AuthContext);
  // AuthContext provides currently logged-in user
  // Keeps auth logic centralized and avoids prop drilling

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const todosRef = collection(db, "todos");
  // Keeping collection reference outside useEffect
  // avoids recreating it unnecessarily inside snapshot logic

  useEffect(() => {
    if (!user) return;
    // Safety guard: ensures we don’t access user.uid before auth loads

    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      const userTodos = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((todo) => todo.uid === user.uid);
      // Filtering client-side works, but in production
      // this should be replaced with Firestore query (where("uid", "==", user.uid))
      // to avoid downloading unnecessary data

      setTodos(userTodos);
    });

    // Real-time listener cleanup prevents memory leaks
    return () => unsubscribe();
  }, [user]);
  // Adding user as dependency ensures listener updates correctly
  // if auth state changes

  const addTodo = async (text) => {
    if (!text.trim()) return toast.error("Todo cannot be empty");

    try {
      await addDoc(todosRef, {
        text: text.trim(),
        completed: false,
        uid: user.uid,
      });
      // Storing uid enforces user-level data separation

      toast.success("Todo added!");
    } catch (error) {
      toast.error("Failed to add todo");
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      toast.success("Deleted!");
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await updateDoc(doc(db, "todos", id), {
        completed: !completed,
      });
      // Updating only required field keeps write operation efficient

      toast.success("Updated!");
    } catch (error) {
      toast.error("Update failed");
      console.error(error);
    }
  };

  const updateTodo = async (id, newText) => {
    if (!newText.trim()) return;

    try {
      await updateDoc(doc(db, "todos", id), {
        text: newText.trim(),
      });
      // Trimmed text ensures clean database values

      toast.success("Updated!");
    } catch (error) {
      toast.error("Update failed");
      console.error(error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    // Derived state instead of storing separate filtered state
    // avoids duplication and keeps data source single
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
        <TodoForm addTodo={addTodo} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
};

export default TodoPage;
