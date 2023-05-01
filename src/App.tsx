import { useState, useEffect } from "react";
import "./App.css";
import AdminLayout from "./layout/AdminLayout";
import AdminRoutes from "./utils/AdminRoutes";
import UserRoutes from "./utils/UserRoutes";
import { useAppDispatch, useAppSelector } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { verify } from "./redux/features/userSlice";
import { getToken, logout } from "./utils/auth";
import UserLayout from "./layout/UserLayout";

function App() {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const [adminOpen, setAdminOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { pathname, state } = useLocation();
  const [show, setShow] = useState(false);
  const pageRefresh = useAppSelector((state) => state?.user?.user === null);
  const role = useAppSelector((state) => state.user?.user?.role);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.message) {
      setShow(true);
    }
  }, [state]);

  useEffect(() => {
    if (show) {
      if (state?.status === "success") {
        toast.success(state?.message);
        const timeOut = setTimeout(function () {
          setShow(false);
          navigate(pathname, { replace: true, state: null });
        }, 1000);
        return () => clearTimeout(timeOut);
      } else {
        toast.error(state?.message);
        const timeOut = setTimeout(function () {
          setShow(false);
          navigate(pathname, { replace: true, state: null });
        }, 1000);
        return () => clearTimeout(timeOut);
      }
    }
  }, [show]);

  useEffect(() => {
    if (getToken() && pageRefresh) {
      dispatch(verify()).then((res: any) => {
        if (res.payload?.statusCode === 401) {
          toast.info(
            "Anda belum login atau session telah berakhir harap login ulang",
            {
              autoClose: 5000,
            }
          );
          navigate("/");
          setTimeout(function () {
            logout();
          }, 5000);
        }
      });
    }
  }, [pathname]);

  return (
    <div className={`App min-h-screen bg-white w-full overflow-x-hidden`}>
      <ToastContainer autoClose={3000} />
      {/* layout */}
      {isLogin ? (
        <div>
          {role === "admin" ? (
            <>
              <AdminLayout open={adminOpen} setOpen={setAdminOpen} />
            </>
          ) : (
            <>
              <UserLayout open={userOpen} setOpen={setUserOpen} />
            </>
          )}
        </div>
      ) : (
        <>
          <UserLayout open={userOpen} setOpen={setUserOpen} />
        </>
      )}

      {/* page routes */}
      {isLogin && role === "admin" ? (
        <AdminRoutes open={adminOpen} isLogin={isLogin} />
      ) : (
        <UserRoutes open={userOpen} isLogin={isLogin} />
      )}
    </div>
  );
}

export default App;
