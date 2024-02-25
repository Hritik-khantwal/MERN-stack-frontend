import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - GoStore"}>
      <div className="container-fluid m-3 p-3">
        <div className="row dashboard-user">
          <div className="col-md-3 col-sm-3 custom-col-user-3">
            <UserMenu />
          </div>
          <div className="col-md-9 col-sm-9 custom-col-user-9 user-details">
            <div className="card w-75 p-3 text-secondary user-info">
              <h3>
                <IoPersonSharp /> {auth?.user?.name}
              </h3>
              <h3>
                <MdEmail /> {auth?.user?.email}
              </h3>
              <h3>
                <FaPhoneAlt /> {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
