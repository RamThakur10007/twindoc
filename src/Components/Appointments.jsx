import React from "react";
import patient from "./../Components/patient.jpg";
import { Link } from "react-router-dom";

export default function Appointments() {
  return (
    <div>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Appointments</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Appointments
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
                          src="assets/img/doctors/doctor-thumb-02.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>Dr. Darren Elder</h3>
                        <div className="patient-details">
                          <h5 className="mb-0">
                            BDS, MDS - Oral &amp; Maxillofacial Surgery
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
                        <li className="active">
                          <Link to="/physician/appointments">
                            <i className="fas fa-calendar-check" />
                            <span>Appointments</span>
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
                        <li>
                          <Link to="/physician/changepassword">
                            <i className="fas fa-lock" />
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/login">
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
                <div className="appointments">
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img src={patient} alt="User Image" />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Richard Wilson</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 14 Nov 2023, 10.00 AM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Newyork,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="abd9c2c8c3cad9cfebced3cac6dbc7ce85c8c4c6">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 923 782 4575
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient1.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Charlene Reed </a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 12 Nov 2023, 5.00 PM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> North
                            Carolina, United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="cfaca7aebda3aaa1aabdaaaaab8faab7aea2bfa3aae1aca0a2">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 828 632 9170
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient2.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Travis Trimble</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 11 Nov 2023, 8.00 PM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Maine,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="fc888e9d8a958f888e95919e9099bc99849d918c9099d29f9391">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 207 729 9974
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient3.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Carl Kelly</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 9 Nov 2023, 9.00 AM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Newyork,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="98fbf9eaf4f3fdf4f4e1d8fde0f9f5e8f4fdb6fbf7f5">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 260 724 7769
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient4.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Michelle Fairfax</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 9 Nov 2023, 1.00 PM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Indiana,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="5835313b303d34343d3e39312a3e3920183d20393528343d763b3735">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 504 368 6874
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient5.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Gina Moore</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 8 Nov 2023, 3.00 PM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Florida,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="afc8c6c1cec2c0c0ddcaefcad7cec2dfc3ca81ccc0c2">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 954 820 7887
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient6.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Elsie Gilley</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 6 Nov 2023, 9.00 AM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Kentucky,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="abcec7d8c2ceccc2c7c7ced2ebced3cac6dbc7ce85c8c4c6">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 315 384 4562
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient7.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Joan Gardner</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 5 Nov 2023, 12.00 PM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> California,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="96fcf9f7f8f1f7e4f2f8f3e4d6f3eef7fbe6faf3b8f5f9fb">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 707 2202 603
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient8.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Daniel Griffing</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 5 Nov 2023, 7.00 PM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> New Jersey,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="5a3e3b34333f363d28333c3c33343d1a3f223b372a363f74393537">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 973 773 9497
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient9.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Walter Roberson</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 4 Nov 2023, 10.00 AM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Florida,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="14637578607166667b767166677b7a54716c75796478713a777b79">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 850 358 4445
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient10.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Robert Rhodes</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 4 Nov 2023, 11.00 AM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> California,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="14667b76716660667c7b70716754716c75796478713a777b79">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 858 259 5285
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                  <div className="appointment-list">
                    <div className="profile-info-widget">
                      <a
                        href="patient-profile.html"
                        className="booking-doc-img">
                        <img
                          src="assets/img/patients/patient11.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>
                          <a href="patient-profile.html">Harry Williams</a>
                        </h3>
                        <div className="patient-details">
                          <h5>
                            <i className="far fa-clock" /> 3 Nov 2023, 6.00 PM
                          </h5>
                          <h5>
                            <i className="fas fa-map-marker-alt" /> Colorado,
                            United States
                          </h5>
                          <h5>
                            <i className="fas fa-envelope" />{" "}
                            <a
                              className="__cf_email__"
                              data-cfemail="127a7360606b657b7e7e7b737f6152776a737f627e773c717d7f">
                              [email&nbsp;protected]
                            </a>
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-phone" /> +1 303 607 7075
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="appointment-action">
                      <a
                        href="#"
                        className="btn btn-sm bg-info-light"
                        data-bs-toggle="modal"
                        data-bs-target="#appt_details">
                        <i className="far fa-eye" /> View
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-success-light">
                        <i className="fas fa-check" /> Accept
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times" /> Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="appt_details">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Appointment Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="info-details">
                <li>
                  <div className="details-header">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="title">#APT0001</span>
                        <span className="text">21 Oct 2023 10:00 AM</span>
                      </div>
                      <div className="col-md-6">
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn bg-success-light btn-sm"
                            id="topup_status">
                            Completed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <span className="title">Status:</span>
                  <span className="text">Completed</span>
                </li>
                <li>
                  <span className="title">Confirm Date:</span>
                  <span className="text">29 Jun 2023</span>
                </li>
                <li>
                  <span className="title">Paid Amount</span>
                  <span className="text">$450</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
