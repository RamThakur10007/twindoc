import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { OrderState } from "../Contexts";

export default function Accounts() {
  const [accountName, setAccountName] = useState("Dr. Darren Elder");
  const [bankName, setBankName] = useState("Sbi");
  const [upiId, setUpiId] = useState("vaibhavw@oksbi");
  const [upiIdError, setUpiIdError] = useState();
  const [doctorInfo, setDoctorInfo] = useState("");
  const [dataRevenues, setDataRevenues] = useState(null);
  const [income, setIncome] = useState();
  const { setIsLoggedIn } = OrderState();

  const docInfo = JSON.parse(localStorage.getItem("docInfo"));

  const fees = docInfo?.fees;

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

  const handleUpiIdChange = (e) => {
    const upiIdValue = e.target.value;

    // Check if the input is empty
    if (upiIdValue.trim() === "") {
      setUpiId(upiIdValue); // Set the empty value
      setUpiIdError(""); // Clear any existing error
    } else {
      // Check if the input matches the regex pattern
      if (/^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}₹/.test(upiIdValue)) {
        setUpiId(upiIdValue); // Set the valid UPI ID
        setUpiIdError(""); // Clear any existing error
      } else {
        setUpiId(upiIdValue); // Set the UPI ID
        setUpiIdError("Invalid UPI ID format"); // Set the error message for invalid format
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the UPI ID is valid
    if (/^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}₹/.test(upiId)) {
      console.log("Account Name:", accountName);
      console.log("Bank Name:", bankName);
      console.log("UPI ID:", upiId);
    } else {
      // If UPI ID is invalid, show the error message
      setUpiIdError("Invalid UPI ID format");
    }
  };

  // Analytics
  // Total Revenue
  const dataRevenue = [
    {
      name: "Jan",
      Income: 1800,
    },
    {
      name: "Feb",
      Income: 3000,
    },
    {
      name: "Mar",
      Income: 2000,
    },
    {
      name: "Apr",
      Income: 2780,
    },
    {
      name: "May",
      Income: 1890,
    },
    {
      name: "Jun",
      Income: 2390,
    },
    {
      name: "July",
      Income: 4490,
    },
    {
      name: "Aug",
      Income: 2800,
    },
    {
      name: "Sep",
      Income: 2500,
    },
    {
      name: "Oct",
      Income: 4000,
    },
    {
      name: "Nov",
      Income: 3990,
    },
    {
      name: "Dec",
      Income: 3200,
    },
  ];

  // Appointments
  const data = [
    {
      name: "Jan",
      Attented: 65,
      Not_Attented: 25,
    },
    {
      name: "Feb",
      Attented: 50,
      Not_Attented: 20,
    },
    {
      name: "Mar",
      Attented: 40,
      Not_Attented: 15,
    },
    {
      name: "Apr",

      Attented: 55,
      Not_Attented: 19,
    },
    {
      name: "May",

      Attented: 72,
      Not_Attented: 15,
    },
    {
      name: "Jun",

      Attented: 100,
      Not_Attented: 30,
    },
    {
      name: "July",

      Attented: 59,
      Not_Attented: 25,
    },
    {
      name: "Aug",

      Attented: 65,
      Not_Attented: 15,
    },
    {
      name: "Sep",

      Attented: 25,
      Not_Attented: 5,
    },
    {
      name: "Oct",

      Attented: 50,
      Not_Attented: 10,
    },
    {
      name: "Nov",

      Attented: 80,
      Not_Attented: 15,
    },
    {
      name: "Dec",

      Attented: 95,
      Not_Attented: 25,
    },
  ];

  const getAnalyticsData = async () => {
    const isAuthenticated = localStorage.getItem("token");

    if (docInfo) {
      try {
        const response = await axios.post(
          "https://healthbackend-3xh2.onrender.com/appointment/analytics/",

          {
            userId: docInfo?.userId?._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: isAuthenticated,
            },
          }
        );

        console.log(response.data.result);
        const {
          appointmentCounts,
          income,
          canceledAppointments,
          totalAppointmentsAttended,
        } = response.data.result;
        setIncome(income);
        // const updatedCounts = {};

        // 2024-05 6

        // for(const [key,value ]  of Object.entries(appointmentCounts)){
        //   console.log(key,value);
        //   const updatedValue = value * fees;
        //   updatedCounts[key] = updatedValue;
        // }
        // console.log(updatedCounts)  // 2024-05 6000

        if (appointmentCounts) {
          const data = Object.entries(appointmentCounts).map(
            ([name, income]) => ({
              name: name,
              Income: fees * income,
            })
          );

          console.log(data); // {name: 2024-05 , Income: 6000}
          setDataRevenues(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(dataRevenues);

  useEffect(() => {
    getAnalyticsData();
  }, []);

  useEffect(() => {
    const doctorInfo = JSON.parse(localStorage.getItem("docInfo"));
    if (doctorInfo) {
      setDoctorInfo(doctorInfo);
    }
  }, []);

  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Accounts</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Accounts
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
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
                        <li className="active">
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
                        <li>
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
                <div className="row">
                  <div className="col-lg-5 d-flex">
                    <div className="card flex-fill">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-sm-6">
                            <h3 className="card-title">Account</h3>
                          </div>
                          <div className="col-sm-6">
                            <div>
                              <a
                                title="Edit Profile"
                                className="btn btn-primary btn-sm"
                                href="#account_modal"
                                data-bs-toggle="modal">
                                <i className="fas fa-pencil" /> Edit Details
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        {/* accounts */}
                        <div className="profile-view-bottom">
                          <div className="row ">
                            <div className="col-xl-6 ">
                              <div className="info-list">
                                <div className="title">Account Name</div>
                                <div className="text" id="account_name">
                                  Dr. {docInfo?.userId?.name}
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 ">
                              <div className="info-list">
                                <div className="title">Bank Name</div>
                                <div className="text" id="bank_name">
                                  {bankName}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="info-list">
                                <div className="title">UPI id</div>
                                <div className="text" id="account_no">
                                  {upiId}
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-lg-6">
                              <div className="info-list">
                                <div className="title">Account Name</div>
                                <div className="text" id="account_name">
                                  Dr. Darren Elder
                                </div>
                              </div>
                            </div>  */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="account-card bg-success-light">
                              <span>₹{income}</span> My Earnings
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="account-card bg-purple-light">
                              <span>₹90.48</span> Balance
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* analytics */}

                <div className="card flex-fill">
                  <div
                    style={{
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      width: "100%",
                      height: "300px",
                    }}>
                    <strong style={{ color: "#4b5563", fontWeight: "500" }}>
                      Total Revenue
                    </strong>
                    <div
                      style={{
                        marginTop: "0.75rem",
                        width: "100%",
                        flex: "1",
                        fontSize: "0.875rem",
                      }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={dataRevenues}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            dataKey="Income"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div
                  style={{
                    height: "22rem",
                    backgroundColor: "#fff",
                    padding: "1rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    flexDirection: "column",
                    flex: "1",
                  }}>
                  <strong style={{ color: "#4b5563", fontWeight: "500" }}>
                    Appointments
                  </strong>
                  <div
                    style={{
                      marginTop: "0.75rem",
                      width: "100%",
                      flex: "1",
                      fontSize: "0.875rem",
                    }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 20,
                          right: 10,
                          left: -10,
                          bottom: 0,
                        }}>
                        <CartesianGrid
                          strokeDasharray="3 3 0 0"
                          vertical={false}
                        />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Attented" fill="#2596be" />
                        <Bar dataKey="Not_Attented" fill="#f5392c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade custom-modal"
        id="payment_request_modal"
        role="dialog"
        style={{ display: "none" }}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Payment Request</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form id="payment_request_form" method="post">
                <input
                  type="hidden"
                  name="payment_type"
                  id="payment_type"
                  defaultValue={1}
                />
                <div className="mb-3">
                  <label className="mb-2">Request Amount</label>
                  <input
                    type="text"
                    name="request_amount"
                    id="request_amount"
                    className="form-control"
                    maxLength={6}
                    oninput="if (!window.__cfRLUnblockHandlers) return false; this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '₹1');"
                    data-cf-modified-9d2aab87120ae1d3fdeb4d9f-=""
                  />
                  <span className="help-block" />
                </div>
                <div className="mb-3">
                  <label className="mb-2">Description (Optional)</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    defaultValue={""}
                  />
                  <span className="help-block" />
                </div>
              </form>
            </div>
            <div className="modal-footer text-center">
              <button
                type="submit"
                id="request_btn"
                className="btn btn-primary">
                Request
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade custom-modal"
        id="account_modal"
        role="dialog"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Account Details</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form id="accounts_form" method="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="control-label mb-2">Account Name</label>
                      <input
                        type="text"
                        name="account_name"
                        className="form-control acc_name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                      <span className="help-block" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="control-label mb-2">Bank Name</label>
                    <input
                      type="text"
                      name="bank_name"
                      className="form-control bank_name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <span className="help-block" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="control-label mb-2">UPI id</label>
                      <input
                        type="text"
                        name="account_no"
                        className="form-control account_no"
                        value={upiId}
                        onChange={handleUpiIdChange}
                        placeholder="example123@okbankname"
                      />
                      {upiIdError && (
                        <span className="help-block">{upiIdError}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer text-center">
                  <button
                    type="submit"
                    id="acc_btn"
                    className="btn btn-primary"
                    data-bs-dismiss="modal">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
