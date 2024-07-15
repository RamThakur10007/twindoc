import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dependent() {
  const [patientInfo, setPatientInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");

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

  const [tableData, setTableData] = useState([
    {
      id: "1",
      name: "Aditya",
      relationship: "Son",
      gender: "Male",
      number: "303-297-6170",
      bloodGroup: "AB+",
    },
    {
      id: "2",
      name: "Jyoti",
      relationship: "Daughter",
      gender: "Female",
      number: "360-822-9097",
      bloodGroup: "B+",
    },
    {
      id: "3",
      name: "Rajendra",
      relationship: "Father",
      gender: "Male",
      number: "720-841-8299",
      bloodGroup: "B+",
    },
    {
      id: "4",
      name: "Sonali",
      relationship: "Mother",
      gender: "Female",
      number: "949-583-4370",
      bloodGroup: "A+",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    gender: "",
    number: "",
    bloodGroup: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddDependent = (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("relationship", formData.relationship);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("bloodGroup", formData.bloodGroup);

    formDataToSend.append("profile_image", formData.profile_image);

    const newMember = {
      name: formData.name,
      relationship: formData.relationship,
      gender: formData.gender,
      number: formData.number,
      bloodGroup: formData.bloodGroup,
    };

    setTableData([...tableData, newMember]);

    setFormData({
      name: "",
      relationship: "",
      gender: "",
      number: "",
      bloodGroup: "",
      profile_image: null,
    });

    console.log(formData);
  };

  // edit

  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patientInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userInfo);
  }, []);

  return (
    <div>
      <div className="main-wrapper ">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Dashboard</h2>
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
                            "assets/img/doctors/doctor-thumb-02.jpg"
                          }
                          alt="assets/img/patients/patient.jpg"
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
                        <li>
                          <Link to="/user/dashboard">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </Link>
                        </li>

                        <li className="active">
                          <Link to="/user/dependent">
                            <i className="fas fa-users" />
                            <span>Dependent</span>
                          </Link>
                        </li>

                        <li>
                          <Link to="/user/orders">
                            <i className="fas fa-list-alt" />
                            <span>Orders</span>
                            <small className="unread-msg">7</small>
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
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-6">
                        <h3 className="card-title">Dependent</h3>
                      </div>

                      <div className="col-sm-6 mobile-profile-btn-top">
                        <div className="text-end">
                          <a
                            href="#modal_form"
                            data-bs-toggle="modal"
                            className="btn btn-primary btn-sm profile-button"
                            tabIndex={0}>
                            Add Dependent
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body ">
                    <div className="card card-table mb-0">
                      <div className="card-body">
                        {/* table-map */}
                        <div className="table-responsive">
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Dependent</th>
                                <th>Relationship</th>
                                <th>Gender</th>
                                <th>Number</th>
                                <th>Blood Group</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.map((row, index) => (
                                <tr key={index}>
                                  <td>
                                    <h2 className="table-avatar">
                                      <span className="avatar avatar-sm me-2">
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={`assets/img/patients/patient${
                                            index + 16
                                          }.jpg`}
                                          alt="User Image"
                                        />
                                      </span>
                                      {row.name}
                                    </h2>
                                  </td>
                                  <td>{row.relationship}</td>
                                  <td>{row.gender}</td>
                                  <td>{row.number}</td>
                                  <td>{row.bloodGroup}</td>
                                  <td>
                                    <div className="table-action">
                                      <a
                                        href="#edit_form"
                                        className="btn btn-sm bg-info-light"
                                        data-bs-toggle="modal">
                                        <i className="fas fa-edit" /> Edit
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        className="btn btn-sm bg-danger-light">
                                        <i className="fas fa-times" /> Deactive
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

      <div
        id="modal_form"
        className="modal fade custom-modal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{ display: "none" }}>
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ marginTop: "110px" }}>
          <div className="modal-content">
            <form onSubmit={handleAddDependent}>
              <div className="modal-header">
                <h5 className="modal-title">Add new member</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="control-label mb-10">
                    {" "}
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">
                    Relationship <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    className="form-control"
                    value={formData.relationship}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-control"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="control-label mb-10">Number </label>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    defaultValue=""
                    readOnly=""
                    className="form-control"
                    value={formData.number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">
                    Blood Group <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="bloodGroup"
                    id="bloodGroup"
                    defaultValue=""
                    readOnly=""
                    className="form-control"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="control-label mb-10">Photo </label>
                  <input
                    type="file"
                    name="profile_image"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer text-center">
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  data-bs-dismiss="modal">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* edit */}
      <div
        id="edit_form"
        className="modal fade custom-modal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{ marginTop: "55px" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h5 className="modal-title">Edit member</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="control-label mb-10">
                    {" "}
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    defaultValue="Christopher"
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Relationship </label>
                  <input
                    type="text"
                    name="relationship"
                    className="form-control"
                    defaultValue="son"
                  />
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">Gender </label>
                  <select className="form-select form-control" name="gender">
                    <option value="">Select</option>
                    <option value="Male" selected="">
                      Male
                    </option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="control-label mb-10">DOB </label>
                  <input
                    type="text"
                    name="dob"
                    id="editdob"
                    defaultValue="01/12/2023"
                    readOnly=""
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="control-label mb-10">Photo </label>
                  <input
                    type="file"
                    name="profile_image"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer text-center">
                <button type="submit" className="btn btn-primary submit-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
