import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";

type props = {
  isLogin: boolean;
  open: boolean;
};
const UserRoutes = ({ isLogin, open }: props) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        open ? "w-[calc(100%_-_16rem)]" : "w-full"
      } ml-auto bg-gray-100 min-h-screen mt-16 p-4`}
    >
      <Routes>
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLogin ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/" element={<div>Halo</div>} />
        <Route
          path="/admin"
          element={
            <PrivateRoute isLogin={isLogin}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default UserRoutes;
