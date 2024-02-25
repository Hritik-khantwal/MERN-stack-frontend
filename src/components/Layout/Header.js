import React from "react";
import { NavLink, Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { GiArchiveRegister } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { IoCartSharp } from "react-icons/io5";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid nav-conatiner">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link to="/" className="navbar-brand ">
            <GiShoppingBag className="app-logo" /> Go-Store
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="d-flex align-items-center mx-auto ">
              <SearchInput />
            </div>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-4">
                <NavLink to="/" className="nav-link">
                  <IoHome /> Home
                </NavLink>
              </li>
              <li className="nav-item mt-1 me-4 ">
                <Badge count={cart?.length}>
                  <NavLink
                    to="/cart"
                    className="nav-link cart-link"
                    style={{ fontSize: "1.2rem" }}
                  >
                    <IoCartSharp /> cart
                  </NavLink>
                </Badge>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item me-4">
                    <NavLink to="/login" className="nav-link">
                      <IoLogIn /> Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown me-4">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="/Dashboard"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUserCircle />
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          <IoLogIn /> Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
