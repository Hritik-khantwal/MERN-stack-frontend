import React from "react";

const Categoryform = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <input
            type="text"
            className="form-control cat-control"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary cat-btn mb-3"
          style={{ borderRadius: "2px" }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Categoryform;
