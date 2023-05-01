import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import ButtonLink from "../components/button/ButtonLink";
import { logout } from "../utils/auth";

type props = {
  open: boolean;
  setOpen: (a: any) => void;
};
const UserLayout = ({ open, setOpen }: props) => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const navigate = useNavigate();
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
          <ul className="flex justify-start items-center w-full h-full">
            <img className="w-36" src={logo} alt="logo" />
            <li className="px-2">
              <button
                className="bg-red-500/20 shadow-none hover:shadow-none hover:bg-primary text-red-500 hover:text-white rounded-md py-1 px-2"
                onClick={() => setOpen(!open)}
              >
                <i className="bi bi-list text-xl"></i>
              </button>
            </li>
          </ul>
          {isLogin ? (
            <ul className="flex gap-2 justify-end items-center w-full h-full">
              <li className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-red-100 text-lg text-gray-600">
                <NavLink
                  className="w-full h-full flex items-center justify-center"
                  to={"/"}
                >
                  <i className="bi bi-cart"></i>
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
          ) : (
            <ul className="flex gap-2 justify-end items-center w-full h-full">
              <li>
                <ButtonLink name="Login" to="/login" />
              </li>
              <li>
                <ButtonLink name="Register" to="/register" />
              </li>
            </ul>
          )}
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
          <li>
            <NavLink
              to="/"
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
              to="/product"
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
              to="/setting"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bi bi-gear"></i>
              </span>
              <span className="text-sm font-medium">Settings</span>
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
          {isLogin ? (
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
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
};

export default UserLayout;
