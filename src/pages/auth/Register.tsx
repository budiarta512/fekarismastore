import { Field, Formik, Form } from "formik";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { registerUser } from "../../redux/features/userSlice";
import { IRegister } from "../../utils/types";

const Register = () => {
  const dispatch = useAppDispatch();
  const registerHandle = (value: IRegister) => {
    dispatch(registerUser(value));
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
            </div>
          </div>
          <h2 className="my-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register new Account
          </h2>
        </div>
        {/* form */}
        <Formik
          initialValues={{
            name: "",
            phone: "",
            password: "",
            role: "customer",
          }}
          onSubmit={registerHandle}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <Field
                  className={"form-input"}
                  id="name"
                  name="name"
                  placeholder="angga wilan"
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <Field
                className={"form-input"}
                id="phone"
                name="phone"
                placeholder="081239528261"
                type="number"
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
              <button type="submit" className="form-button">
                Register
              </button>
            </div>
          </Form>
        </Formik>
        <p className="mt-10 text-center text-sm text-gray-500">
          already have an acount?{" "}
          <NavLink
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
