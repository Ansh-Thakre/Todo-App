import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Creating a global auth context
// This allows any component in the app to access auth state
// without prop drilling
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // loading is important because Firebase takes time
  // to check if user session already exists (on refresh)

  useEffect(() => {
    // Firebase listener to track authentication state changes
    // This runs once on mount and listens for login/logout events
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // We set loading to false only after Firebase confirms auth state
      // Prevents UI flicker and incorrect redirects
    });

    // Cleanup subscription on unmount
    // Prevents memory leaks in larger applications
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {/* 
        Rendering children only after auth state is resolved.
        This avoids protected routes redirecting before Firebase finishes checking.
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
