import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { Link } from "react-router-dom";

const Orders = () => {
  const rupee = "\u20B9";
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [substringLength, setSubstringLength] = useState(80);
  const [descriptSubString, setDescriptSubString] = useState(75);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // get status color
  const getColorClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-green";
      case "Cancelled":
        return "status-red";
      case "Not Processed":
        return "status-serious";
      case "Processing":
        return "status-sky-blue";
      // Add more cases as needed
      default:
        return "status-blue"; // Default color class
    }
  };

  // substring after a particular screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 1034) {
      setSubstringLength(30);
      setDescriptSubString(25);
    } else {
      setSubstringLength(80);
    }
  }, [windowWidth]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 user-orders ">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <h2 className="all-user-orders text-secondary">All Orders</h2>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow p-2" key={i}>
                  <div className="table-responsive">
                    <table className="table ">
                      <thead>
                        <tr className="table-th">
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Items</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-td">
                          <td>{i + 1}</td>
                          <td>
                            <div
                              className={`status text-center ${getColorClass(
                                o?.status
                              )}`}
                            >
                              {o?.status}
                            </div>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).calendar()}</td>
                          <td>{o?.payment}</td>
                          <td>{o?.product?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="container mb-1">
                    {o?.product?.map((p) => (
                      <div className="row p-1" key={p._id}>
                        <div className="col-md-2 col-sm-3 custom-col-sm-3 orders-img bg-white p-1">
                          <img
                            src={`https://mern-stack-back-end.onrender.com/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height={"150px"}
                          />
                        </div>
                        <div className="col-md-8 col-sm-8 custom-col-sm-9 bg-white p-1 orders-card">
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
                          <h6>Quantity: {p.orderedQuantity}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
