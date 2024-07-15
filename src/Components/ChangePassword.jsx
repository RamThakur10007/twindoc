import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { OrderState } from "../Contexts";

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState();
  const docInfo = JSON.parse(localStorage.getItem("docInfo"));
  const userId = docInfo?.userId?._id;
  const isAuthenticated = localStorage.getItem("token");
  const [doctorInfo, setDoctorInfo] = useState("");
  const { setIsLoggedIn } = OrderState();

  const handleSubmit = async () => {
    if (newPassword.length < 3) {
      toast.error("Password must contain at least 8 characters", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const result = await axios.put(
      `https://healthbackend-3xh2.onrender.com/doctor/${userId}/updatePassword`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          authorization: isAuthenticated,
        },
      }
    );
    toast(result.data.result);

    setOldPassword("");
    setConfirmPassword("");
    setNewPassword("");
  };

  const handleLogout = () => {
    console.log("in here");
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      localStorage.removeItem("userInfo");
    }
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
    const docInfo = localStorage.getItem("docInfo");
    if (docInfo) {
      localStorage.removeItem("docInfo");
    }
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const doctorInfo = JSON.parse(localStorage.getItem("docInfo"));
    // Error in _id
    if (doctorInfo) {
      setDoctorInfo(doctorInfo);
    }
  }, []);
  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Change Password</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Change Password
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                  <div className="profile-info-widget">
                    <a href="#" className="booking-doc-img">
                      <img
                        src={
                          doctorInfo?.profilePicture ||
                          "/assets/img/banners/defualtImgjpg.jpg"
                        }
                        alt="/assets/img/banners/defualtImgjpg.jpg"
                      />
                    </a>
                    <div className="profile-det-info">
                      <h3>Dr. {doctorInfo?.userId?.name}</h3>
                      <div className="patient-details ">
                        <h5 className="mb-0 ">
                          {doctorInfo &&
                            doctorInfo?.educationDetails &&
                            doctorInfo?.educationDetails.map((edu, index) => (
                              <p key={index}>{edu.qualification}</p>
                            ))}
                          {/* &amp; {doctorInfo?.specialization} */}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-widget">
                  <nav className="dashboard-menu">
                    <ul>
                      <li>
                        <Link to="/physician/dashboard">
                          <i className="fas fa-columns" />
                          <span>Dashboard</span>
                        </Link>
                      </li>

                      <li>
                        <Link to="/physician/schedule">
                          <i className="fas fa-hourglass-start" />
                          <span>Schedule Timings</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/physician/accounts">
                          <i className="fas fa-file-invoice-dollar" />
                          <span>Accounts</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/physician/reviews">
                          <i className="fas fa-star" />
                          <span>Reviews</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/physician/profile">
                          <i className="fas fa-user-cog" />
                          <span>Profile Settings</span>
                        </Link>
                      </li>
                      <li className="active">
                        <Link to="/physician/changepassword">
                          <i className="fas fa-lock" />
                          <span>Change Password</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/login" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt" />
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <div className="mb-3">
                        <label className="mb-2">Old Password</label>
                        <div className=" pass-group d-flex">
                          <input
                            value={oldPassword}
                            type={showOldPassword ? "text" : "password"}
                            {...register("oldPassword", {
                              required: "Password is required",
                              pattern: {
                                value:
                                  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
                                message:
                                  "Password must contain at least 8 characters, one uppercase letter, one number, and one special character",
                              },
                            })}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="form-control pass-input"
                          />
                          <span
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="toggle-password">
                            <FontAwesomeIcon
                              icon={showOldPassword ? faEyeSlash : faEye}
                            />
                          </span>
                          {errors.password && (
                            <p className="text-red-500 text-xs italic">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="mb-2">New Password</label>
                        <div className="pass-group d-flex">
                          <input
                            value={newPassword}
                            type={showPassword ? "text" : "password"}
                            {...register("newPassword", {
                              required: "Password is required",
                              pattern: {
                                value:
                                  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
                                message:
                                  "Password must contain at least 8 characters, one uppercase letter, one number, and one special character",
                              },
                            })}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control pass-input"
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-password">
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                            />
                          </span>
                          {errors.password && (
                            <p className="text-red-500 text-xs italic">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="mb-2">Confirm Password</label>
                        <div className="pass-group d-flex">
                          <input
                            value={confirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword", {
                              required: "Password is required",
                              pattern: {
                                value:
                                  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
                                message:
                                  "Password must contain at least 8 characters, one uppercase letter, one number, and one special character",
                              },
                            })}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control pass-input"
                          />
                          <span
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="toggle-password">
                            <FontAwesomeIcon
                              icon={showConfirmPassword ? faEyeSlash : faEye}
                            />
                          </span>
                          {errors.password && (
                            <p className="text-red-500 text-xs italic">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary submit-btn">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
