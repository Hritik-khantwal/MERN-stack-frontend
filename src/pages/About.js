import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row d-flex align-items-center justify-content-center footer-pages-height">
        <div className="col-md-6 col-sm-6 text-center">
          <img
            src="/images/about.jpeg"
            alt="Aboutus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4 col-sm-4">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            At Ecommerce App, we're passionate about providing an outstanding
            shopping experience. Our goal is simple: to offer high-quality
            products/services while ensuring your satisfaction
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
