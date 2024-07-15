import React, { useCallback, useEffect, useState } from "react";
import { FaUserInjured, FaUserMd } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderState } from "../Contexts";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


export default function LoginDoctor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { setIsLoggedIn,
          selectedSlotTime,
  } = OrderState();

  const onSubmit = useCallback(
    async (data) => {
      setIsLoading(true); // Set loading state to true upon form submission
      toast("Please wait while we are fetching your data");
      try {
        const response = await axios.post(
          "https://twinsdocbackend.onrender.com/user/signin",
          data,
          {
            headers: {
              isvalidrequest: "twinsistech",
            },
          }
        );

        console.log(response);
        const user = response?.data?.result?.user;

        await localStorage.setItem("token", response?.data?.result?.token);

        if (user.createdProfile && user.role === "doctor") {
          const doctor = await axios.get(
            `https://twinsdocbackend.onrender.com/doctor/${user._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: response?.data.result.token,
              },
            }
          );

          toast("Data fetched successfully");
          await localStorage.setItem(
            "docInfo",
            JSON.stringify(doctor.data.result.doctor)
          );
        } else if (user.createdProfile && user.role === "user") {
          const patient = await axios.get(
            `https://twinsdocbackend.onrender.com/patient/${user._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: response?.data.result.token,
              },
            }
          );

          toast("Data fetched successfully");
          await localStorage.setItem(
            "patientInfo",
            JSON.stringify(patient.data.result.patient)
          );
          console.log(patient.data.result);
          // navigate("/");
        }
        await localStorage.setItem("userInfo", JSON.stringify(user));
        const role = user.role;
        console.log(role);
        if (user) {
          setIsLoggedIn(true);
        }
        if (role === "doctor") {
          await navigate("/physician/dashboard");
        } else if (role === "user" && user.createdProfile) {
          console.log("here");
          if(selectedSlotTime){
            navigate("/user/appointmentdetails")
          }
          else{
           
            navigate("/");
          }
        } else {
          console.log("here");
          navigate("/");
        }
      } catch (error) {
        setIsLoading(false); // Reset loading state upon error
        console.error("Error submitting form:", error);
        toast.error(error.message, {
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
      }
    },
    [navigate]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const googleLogin = useCallback(
    async (decoded) => {
      setIsLoading(true);
      toast("Please wait while we are fetching your data");
      try {
        const response = await axios.post(
          `https://twinsdocbackend.onrender.com/user/google`,
          {
            email: decoded.email,
          },
          {
            headers: {
              isvalidrequest: "twinsistech",
            },
          }
        );
        console.log(decoded);
        console.log(response);
        const user = response?.data?.result?.user;
  
        await localStorage.setItem("token", response?.data?.result?.token);
  
        if (user.createdProfile && user.role === "doctor") {
          const doctor = await axios.get(
            `https://twinsdocbackend.onrender.com/doctor/${user._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: response?.data.result.token,
              },
            }
          );
  
          toast("Data fetched successfully");
          await localStorage.setItem(
            "docInfo",
            JSON.stringify(doctor.data.result.doctor)
          );
        } else if (user.createdProfile && user.role === "user") {
          const patient = await axios.get(
            `https://twinsdocbackend.onrender.com/patient/${user._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: response?.data.result.token,
              },
            }
          );
  
          toast("Data fetched successfully");
          await localStorage.setItem(
            "patientInfo",
            JSON.stringify(patient.data.result.patient)
          );
          console.log(patient.data.result);
        }
        await localStorage.setItem("userInfo", JSON.stringify(user));
        const role = user.role;
        console.log(role);
        setIsLoggedIn(true); // Update isLoggedIn state here
        if (role === "doctor") {
          await navigate("/doctor");
        } else if (role === "user") {
          console.log("here");
          navigate("/");
        } else {
          console.log("here");
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Reset loading state upon error
        console.error("Error submitting form:", error);
        toast.error(error.message, {
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
      }
    },
    [navigate, setIsLoggedIn]
  );
  

  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <div className="main-wrapper">
      <div className="content top-space">
        <div className="container-fluid">
          <div className="row">
            <ToastContainer />
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="assets/img/bg/pic.jpg"
                      className="img-fluid my-5 "
                      alt="TwinsDoc Login"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>
                        Login <span>TwinsDoc</span>
                      </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3 ">
                        <label className="focus-label">Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className="form-control floating"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="mt-2">Enter Your Password</label>
                        <div className="pass-group d-flex">
                          <input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                              required: "Password is required",
                              pattern: {
                                message:
                                  "Password must contain at least 8 characters, one uppercase letter, one number, and one special character",
                              },
                            })}
                            className="form-control pass-input"
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            className="toggle-password">
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                            />
                          </span>
                          {errors.password && (
                            <p className="text-red-500 text-xs italic">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-end">
                        <Link to='/forgetpass' className="forgot-link">
                        Forgot Password ?
                        </Link>
                      </div>
                      {/* Use isLoading state to conditionally render button text */}
                      <button
                        className="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                        disabled={isLoading} // Disable button when loading
                      >
                        {isLoading ? "Processing..." : "Login"}
                      </button>
                      <div className="login-or">
                        <span className="or-line" />
                        <span className="span-or">or</span>
                      </div>
                      <div className="row social-login">
                      
                      <div className="container-fluid">

    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <GoogleLogin
        onSuccess={credentialResponse => {
          const decoded = jwtDecode(credentialResponse?.credential);
          googleLogin(decoded);
          console.log(decoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        style={{ width: '100%' }}
      />
    </div>
                    
  </div>
                  </div>
                      <div className="text-center dont-have">
                        Don’t have an account?<br></br>
                        <div className="mt-3">
                          <Link
                            to="/signup?role=doctor" // Include role parameter for Doctor signup
                            className="m-2">
                            <FaUserMd className="" /> Sign up as a Physician
                          </Link>
                          <Link
                            to="/signup?role=user" // Include role parameter for Patient signup
                            className="mx-2">
                            <FaUserInjured /> Sign up as a Patient
                          </Link>
                        </div>
                      </div>
                    </form>
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
