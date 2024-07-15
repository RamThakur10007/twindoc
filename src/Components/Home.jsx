import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const doctorInfo = localStorage.getItem("docInfo");
    if (userInfo || doctorInfo) {
      setShow(true);
    }
  }, [localStorage.getItem("userInfo"), localStorage.getItem("docInfo")]);
  return (
    <div>
      <div style={{ height: "100px" }}>Home</div>
      {/* {!show && (
        <Link to={"/login"}>
          <button
            style={{ margin: 50 }}
            className="btn btn-primary w-100 btn-sm login-btn">
            Login / Sign Up
          </button>
        </Link>
      )} */}
    </div>
  );
};

export default Home;
