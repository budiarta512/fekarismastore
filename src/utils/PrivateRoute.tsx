import { Navigate } from "react-router-dom";
// import { isLogin } from './auth';

const PrivateRoute = ({ children, isLogin }: any) => {
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;
