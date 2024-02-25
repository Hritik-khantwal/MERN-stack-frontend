import React, { useEffect, useReducer, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const rupee = "\u20B9";
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [substringLength, setSubstringLength] = useState(45);
  const [descriptSubString, setDescriptSubString] = useState(40);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // price
  const price = () => {
    try {
      let price = 0;
      cart?.map((item) => {
        return (price += item.price * item.orderedQuantity);
      });
      return price.toLocaleString();
    } catch (error) {
      console.log(error);
    }
  };

  // total price
  const totalPrice = () => {
    try {
      let total = 40;
      cart?.map((item) => {
        return (total += item.price * item.orderedQuantity);
      });
      return total.toLocaleString();
    } catch (error) {
      console.log(error);
    }
  };

  // increment decrement
  const increaseItems = (id) => {
    setCart((prevVal) =>
      prevVal.map((item) => {
        if (item._id === id) {
          return { ...item, orderedQuantity: item.orderedQuantity + 1 };
        }
        return item;
      })
    );
  };
  const decreaseItems = (id) => {
    setCart((prevVal) =>
      prevVal.map((item) => {
        if (item._id === id) {
          return { ...item, orderedQuantity: item.orderedQuantity - 1 };
        }
        return item;
      })
    );
  };

  //   remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // suubstring value according to screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 380) {
      setSubstringLength(20);
      setDescriptSubString(15);
    } else {
      setSubstringLength(45);
    }
  }, [windowWidth]);

  // Payment integration
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OY2dZSCN0SH9m1qbUMEMlFqpwtH7t9wtQcG7bhKrmNINUvdw3JGRtltCmV6Gjg5uOcCxxRZCyNRTN9rXrkg1miH00UrOyy9y9"
      );

      const body = {
        products: cart,
      };

      const response = await axios.post(
        `https://mern-stack-back-end.onrender.com/api/v1/product/create-checkout-session`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const session = response?.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.ID,
      });

      if (result?.error) {
        console.log(result.error);
      } else {
        toast.success("Payment Completed Successfully");
        localStorage.removeItem("cart");
        setCart([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <h6 className="text-left text-secondary m-2 cart-status">
              {cart?.length > 0
                ? `You Have ${cart?.length} items ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your cart is Empty"}
            </h6>
          </div>
        </div>
        <div className="row cart-page">
          <div className="col-md-7 mx-3 cart-item bg-white">
            {cart?.map((p) => (
              <div className="row p-2 " key={p._id}>
                <div className="col-md-3 col-sm-3 custom-col-sm-3">
                  <img
                    src={`https://mern-stack-back-end.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"150px"}
                  />
                </div>
                <div className="col-md-9 col-sm-9 custom-col-sm-9">
                  <Link
                    to={`/product/${p.slug}`}
                    key={p._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h6 className="cart-title">
                      {p.name.substring(0, substringLength)}...
                    </h6>
                  </Link>
                  <p className="text-secondary cartDsize">
                    {p.description.substring(0, descriptSubString)}...
                  </p>
                  <h5 style={{ display: "inline-block" }}>
                    {rupee}
                    {p.price.toLocaleString()}
                  </h5>
                  {/* increase decrease buttons ------------------------------------------------ */}
                  <span className="input-buttons-container">
                    {p.orderedQuantity < 2 ? (
                      <button
                        className="minus-button"
                        onClick={() => decreaseItems(p._id)}
                        disabled
                      >
                        -
                      </button>
                    ) : (
                      <button
                        className="minus-button"
                        onClick={() => decreaseItems(p._id)}
                      >
                        -
                      </button>
                    )}
                    <input
                      type="text"
                      value={p.orderedQuantity}
                      readOnly
                      className="item-count-input"
                    />
                    <button
                      className="plus-button"
                      onClick={() => increaseItems(p._id)}
                    >
                      +
                    </button>
                  </span>
                  <button
                    className="btn btn-white mb-2 remove-btn"
                    onClick={() => removeCartItem(p._id)}
                    style={{
                      color: "#ff6164",
                      fontWeight: "bold",
                      display: "block",
                    }}
                  >
                    Remove
                  </button>
                </div>
                <hr className="m-0" />
              </div>
            ))}
          </div>
          {/* price details  */}
          <div className="col-md-4 bg-white cart-price ">
            <h5 className="text-secondary mt-3">PRICE DETAILS</h5>
            <hr />
            <div className="container">
              <table className="table gfg">
                <tbody>
                  <tr className="content">
                    <td>Price{` (${cart?.length} items)`}</td>
                    <td className="text-end">
                      {rupee}
                      {price()}
                    </td>
                  </tr>
                  <tr className="content">
                    <td>Delivery Charges</td>
                    <td className="text-end">{rupee}40</td>
                  </tr>

                  <tr
                    className="pay"
                    style={{
                      fontSize: "20px",
                      width: "100%",
                      color: "#555555",
                      background: "#f7f7f7",
                    }}
                  >
                    <th>Total Amount</th>
                    <th className="text-end">
                      {rupee}
                      {totalPrice()}
                    </th>
                  </tr>

                  <tr className="content">
                    <th style={{ color: "GrayText", fontWeight: "500" }}>
                      Current Address
                    </th>
                    <td className="text-end">{auth?.user?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <button
                    className="btn btn-outline-warning me-3 price-button"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                  <button
                    className="btn btn-success price-button"
                    onClick={makePayment}
                  >
                    Make Payment
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
