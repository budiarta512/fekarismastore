import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { showOrderByUserId } from "../redux/features/orderSlice";

type props = {
  open: boolean;
  setOpen: (a: any) => void;
};
const AdminLayout = ({ open, setOpen }: props) => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.user?._id);
  const cartCount = useAppSelector((state) => state.order.detailData);
  const dispatch = useAppDispatch();
  const refreshCart = useAppSelector((state) => state.cart.refreshCart);

  useEffect(() => {
    dispatch(showOrderByUserId(userId || ""));
  }, [userId, refreshCart]);

  const logoutHandle = () => {
    navigate("/");
    logout();
    window.location.reload();
  };
  return (
    <>
      {/* navbar */}
      <div className="fixed right-0 top-0 z-30 w-full bg-white shadow-md h-16">
        <div className="flex justify-between items-center h-full mx-6">
          <ul className="flex justify-start items-center w-full h-full gap-2">
            <img className="w-36" src={logo} alt="logo" />
            <button
              className="bg-red-500/20 shadow-none hover:shadow-none hover:bg-primary text-red-500 hover:text-white rounded-md py-1 px-2"
              onClick={() => setOpen(!open)}
            >
              <i className="bi bi-list text-xl"></i>
            </button>
          </ul>
          <ul className="flex gap-2 justify-end items-center w-auto sm:w-full h-full">
            <li className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 hover:bg-red-200 text-lg text-gray-600">
              <NavLink
                className="w-full h-full flex items-center justify-center"
                to={"/admin/cart"}
              >
                <i className="bi bi-cart relative">
                  <span className="px-1 rounded-full text-white bg-red-500 text-xs absolute -right-2.5 -top-2">
                    {cartCount?.carts.length}
                  </span>
                </i>
              </NavLink>
            </li>
            <li className="">
              <button className="flex text-lg text-gray-600 bg-red-100">
                <div className="flex h-10 w-10 items-center justify-center">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="h-10 pr-2 items-center justify-center sm:flex hidden">
                  <p className="text-sm">person name</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* sidebar */}
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          open ? "w-[16rem]" : "w-0"
        } bg-white overflow-hidden fixed min-h-screen`}
      >
        <div className="flex items-center justify-center"></div>
        <ul className="flex flex-col py-4">
          <li className="mt-16">
            <NavLink
              to="/admin"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-house-door"></i>
              </span>
              <span className="text-sm font-medium">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/product"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-bag"></i>
              </span>
              <span className="text-sm font-medium">Product</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/transaction"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-list-check"></i>
              </span>
              <span className="text-sm font-medium">Transaksi</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/supplier"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-people"></i>
              </span>
              <span className="text-sm font-medium">People</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/user"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-person"></i>
              </span>
              <span className="text-sm font-medium">User</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-bell"></i>
              </span>
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                5
              </span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={logoutHandle}
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-box-arrow-left"></i>
              </span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminLayout;
