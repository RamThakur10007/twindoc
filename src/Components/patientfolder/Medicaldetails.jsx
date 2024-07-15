import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Medicaldetails() {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Richard Wilson",
      bmi: 23.7,
      heartRate: 89,
      fbcStatus: 140,
      weight: "74Kg",
      orderDate: "11 Nov 2023 10:00 AM",
    },
    {
      id: 2,
      name: "Champagne",
      bmi: 25.2,
      heartRate: 92,
      fbcStatus: 135,
      weight: "73Kg",
      orderDate: "3 Nov 2023 11:00 AM",
    },
    {
      id: 3,
      name: "Vena",
      bmi: 24.5,
      heartRate: 90,
      fbcStatus: 125,
      weight: "73.5Kg",
      orderDate: "1 Nov 2023 1:00 PM",
    },
    {
      id: 4,
      name: "Tressie",
      bmi: 24.2,
      heartRate: 95,
      fbcStatus: 128,
      weight: "10.2Kg",
      orderDate: "30 Oct 2023 9:00 AM",
    },
    {
      id: 5,
      name: "Christopher",
      bmi: 24.7,
      heartRate: 99,
      fbcStatus: 122,
      weight: "12.8Kg",
      orderDate: "28 Oct 2023 6:00 PM",
    },
  ]);
  const [formData, setFormData] = useState({
    id: "",
    bmi: "",
    hr: "",
    weight: "",
    dob: "",
  });
  const [patientInfo, setPatientInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Log form data to the console
    // Here you can perform any additional actions, like sending the data to an API, etc.
  };

  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patientInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userInfo);
  }, []);

  return (
    <>
      <link href="assets/img/favicon.png" rel="icon" />
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link
        rel="stylesheet"
        href="assets/plugins/fontawesome/css/fontawesome.min.css"
      />
      <link
        rel="stylesheet"
        href="assets/plugins/fontawesome/css/all.min.css"
      />
      <link rel="stylesheet" href="assets/css/feather.css" />
      <link
        rel="stylesheet"
        href="assets/plugins/jquery-ui/jquery-ui.min.css"
      />
      <link rel="stylesheet" href="assets/css/custom.css" />
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Medical Details</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Medical Details
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
                          src={patientInfo?.profilePicture}
                          alt="assets/img/patients/patient.jpg"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>Patient</h3>
                        <div className="patient-details">
                          <h5>
                            <i className="fas fa-birthday-cake" />
                            {new Date(patientInfo?.dob).toLocaleDateString(
                              "en-GB",
                              { day: "2-digit", month: "long", year: "numeric" }
                            )}
                            ,{patientInfo?.age} years
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
                        <li>
                          <Link to="/user/dashboard">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </Link>
                        </li>

                        <li>
                          <Link to="/user/dependent">
                            <i className="fas fa-users" />
                            <span>Dependent</span>
                          </Link>
                        </li>
                        {/* <li>
                      <a href="chat.html">
                        <i className="fas fa-comments" />
                        <span>Message</span>
                        <small className="unread-msg">23</small>
                      </a>
                    </li> */}

                        {/* <li>
                          <Link to="/user/orders">
                            <i className="fas fa-list-alt" />
                            <span>Orders</span>
                            <small className="unread-msg">7</small>
                          </Link>
                        </li> */}
                        <li>
                          <Link to="/user/medical-records">
                            <i className="fas fa-clipboard" />
                            <span>Add Medical Records</span>
                          </Link>
                        </li>
                        <li className="active">
                          <Link to="/user/medical-details">
                            <i className="fas fa-file-medical-alt" />
                            <span>Medical Details</span>
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
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title float-start pt-2">
                          Medical details
                        </h4>
                        <a
                          href="#modal_medical_form"
                          className="btn btn-primary float-end"
                          data-bs-toggle="modal">
                          Add Details
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>BMI</th>
                                    <th>Heart Rate</th>
                                    <th>FBC Status</th>
                                    <th>Weight</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* Map over medicalData to render each row */}
                                  {tableData.map((item, index) => (
                                    <tr key={item.id}>
                                      <td>{index + 1}</td>
                                      <td>{item.name}</td>
                                      <td>{item.bmi}</td>
                                      <td>{item.heartRate}</td>
                                      <td>{item.weight}</td>
                                      <td>
                                        {item.orderDate}{" "}
                                        <span className="d-block text-info">
                                          10.00 AM
                                        </span>
                                      </td>
                                      <td>
                                        <div className="table-action">
                                          <a
                                            href="#edit_medical_form"
                                            className="btn btn-sm bg-info-light"
                                            data-bs-toggle="modal">
                                            <i className="fas fa-edit" /> Edit
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-sm bg-danger-light">
                                            <i className="fas fa-trash-alt" />{" "}
                                            Delete
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
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
      <div
        id="modal_medical_form"
        className="modal fade custom-modal"
        tabIndex={-1}
        role="dialog"
        style={{ display: "none", marginTop: "50px" }}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              autoComplete="off"
              method="post">
              <div className="modal-header">
                <h5 className="modal-title">Add new data</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input type="hidden" defaultValue="" name="id" />
                <input type="hidden" defaultValue="insert" name="method" />
                <div className="mb-3">
                  <label className="control-label mb-10">
                    BMI <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="bmi"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.bmi}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Heart rate </label>
                  <input
                    type="text"
                    name="hr"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.hr}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.weight}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Created Date </label>
                  <input
                    type="text"
                    name="dob"
                    id="dob"
                    defaultValue=""
                    readOnly=""
                    className="form-control"
                    onChange={handleChange}
                    value={formData.dob}
                  />
                </div>
              </div>
              <div className="modal-footer text-center">
                <button type="submit" className="btn btn-outline btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        id="edit_medical_form"
        className="modal fade custom-modal"
        tabIndex={-1}
        role="dialog"
        style={{ display: "none", marginTop: "50px" }}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form
              encType="multipart/form-data"
              autoComplete="off"
              method="post">
              <div className="modal-header">
                <h5 className="modal-title">Add new data</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input type="hidden" defaultValue="" name="id" />
                <input type="hidden" defaultValue="insert" name="method" />
                <div className="mb-3">
                  <label className="control-label mb-10">
                    {" "}
                    BMI <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="bmi"
                    className="form-control"
                    defaultValue="23.7"
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Heart rate </label>
                  <input
                    type="text"
                    name="hr"
                    className="form-control"
                    defaultValue={89}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Weight</label>
                  <input
                    type="text"
                    name="Weight"
                    className="form-control"
                    defaultValue={74}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Fbc</label>
                  <input
                    type="text"
                    name="Fbc"
                    className="form-control"
                    defaultValue={140}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Created Date </label>
                  <input
                    type="text"
                    name="dob"
                    id="editdob"
                    defaultValue="11/11/2023"
                    readOnly=""
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer text-center">
                <button type="submit" className="btn btn-outline btn-success ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
