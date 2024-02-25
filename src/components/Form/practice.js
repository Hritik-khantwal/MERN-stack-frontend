import React, { useState } from "react";
import { useCart } from "../../context/cart";

const practice = () => {
  const [cart, setCart] = useCart();
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((prevVal) => prevVal + 1);
  };
  const decrement = () => {
    setCount((prevVal) => prevVal - 1);
  };

  return (
    <div>
      {cart.map((p) => (
        <>
          <p>{p.name}</p>
          <button onClick={decrement}>-</button>
          <input type="text" value={count} readOnly />
          <button onClick={increment}>+</button>
        </>
      ))}
    </div>
  );
};

export default practice;

// price details section
{
  /* <div className="col-md-4 bg-white cart-price">
<h5 className="text-secondary">PRICE DETAILS</h5>
<hr />
<h6>
  Price{` (${cart?.length} items)`} : {rupee}
  {price()}
</h6>
<h6>Delivery Charges : {rupee}40</h6>
<hr />
<h4>
  Total Amount : {rupee}
  {totalPrice()}
</h4>
<hr />
{auth?.user?.address ? (
  <>
    <div className="mb-3">
      <h5>Current Address </h5>
      <h6>{auth?.user?.address}</h6>
      <button
        className="btn btn-outline-warning me-3"
        onClick={() => navigate("/dashboard/user/profile")}
      >
        Update Address
      </button>
      <button className="btn btn-success " onClick={makePayment}>
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
</div> */
}
