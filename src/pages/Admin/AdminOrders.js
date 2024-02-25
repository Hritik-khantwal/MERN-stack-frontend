import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const rupee = "\u20B9";
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  //   get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  //   order status update
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://mern-stack-back-end.onrender.com/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  // get Color Class
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

  return (
    <Layout title="Dashboard - All orders">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {orders?.map((o, i) => {
              return (
                <div className="border shadow " key={o?._id}>
                  <table className="table admin-order-table">
                    <thead>
                      <tr key={o?._id}>
                        <th scope="col">#</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Items</th>
                        <th scope="col">Status</th>
                        <th scope="col">Products</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={o?._id}>
                        <td>{i + 1}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).calendar()}</td>
                        <td>
                          {rupee}
                          {o?.payment.toLocaleString()}
                        </td>
                        <td>{o?.product?.length}</td>
                        <td>
                          <div className={`status ${getColorClass(o?.status)}`}>
                            <Select
                              variant="borderless"
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </td>
                        <td>
                          <button
                            className="btn btn-"
                            onClick={() => setSelectedOrderIndex(i)}
                            style={{ border: "1px solid gray" }}
                          >
                            Review product
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Modal
                    onCancel={() => setSelectedOrderIndex(null)}
                    footer={null}
                    open={selectedOrderIndex === i}
                  >
                    <div className="container">
                      {o?.product?.map((p) => (
                        <div className="row p-1" key={p._id}>
                          <div className="col-md-3 bg-white p-1">
                            <img
                              src={`https://mern-stack-back-end.onrender.com/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              height={"150px"}
                            />
                          </div>
                          <div className="col-md-8 bg-white p-1">
                            <Link
                              to={`/product/${p.slug}`}
                              key={p._id}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <h6 className="cart-title">
                                {p.name.substring(0, 29)}...
                              </h6>
                            </Link>
                            <p className="text-secondary cartDsize">
                              {p.description.substring(0, 40)}...
                            </p>
                            <h5 style={{ display: "inline-block" }}>
                              {rupee}
                              {p.price.toLocaleString()}
                            </h5>
                            <h6>Quantity: {p.orderedQuantity}</h6>
                          </div>
                          <hr className="m-0" />
                        </div>
                      ))}
                    </div>
                  </Modal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
