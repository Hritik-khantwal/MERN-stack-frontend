import React from "react";
import { NavLink } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineAddBox } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { HiOutlineUsers } from "react-icons/hi2";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4 style={{ color: "gray" }}>Admin Panel</h4>
          <div
            style={{
              padding: "10px",
              background: "white",
              textAlign: "left",
              fontWeight: "600",
            }}
          >
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item border-0 rounded"
              aria-current="true"
            >
              <TbCategoryPlus /> Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item border-0 rounded"
            >
              <MdOutlineAddBox /> Create Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/products"
              className="list-group-item border-0 rounded"
            >
              <CiBoxList /> Products
            </NavLink>
            <NavLink
              to="/dashboard/admin/orders"
              className="list-group-item border-0 rounded"
            >
              <LiaShippingFastSolid /> Orders
            </NavLink>
            <NavLink
              to="/dashboard/admin/users"
              className="list-group-item border-0 rounded"
            >
              <HiOutlineUsers /> Users
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
