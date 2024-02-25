import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="row" style={{ height: "50vh" }}>
      <div className="col-md-12 d-flex align-items-center justify-content-center">
        <h1>Your payment was succesfull</h1>
        <Link to={"/dashboard/user/orders"}>Go Back</Link>
      </div>
    </div>
  );
};

export default Success;
