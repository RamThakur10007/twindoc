import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatableSelect from "react-select/creatable";
import { OrderState } from "../Contexts";


export const DocPersonalProfile = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const { setIsLoggedIn } = OrderState();

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
    // Fetch doctor information here
    // axios.get("/api/doctor/profile").then((response) => {
    //   setDoctorInfo(response.data);
    // }).catch((error) => {
    //   toast.error("Error fetching doctor information");
    // });
  }, []);

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Profile </h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Profile 
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
            <ToastContainer />
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                  <div className="profile-info-widget">
                    <a href="#" className="booking-doc-img">
                      <img
                        src={
                          doctorInfo?.profilePicture ||
                          "/assets/img/doctors/doctor-thumb-02.jpg"
                        }
                        alt="Profile"
                      />
                    </a>
                    <div className="profile-det-info">
                      <h3>Dr. {doctorInfo?.userId?.name || "Ryan Taylor"}</h3>
                      <div className="patient-details ">
                        <h5 className="mb-0 ">
                          {doctorInfo &&
                            doctorInfo?.educationDetails &&
                            doctorInfo?.educationDetails.map((edu, index) => (
                              <p key={index}>{edu.qualification}</p>
                            )) || "Cardiologist"}
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
                      <li className="active">
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
              <div className="main-wrapper">
                <div className="page-wrapper">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card">
                            <dic className="card-body">
                                <div className="profile-header">
                          <div className="row align-items-center">
                            <div className="col-md-3 profile-image">
                              <a href="#" className="booking-doc-img">
                                <img
                                  className="rounded-circle"
                                  alt="User Image"
                                  src="/assets/img/doctors/doctor-thumb-02.jpg"
                                />
                              </a>
                            </div>
                            <div className="col ml-md-n2 profile-user-info">
                              <h4 className="user-name mb-0">Ryan Taylor</h4>
                              <h6 className="text-muted">ryantaylor@admin.com</h6>
                              <div className="user-Location">
                                <i className="fa fa-map-marker" /> Florida, United States
                              </div>
                              <div className="about-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                              </div>
                            </div>
                            <div className="col-auto profile-btn">
                              <a href="#" className="btn btn-primary">
                                Edit
                              </a>
                            </div>
                          </div>
                                </div>

                            </dic>
                        </div>
                        <div className="profile-menu">
                          <ul className="nav nav-tabs nav-tabs-solid">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                data-bs-toggle="tab"
                                href="#per_details_tab"
                              >
                                About
                              </a>
                            </li>
                            {"  "}
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#password_tab"
                                style={{border:''}}
                              >
                                Qualifications
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#licence_tab"
                                style={{border:''}}
                              >
                                Medical Licence
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-content profile-tab-cont">
                          <div className="tab-pane fade show active" id="per_details_tab">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-between">
                                      <span>Personal Details</span>
                                      {/* <a
                                        className="edit-link"
                                        data-toggle="modal"
                                        href="#edit_personal_details"
                                      >
                                        <i className="fa fa-edit mr-1" />
                                        Edit
                                      </a> */}
                                    </h5>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Name
                                      </p>
                                      <p className="col-sm-10">John Doe</p>
                                    </div>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Date of Birth
                                      </p>
                                      <p className="col-sm-10">24 Jul 1983</p>
                                    </div>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Email ID
                                      </p>
                                      <p className="col-sm-10">johndoe@example.com</p>
                                    </div>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Mobile
                                      </p>
                                      <p className="col-sm-10">305-310-5857</p>
                                    </div>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0">
                                        Address
                                      </p>
                                      <p className="col-sm-10 mb-0">
                                        4663 Agriculture Lane,
                                        <br />
                                        Miami,
                                        <br />
                                        Florida - 33165,
                                        <br />
                                        United States.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="modal fade"
                                  id="edit_personal_details"
                                  aria-hidden="true"
                                  role="dialog"
                                >
                                  <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">Personal Details</h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <form>
                                          <div className="row form-row">
                                            <div className="col-12 col-sm-6">
                                              <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" defaultValue="John" />
                                              </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                              <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" defaultValue="Doe" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Date of Birth</label>
                                                <div className="cal-icon">
                                                  <input type="text" className="form-control" defaultValue="24-07-1983" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Email ID</label>
                                                <input type="email" className="form-control" defaultValue="johndoe@example.com" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Mobile</label>
                                                <input type="text" className="form-control" defaultValue="305-310-5857" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" defaultValue="4663 Agriculture Lane" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>City</label>
                                                <input type="text" className="form-control" defaultValue="Miami" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>State</label>
                                                <input type="text" className="form-control" defaultValue="Florida" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Zip Code</label>
                                                <input type="text" className="form-control" defaultValue="33165" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Country</label>
                                                <input type="text" className="form-control" defaultValue="United States" />
                                              </div>
                                            </div>
                                          </div>
                                          <button type="submit" className="btn btn-primary btn-block">
                                            Save Changes
                                          </button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div id="password_tab" className="tab-pane fade">
                          <div className="row">
                              <div className="col-lg-12">
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-between">
                                      <span>Qualifications</span>
                                      {/* <a
                                        className="edit-link"
                                        data-toggle="modal"
                                        href="#edit_personal_details"
                                      >
                                        <i className="fa fa-edit mr-1" />
                                        Edit
                                      </a> */}
                                    </h5>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Qualification
                                      </p>
                                      <p className="col-sm-10">M.B.B.S</p>
                                    </div>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                      College 
                                      </p>
                                      <p className="col-sm-10">PUMBA</p>
                                    </div>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Year of Completion
                                      </p>
                                      <p className="col-sm-10">2012</p>
                                    </div>
                                    
                                    
                                  </div>
                                </div>
                                {/* edit personal details */}
                                <div
                                  className="modal fade"
                                  id="edit_personal_details"
                                  aria-hidden="true"
                                  role="dialog"
                                >
                                  <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">Personal Details</h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <form>
                                          <div className="row form-row">
                                            <div className="col-12 col-sm-6">
                                              <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" defaultValue="John" />
                                              </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                              <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" defaultValue="Doe" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Date of Birth</label>
                                                <div className="cal-icon">
                                                  <input type="text" className="form-control" defaultValue="24-07-1983" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Email ID</label>
                                                <input type="email" className="form-control" defaultValue="johndoe@example.com" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Mobile</label>
                                                <input type="text" className="form-control" defaultValue="305-310-5857" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" defaultValue="4663 Agriculture Lane" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>City</label>
                                                <input type="text" className="form-control" defaultValue="Miami" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>State</label>
                                                <input type="text" className="form-control" defaultValue="Florida" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Zip Code</label>
                                                <input type="text" className="form-control" defaultValue="33165" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Country</label>
                                                <input type="text" className="form-control" defaultValue="United States" />
                                              </div>
                                            </div>
                                          </div>
                                          <button type="submit" className="btn btn-primary btn-block">
                                            Save Changes
                                          </button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                          {/* licence tab */}
                          <div id="licence_tab" className="tab-pane fade">
                          <div className="row">
                              <div className="col-lg-12">
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-between">
                                      <span>Medical Licence Details</span>
                                     
                                    </h5>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Licence No.
                                      </p>
                                      <p className="col-sm-10">MH/1043</p>
                                    </div>
                                    <div className="row">
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        Year of issue
                                      </p>
                                      <p className="col-sm-10">2012</p>
                                    </div>
                                    <div className="row">
                                    <h5 className="card-title d-flex justify-content-between">
                                      <span>Certificate</span>
                                     
                                    </h5>
                                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                        File Name
                                      </p>
                                      <p className="col-sm-5"><button className="book-btn">view</button></p>
                                    </div>

                                   
                                  
                                  </div>
                                </div>
                                {/*edit  */}
                                <div
                                  className="modal fade"
                                  id="edit_personal_details"
                                  aria-hidden="true"
                                  role="dialog"
                                >
                                  <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title">Personal Details</h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <form>
                                          <div className="row form-row">
                                            <div className="col-12 col-sm-6">
                                              <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" defaultValue="John" />
                                              </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                              <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" defaultValue="Doe" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Date of Birth</label>
                                                <div className="cal-icon">
                                                  <input type="text" className="form-control" defaultValue="24-07-1983" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Email ID</label>
                                                <input type="email" className="form-control" defaultValue="johndoe@example.com" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Mobile</label>
                                                <input type="text" className="form-control" defaultValue="305-310-5857" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" defaultValue="4663 Agriculture Lane" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>City</label>
                                                <input type="text" className="form-control" defaultValue="Miami" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>State</label>
                                                <input type="text" className="form-control" defaultValue="Florida" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Zip Code</label>
                                                <input type="text" className="form-control" defaultValue="33165" />
                                              </div>
                                            </div>
                                            <div className="col-12">
                                              <div className="form-group">
                                                <label>Country</label>
                                                <input type="text" className="form-control" defaultValue="United States" />
                                              </div>
                                            </div>
                                          </div>
                                          <button type="submit" className="btn btn-primary btn-block">
                                            Save Changes
                                          </button>
                                        </form>
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
                {/* <div className="sidebar-overlay" data-reff /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocPersonalProfile;
