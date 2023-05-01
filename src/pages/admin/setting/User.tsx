import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/header/Breadcrumb";
import CustomTable from "../../../components/table/CustomTable";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deleteUser, fetchUser } from "../../../redux/features/userSlice";
import ButtonLink from "../../../components/button/ButtonLink";

const User = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const deleteHandle = (arg: string) => {
    dispatch(deleteUser(arg)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/user", {
          state: {
            message: "user deleted successfuly",
            status: "success",
          },
        });
      } else {
        navigate("/admin/user", {
          state: { message: "delete user failed", status: "fail" },
        });
      }
    });
  };
  return (
    <div>
      <Breadcrumb>
        <NavLink to={"/admin/user"}>User</NavLink>
      </Breadcrumb>
      <div className="w-full bg-white mt-4">
        <CustomTable
          columns={[
            {
              Header: "#",
              accessor: "",
              Cell: (row) => row.row.index + 1,
            },
            {
              Header: "Nama",
              accessor: "name",
            },
            {
              Header: "No. Hp",
              accessor: "phone",
            },
            {
              Header: "Role",
              accessor: "role",
            },
            {
              Header: "Aksi",
              accessor: "_id",
              Cell: (row) => {
                return (
                  <div className="flex gap-3">
                    <NavLink
                      className={"w-full"}
                      to={"/admin/setting/user/" + row.value}
                    >
                      <button className="form-button">Edit</button>
                    </NavLink>
                    <button
                      onClick={() => deleteHandle(row.value)}
                      className="form-button-danger"
                    >
                      Hapus
                    </button>
                  </div>
                );
              },
            },
          ]}
          data={data || []}
          initialPageSIze={10}
          nodeHeader={<ButtonLink name="Buat User" to="/admin/user/create" />}
          options={{ isFilterActive: true, isPagination: true }}
        />
      </div>
    </div>
  );
};

export default User;
