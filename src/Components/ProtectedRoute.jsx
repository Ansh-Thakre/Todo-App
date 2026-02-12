import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // Using Context avoids prop drilling and keeps auth state globally accessible

  // If user exists → allow access to protected component
  // If not → redirect to login page
  // Navigate is preferred over manual navigation because
  // it works declaratively inside routing logic
  return user ? (
    children
  ) : (
    <Navigate to="/" replace />
    // 'replace' prevents the user from going back
    // to the protected page using browser back button
  );
};

export default ProtectedRoute;
