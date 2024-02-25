import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const rupee = "\u20B9";
  const [products, setProducts] = useState([]);

  // get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //   call at real time
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center text-secondary">All Products List</h2>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  key={p._id}
                  className="product-link m-2"
                >
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`https://mern-stack-back-end.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {p.name.substring(0, 44)}...
                      </h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <div className="rating-points ">
                        <span>{p.averageRating}</span>
                        <span className="rating-star">★</span>
                      </div>
                      <p className="card-text text-bold">
                        {rupee}
                        {p.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
