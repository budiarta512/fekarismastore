import { useState } from "react";
import Breadcrumb from "../../../components/header/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import ReactSelect from "react-select";
import { useAppDispatch } from "../../../redux/store";
import { registerUser } from "../../../redux/features/userSlice";
import { IRegister } from "../../../utils/types";

type Tvalue = {
  name: string;
  password: string;
  phone: string;
};
const CreateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | undefined>("");

  const submitHandle = (value: Tvalue) => {
    const data: IRegister = {
      ...value,
      role: role || "",
    };
    dispatch(registerUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/user", {
          state: {
            message: "user created successfuly",
            status: "success",
          },
        });
      } else {
        navigate("/admin/user/create", {
          state: { message: "create user failed", status: "fail" },
        });
      }
    });
  };

  return (
    <div>
      <Breadcrumb>
        <NavLink to="/admin/user">User</NavLink>
        <NavLink to="/admin/user/create">Buat User</NavLink>
      </Breadcrumb>
      <div className="w-full bg-white mt-4 p-4">
        <Formik
          initialValues={{
            name: "",
            phone: "",
            password: "",
          }}
          onSubmit={(value) => submitHandle(value)}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label className="form-label" htmlFor="name">
                Nama User
              </label>
              <Field
                className={"form-input"}
                id="name"
                name="name"
                placeholder={"Nama User"}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="phone">
                No. Hp
              </label>
              <Field
                className={"form-input"}
                id="phone"
                name="phone"
                placeholder={"No. Hp"}
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
                placeholder={"Password"}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="role">
                Role
              </label>
              <ReactSelect
                options={[
                  {
                    label: "Customer",
                    value: "customer",
                  },
                  {
                    label: "Admin",
                    value: "admin",
                  },
                ]}
                id="role"
                onChange={(value) => setRole(value?.value)}
              />
            </div>
            <div>
              <button className="form-button">Buat User</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateUser;
