import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/features/userSlice";
import logo from "../../assets/images/logo.png";

const Login = () => {
  const dispatch = useAppDispatch();
  const loginHandle = (value: any) => {
    console.log(value);
    dispatch(loginUser(value));
  };
  return (
    <div className="flex justify-center items-center min-screen">
      {/* card */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-md p-8 bg-white">
        {/* logo */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="w-full flex justify-center">
            <div className="p-2 bg-red-200">
              <img className="w-64" src={logo} alt="logo" />
              {/* <img className="w-64" src={logo} alt="logo" /> */}
            </div>
          </div>
          <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Let&apos;s Login
          </h2>
        </div>
        {/* form */}
        <Formik
          initialValues={{
            phone: "",
            password: "",
          }}
          onSubmit={(value) => loginHandle(value)}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <Field
                className={"form-input"}
                id="phone"
                name="phone"
                placeholder="081239528261"
              />
            </div>

            <div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <Field
                className={"form-input"}
                id="password"
                name="password"
                placeholder="password"
                type="password"
              />
            </div>
            <div>
              <button className="form-button">Login</button>
            </div>
          </Form>
        </Formik>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have acount yet?{" "}
          <NavLink
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
