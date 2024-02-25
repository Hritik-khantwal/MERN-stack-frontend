import React from "react";
import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { LiaShippingFastSolid } from "react-icons/lia";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4
            className="text-secondary bg-white user-dash"
            style={{ height: "38px" }}
          >
            Dashboard
          </h4>
          <div
            style={{
              padding: "10px",
              background: "white",
              textAlign: "left",
              fontWeight: "600",
            }}
          >
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item user-menu-link border-0 rounded"
              aria-current="true"
            >
              <ImProfile /> Profile
            </NavLink>
            <NavLink
              to="/dashboard/user/orders"
              className="list-group-item user-menu-link border-0 rounded"
            >
              <LiaShippingFastSolid style={{ fontSize: "20px" }} /> Orders
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
