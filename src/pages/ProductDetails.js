import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { FaUserTie } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAuth } from "../context/Auth";
import { IoCartSharp } from "react-icons/io5";

const ProductDetails = () => {
  const navigate = useNavigate();
  const rupee = "\u20B9";
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
    if (product?._id) getReview(product?._id);
  }, [params?.slug, product?._id]);

  // get single product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // if item already exist in the cart
  const alreadyInCart = cart.some((item) => item._id === product._id);

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // create review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://mern-stack-back-end.onrender.com/api/v1/rating/create-review`,
        {
          rating,
          comment,
          productId: product._id,
        }
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error("cant create review");
      }
      setRating(0);
      setComment("");
      getReview(product?._id);
      setVisible(false);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  // get review
  const getReview = async (productId) => {
    try {
      const { data } = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/rating/get-reviews/${productId}`
      );
      if (data?.success) {
        setReviews(data?.reviews);
      } else {
        console.log(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update average rating of product
  const updateAveragerating = async (reviews) => {
    try {
      // calculate avg rating
      const totalRating = reviews?.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      const avgRating = Math.floor(averageRating * 10) / 10;
      // send avg rating to bckend
      if (product?._id) {
        const { data } = await axios.put(
          `https://mern-stack-back-end.onrender.com/api/v1/product/update-rating/${product?._id}`,
          { avgRating }
        );
        if (data?.success) {
          getProduct();
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (reviews?.length >= 1) updateAveragerating(reviews);
  }, [reviews]);

  // carousel responsive
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 900 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.5,
    },
  };

  return (
    <Layout title={`${product?.name}`}>
      <div className="container mt-3 bg-white p-detail-container">
        <div className="row justify-content-center col-parent">
          <div className="col-md-6 img-col p-0">
            <div className="product-detail-img">
              <img
                src={`https://mern-stack-back-end.onrender.com/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
            </div>
          </div>
          <div className="col-md-6 bg-white">
            <div className="kuch-bhi mt-3" key={product?._id}>
              <Link to={"/"} className="kuch-bhi-link">
                Home
              </Link>
              <span className="m-2" style={{ width: "16px" }}>
                {">"}
              </span>
              <Link to={"/"} className="kuch-bhi-link">
                {product?.category?.name}
              </Link>
              <span className="m-2" style={{ width: "16px" }}>
                {">"}
              </span>
              <span>{product?.name?.substring(0, 10)}...</span>
            </div>
            <h5 className="mt-2" style={{ fontWeight: "400" }}>
              {product.name}
            </h5>
            <div className="rating-points mt-3">
              <span>{product?.averageRating}</span>
              <span className="rating-star">★</span>
            </div>
            <hr />
            <h4>
              {rupee}
              {product?.price?.toLocaleString()}
            </h4>
            <hr />
            <p className="text-secondary cat-name">{product?.category?.name}</p>
            <h6 className="mt-4 text-secondary disc-name">Description</h6>
            <p className="disc-name">{product.description}</p>
            <div className="mt-3">
              {alreadyInCart ? (
                <button
                  className="btn ms-1"
                  style={{
                    backgroundColor: "#FF9F00",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/cart")}
                >
                  <IoCartSharp style={{ fontSize: "25px" }} /> GO TO CART
                </button>
              ) : (
                <button
                  className="btn ms-1"
                  style={{
                    backgroundColor: "#FF9F00",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    navigate("/cart");
                    toast.success("Item Added to Cart");
                  }}
                >
                  <IoCartSharp style={{ fontSize: "25px" }} /> ADD TO CART
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* review form  */}
      <h6 style={{ marginLeft: "10px", fontSize: "20px" }}>Rating & Reviews</h6>
      <div
        className="d-flex justify-content-end"
        style={{ paddingRight: "6rem" }}
      >
        {auth?.user ? (
          <button className="btn btn-light" onClick={() => setVisible(true)}>
            Rate product
          </button>
        ) : (
          <p>Login to Review product</p>
        )}
      </div>
      <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
        <form id="reviewForm" onSubmit={handleSubmit}>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "filled" : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}

            <label className="form-label m-2" style={{ fontSize: "20px" }}>
              {rating}
            </label>
          </div>

          {/* Comment Input */}
          <div className="mb-3">
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              rows={4}
              required
              placeholder="Enter Your Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      </Modal>

      {/* review component  */}
      <Carousel responsive={responsive}>
        {reviews?.map((review) => (
          <div
            key={review?._id}
            className="card m-2 text-center review-container"
          >
            <div className="card-body">
              <div className="rating-user-icon">
                <FaUserTie />
              </div>
              <h5 className="card-title">{review?.user?.name}</h5>
              <div className="rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`star ${index < review?.rating ? "filled" : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* <h6 className="card-subtitle mb-2 text-body-secondary">
                {review?.rating}
              </h6> */}
              <p className="card-text">{review?.comment}</p>
            </div>
          </div>
        ))}
      </Carousel>
      <hr />
      {/* similar product */}
      <h6 style={{ margin: "10px", fontSize: "20px" }}>Similar products</h6>
      <div className="row bg-white">
        {relatedProducts.length < 1 && (
          <p className="text-center no-sim-p">No Similar Products Found</p>
        )}
        <Carousel responsive={responsive}>
          {relatedProducts?.map((p) => (
            <Link
              to={`/product/${p.slug}`}
              key={p._id}
              className="product-link"
            >
              <div className="card m-2 p-dtls-img" style={{ width: "15rem" }}>
                <img
                  src={`https://mern-stack-back-end.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top "
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name.substring(0, 18)}...</h5>
                  <p className="card-text description-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="rating-points ">
                    <span>{p.averageRating}</span>
                    <span className="rating-star">★</span>
                  </div>
                  <p className="card-text text-bold similar-p-price">
                    {rupee}
                    {p.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </Layout>
  );
};

export default ProductDetails;
