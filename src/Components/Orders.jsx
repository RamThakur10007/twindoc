import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Orderslist() {
  const [patientInfo, setPatientInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patientInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userInfo);
  }, []);

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
    const patientInfo = localStorage.getItem("patientInfo");
    if (patientInfo) {
      localStorage.removeItem("patientInfo");
    }
  };

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
                <h2 className="breadcrumb-title">Orders</h2>
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
                            patientInfo?.profilePicture ||
                            "/assets/img/banners/defualtImgjpg.jpg"
                          }
                          alt="/assets/img/patients/patient.jpg"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>{patientInfo?.userId?.name}</h3>
                        <div className="patient-details">
                          <h5>
                            <i className="fas fa-birthday-cake" />
                            {new Date(patientInfo?.dob).toDateString(
                              patientInfo?.dob
                            )}
                            , {patientInfo?.age} years
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-map-marker-alt" />{" "}
                            {patientInfo?.city}, {patientInfo?.contry}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <nav className="dashboard-menu">
                      <ul>
                        <li className="">
                          <Link to="/user/dashboard">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="/favourites">
                            <i className="fas fa-bookmark" />
                            <span>Favourites</span>
                          </Link>
                        </li> */}
                        {/* <li>
                          <Link to="/dependent">
                            <i className="fas fa-users" />
                            <span>Dependent</span>
                          </Link>
                        </li> */}
                        {/* <li>
                      <a href="chat.html">
                        <i className="fas fa-comments" />
                        <span>Message</span>
                        <small className="unread-msg">23</small>
                      </a>
                    </li> */}
                        {/* <li>
                          <Link to="/patient-accounts">
                            <i className="fas fa-file-invoice-dollar" />
                            <span>Accounts</span>
                          </Link>
                        </li> */}
                        <li>
                          <Link to="/user/dependent">
                            <i className="fas fa-users" />
                            <span>Dependent</span>
                          </Link>
                        </li>
                        <li className="active">
                          <Link to="/user/orders">
                            <i className="fas fa-list-alt " />
                            <span>Orders</span>
                            <small className="unread-msg">6</small>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/medical-records">
                            <i className="fas fa-clipboard" />
                            <span>Add Medical Records</span>
                          </Link>
                        </li>

                        <li>
                          <Link to="/user/profile-settings">
                            <i className="fas fa-user-cog" />
                            <span>Profile Settings</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/change-password">
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
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Order Id</th>
                                    <th>Pharmacy Name</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Payment Gateway</th>
                                    <th>Status</th>
                                    <th>Order date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>
                                      <a href="invoice-view.html">
                                        OD1236547890
                                      </a>
                                    </td>
                                    <td>Apollo Pharmacy</td>
                                    <td>2</td>
                                    <td>1500</td>
                                    <td>JusPay</td>
                                    <td>
                                      <span className="badge badge-primary">
                                        Order Placed
                                      </span>
                                    </td>
                                    <td>
                                      11 Nov 2023{" "}
                                      <span className="d-block text-info">
                                        10.00 AM
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>
                                      <a href="invoice-view.html">
                                        OD1236547891
                                      </a>
                                    </td>
                                    <td>Healthmart</td>
                                    <td>4</td>
                                    <td>2000</td>
                                    <td>PhonePe</td>
                                    <td>
                                      <span className="badge badge-primary">
                                        Order Placed
                                      </span>
                                    </td>
                                    <td>
                                      3 Nov 2023{" "}
                                      <span className="d-block text-info">
                                        11.00 AM
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>
                                      <a href="invoice-view.html">
                                        OD1236547892
                                      </a>
                                    </td>
                                    <td>Medplus</td>
                                    <td>1</td>
                                    <td>750</td>
                                    <td>Google Pay</td>
                                    <td>
                                      <span className="badge badge-primary">
                                        Order Placed
                                      </span>
                                    </td>
                                    <td>
                                      1 Nov 2023{" "}
                                      <span className="d-block text-info">
                                        1.00 PM
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>
                                      <a href="invoice-view.html">
                                        OD1236547893
                                      </a>
                                    </td>
                                    <td>Healthessence</td>
                                    <td>2</td>
                                    <td>1000</td>
                                    <td>Razorpay</td>
                                    <td>
                                      <span className="badge badge-warning">
                                        Shipped
                                      </span>
                                    </td>
                                    <td>
                                      30 Oct 2023{" "}
                                      <span className="d-block text-info">
                                        9.00 AM
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>5</td>
                                    <td>
                                      <a href="invoice-view.html">
                                        OD1236547894
                                      </a>
                                    </td>
                                    <td>Razorpay </td>
                                    <td>5</td>
                                    <td>1200</td>
                                    <td>PhonePe</td>
                                    <td>
                                      <span className="badge badge-warning">
                                        Shipped
                                      </span>
                                    </td>
                                    <td>
                                      28 Oct 2023{" "}
                                      <span className="d-block text-info">
                                        6.00 PM
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>6</td>
                                    <td>
                                      <a href="invoice-view.html">
                                        OD1236547895
                                      </a>
                                    </td>
                                    <td>EasyMeds</td>
                                    <td>1</td>
                                    <td>2500</td>
                                    <td>Paypal</td>
                                    <td>
                                      <span className="badge badge-primary">
                                        Order Placed
                                      </span>
                                    </td>
                                    <td>
                                      27 Oct 2023{" "}
                                      <span className="d-block text-info">
                                        8.00 AM
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
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
        </div>
      </div>
      {/* Mirrored from TwinsisTech.dreamstechnologies.com/html/template/orders-list.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Apr 2024 16:48:29 GMT */}
    </>
  );
}
