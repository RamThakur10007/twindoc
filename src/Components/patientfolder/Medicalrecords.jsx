import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderState } from "../../Contexts";

export default function Medicalrecords() {
  const [patientInfo, setPatientInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
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
    const patientInfo = localStorage.getItem("patientInfo");
    if (patientInfo) {
      localStorage.removeItem("patientInfo");
    }
    setIsLoggedIn(false);
  };

  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Rajendra",
      date: "2023-11-01",
      time: "10:00",
      doctor: "Dr.Suresh Joshi",
      medication: "Benzaxapine Croplex",
      self: "Your Self",
    },
    {
      id: 2,
      name: "Jyoti",
      date: "2023-11-03",
      time: "11:00",
      doctor: "Dr.Suresh Joshi",
      medication: "Rapalac Neuronium",
      self: "Your Self",
    },
    {
      id: 3,
      name: "Sonali",
      date: "2023-11-11",
      time: "1:00",
      doctor: "Dr.Suresh Joshi",
      medication: "Ombinazol Bonibamol",
      self: "Your Self",
    },
    {
      id: 4,
      name: "Aditya",
      date: "2023-05-30",
      time: "9:00",
      doctor: "Dr.Suresh Joshi",
      medication: "Dantotate Dantodazole",
      self: "Your Self",
    },
    {
      id: 5,
      name: "Rajendra",
      date: "2023-05-11",
      time: "23:00",
      doctor: "Dr.Suresh Joshi",
      medication: "Acetrace Amionel",
      self: "Your Self",
    },
  ]);

  const [formData, setFormData] = useState({
    medication: "",
    name: "",
    date: "",
    time: "",
    doctor: "",
    hospital: "",
    symptoms: "",
    self: "Your Self",
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Capture the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddRecord = (event) => {
    event.preventDefault();

    // Create FormData object to send data to the server
    const formDataToSend = new FormData();
    // Append other form data fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("medication", formData.medication);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("doctor", formData.doctor);
    formDataToSend.append("self", formData.self);
    // Append the photo file
    formDataToSend.append("user_file", formData.user_file);

    // Create a new member object from form data
    const newMember = {
      name: formData.name,
      medication: formData.medication,
      date: formData.date,
      time: formData.time,
      doctor: formData.doctor,
      self: formData.self,
      // Here you might want to store the URL of the uploaded photo if you handle photo upload on the server
    };

    // Update the table data state with the new member
    setTableData([...tableData, newMember]);

    // Reset the form data state
    setFormData({
      medication: "",
      name: "",
      date: "",
      time: "",
      doctor: "",
      hospital: "",

      user_file: null, // Reset the photo file to null
    });

    console.log(formData);
  };
  const convertTimeTo12HourFormat = (time) => {
    let [hour, minute] = time.split(":");
    let period = "AM";

    if (parseInt(hour, 10) > 12) {
      hour = (parseInt(hour, 10) - 12).toString();
      period = "PM";
    }

    return `${hour}:${minute} ${period}`;
  };

  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patientInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userInfo);

    window.scrollTo(0, 0);
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
        href="assets/plugins/select2/css/select2.min.css"
      />
      <link rel="stylesheet" href="assets/css/custom.css" />
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Medical Records</h2>
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
                          alt="/assets/img/banners/defualtImgjpg.jpg"
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
                        <li>
                          <Link to="/user/labreports">
                            <i className="fas fa-list-alt" />
                            <span>Lab Reports</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/prescriptions">
                            <i className="fas fa-file-invoice" />
                            <span>Prescriptions</span>
                          </Link>
                        </li>
                        <li className="active">
                          <Link to="/user/medical-records">
                            <i className="fas fa-clipboard" />
                            <span>Medical Records</span>
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
                      <div className="card-body pt-0">
                        <nav className="user-tabs mb-4">
                          <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                href="#pat_medicalrecords">
                                Medical Records
                              </a>
                            </li>
                          </ul>
                        </nav>
                        <div className="tab-content pt-0">
                          <div
                            id="pat_medicalrecords"
                            className="tab-pane fade show active">
                            <div className="text-end">
                              <a
                                href="#"
                                className="add-new-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#add_medical_records_modal">
                                Add Medical Records
                              </a>
                            </div>
                            <div className="card card-table mb-0">
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table className="table table-hover table-center mb-0">
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Physician</th>
                                        <th>Description</th>
                                        <th>Attachment</th>
                                        <th>Orderd By</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {/* Mapping over data and rendering table rows */}
                                      {tableData.map((item) => (
                                        <tr key={item.id}>
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>
                                            {item.date}{" "}
                                            <span className="d-block text-info">
                                              {convertTimeTo12HourFormat(
                                                item.time
                                              )}
                                            </span>
                                          </td>
                                          <td>{item.doctor}</td>
                                          <td>{item.medication}</td>
                                          <td>
                                            <a
                                              href="javascript:void(0);"
                                              title="Download attachment"
                                              className="btn btn-primary btn-sm">
                                              <i className="fa fa-download" />
                                            </a>
                                          </td>
                                          <td>{item.self}</td>
                                          <td>
                                            <a
                                              href="javascript:void(0);"
                                              className="btn btn-sm bg-danger-light">
                                              <i className="far fa-trash-alt" />
                                            </a>
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
        </div>
      </div>
      {/* add */}
      <div
        className=" modal fade custom-modal custom-medicalrecord-modal"
        id="add_medical_records_modal"
        style={{ display: "none" }}
        data-select2-id="add_medical_records_modal"
        aria-hidden="true">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
          style={{ marginTop: "110px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Medical Records</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <form id="medical_records_form" onSubmit={handleAddRecord}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label className="mb-2">Title Name</label>
                      <input
                        type="text"
                        name="medication"
                        className="form-control"
                        placeholder="Enter Title Name"
                        value={formData.medication}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label className="mb-2">Patient</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Patient Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="mb-2">
                          Physician Name (Treatment done by)
                        </label>
                        <input
                          type="text"
                          name="doctor"
                          className="form-control"
                          placeholder="Enter Physician name here.."
                          value={formData.doctor}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="mb-2">Upload</label>
                      <div className="upload-medical-records">
                        <input
                          className="form-control"
                          type="file"
                          name="user_file"
                          id="user_files_mr"
                          onChange={handleInputChange}
                        />
                        <div className="upload-content dropzone">
                          <div>
                            <div className="upload-icon mb-2">
                              <img
                                src="assets/img/upload-icon.png"
                                alt="upload-icon"
                              />
                            </div>
                            <h5>Drag &amp; Drop</h5>
                            <h6>
                              or <span className="text-danger">Browse</span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label className="mb-2">Date</label>
                      <div className="mb-3">
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          id="tratment_date"
                          value={formData.date}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="col-12 col-md-6">
                      <div className="mb-3">
                        <label className="mb-2">Time</label>
                        <div className="mb-3">
                          <input
                            type="time"
                            className="form-control"
                            name="time"
                            id="tratment_time"
                            value={formData.time}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <div className="submit-section text-center">
                    <button
                      type="submit"
                      id="medical_btn"
                      className="btn btn-primary submit-btn"
                      data-bs-dismiss="modal">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
