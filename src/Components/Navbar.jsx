import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  // useNavigate is preferred over window.location
  // because it keeps navigation inside React Router without full page reload

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Await ensures logout completes before redirecting
      // Prevents navigation if signOut fails

      toast.success("Logged out successfully!");
      navigate("/");
      // Redirecting to login/home after successful logout
    } catch (error) {
      // Handling errors is important in async operations
      toast.error("Failed to logout. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl text-gray-200 font-semibold">Ansh Todo App</h1>

      <button
        onClick={handleLogout}
        className="bg-red-400 px-2 py-2 ml-4 rounded hover:bg-red-500 transition"
        // Using transition improves UX with smooth hover effect
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
