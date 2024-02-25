import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  // get users
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/auth/users`
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle Delete User
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `https://mern-stack-back-end.onrender.com/api/v1/auth/delete-user/${userId}`
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        getUsers();
      } else {
        toast.error("Unable to delete user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);

  return (
    <Layout title="Dashboard - All Users">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Registered on</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Remove User</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u, i) => (
                    <tr key={u?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <FaUserCircle
                          style={{ color: "gray", marginRight: "2px" }}
                        />
                        {u?.name}
                      </td>
                      <td>{moment(u?.createdAt).calendar()}</td>
                      <td>{u?.email}</td>
                      <td>{u?.phone}</td>
                      <td>{u?.address}</td>
                      <td>
                        <button
                          key={u?._id}
                          className="btn text-center"
                          onClick={() => handleDeleteUser(u?._id)}
                        >
                          <RiDeleteBin5Line
                            style={{ color: "red", height: "20px" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
