import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div
        className="row contactus d-flex align-items-center justify-content-center vh-50 footer-pages-height"
        style={{ height: "70vh" }}
      >
        <div className="col-md-6 text-center">
          <img
            src="/images/Teamwork.jpg"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4 ">
          <h1 className="bg-dark p-2 text-white text-center">Privacy Policy</h1>
          <p className="text-justify mt-2">
            We collect minimal personal data necessary for smooth transactions
            and to enhance your experience on our platform. This includes:
            Contact details for order processing and communication Payment
            information for secure transactions
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
