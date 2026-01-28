import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}
