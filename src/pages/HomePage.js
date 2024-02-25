import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.js";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { Link } from "react-router-dom";

const HomePage = () => {
  const rupee = "\u20B9";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // get Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

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
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filter by category
  const handleFilter = async (value, id) => {
    try {
      let all = [...checked]; //copying the present values of checked in all
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log(error);
    }
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `https://mern-stack-back-end.onrender.com/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="image-text">
        <img
          src="/images/bannerrrrrr.webp"
          className="banner-img"
          alt="bannerimage"
          width={"100%"}
          height={"70vh"}
        />
        <div className="animated-text">
          <p>Your One-Stop Shop for Fashion and More</p>
        </div>
      </div>
      <div className="row mt-3 home-container">
        <div className="col-md-3 col-sm-12 mt-2 bg-white height filters">
          <h5 className="text-center mt-2">Filters</h5>
          <hr />
          <div className="m-3">
            <h6 className="text-smaller">CATEGORIES</h6>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <hr />
            <h6 className="text-smaller">PRICE</h6>
            <div className="d-flex flex-column flex-wrap ">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <hr />
          <div className="d-flex mb-2">
            <button
              className="btn mx-auto"
              style={{
                backgroundColor: "white",
                color: "#ff6164",
                fontWeight: "bold",
              }}
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9 col-sm-12 mt-2 bg-white card-container">
          <div className="d-flex flex-wrap change-display">
            {products?.map((p) => (
              <Link
                to={`/product/${p.slug}`}
                key={p._id}
                className="product-link m-2"
              >
                <div className="card">
                  <img
                    src={`https://mern-stack-back-end.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <p className="card-title">{p.name.substring(0, 44)}...</p>
                    <p className="card-text description-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <div className="rating-points ">
                      <span>{p.averageRating}</span>
                      <span className="rating-star">★</span>
                    </div>
                    <p className="card-text text-bold price-text">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(p.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
