import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotfoundPage from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={2000} />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Navbar />
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
