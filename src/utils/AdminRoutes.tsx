import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/auth/Register";
import Product from "../pages/admin/product/Product";
import CreateProduct from "../pages/admin/product/CreateProduct";
import Supplier from "../pages/admin/supplier/Supplier";
import CreateSupplier from "../pages/admin/supplier/CreateSupplier";
import UpdateSupplier from "../pages/admin/supplier/UpdateSupplier";
import UpdateProduct from "../pages/admin/product/UpdateProduct";
import Cart from "../pages/admin/cart/Cart";
import Transaction from "../pages/admin/transaction/Transaction";

type props = {
  open: boolean;
  isLogin: boolean;
};
const AdminRoutes = ({ open, isLogin }: props) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        open ? "w-[calc(100%_-_16rem)]" : "w-full"
      } ml-auto bg-gray-100 min-h-screen mt-16 p-4`}
    >
      <Routes>
        <Route path="/" element={<div>Halo</div>} />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/admin" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLogin ? <Navigate to="/admin" /> : <Register />}
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute isLogin={isLogin}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* product */}
        <Route
          path="/admin/product"
          element={
            <PrivateRoute isLogin={isLogin}>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/product/create"
          element={
            <PrivateRoute isLogin={isLogin}>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/product/update/:id"
          element={
            <PrivateRoute isLogin={isLogin}>
              <UpdateProduct />
            </PrivateRoute>
          }
        />

        {/* supplier */}
        <Route
          path="/admin/supplier"
          element={
            <PrivateRoute isLogin={isLogin}>
              <Supplier />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/supplier/create"
          element={
            <PrivateRoute isLogin={isLogin}>
              <CreateSupplier />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/supplier/update/:id"
          element={
            <PrivateRoute isLogin={isLogin}>
              <UpdateSupplier />
            </PrivateRoute>
          }
        />

        {/* cart */}
        <Route
          path="/admin/cart"
          element={
            <PrivateRoute isLogin={isLogin}>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* transaction */}
        <Route
          path="/admin/transaction"
          element={
            <PrivateRoute isLogin={isLogin}>
              <Transaction />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
