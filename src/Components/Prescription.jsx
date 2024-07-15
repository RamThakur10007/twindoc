import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { OrderState } from "../Contexts";
import Pagination from "./Pagination";

export default function Prescriptions() {
  const [singleAppointmentDetails, setSingleAppointmentDetails] = useState();
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
  // console.log(selectedPrescriptions)
  const [patientInfo, setPatientInfo] = useState();
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

  // Paginations
  const [itemsPerPage] = useState(5);
  const [currentPageToday, setCurrentPageToday] = useState(1);

  const todayStartIndex = (currentPageToday - 1) * itemsPerPage;
  const todayEndIndex = currentPageToday * itemsPerPage;
  const pageDoctor = prescriptions.slice(todayStartIndex, todayEndIndex);

  const paginate = (pageNumber) => setCurrentPageToday(pageNumber);

  const getAllPrescriptions = async () => {
    const isAuthenticated = localStorage.getItem("token");
    // const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    console.log(isAuthenticated);
    try {
      console.log("here first");
      const response = await axios.get(
        `https://healthbackend-3xh2.onrender.com/appointment/prescriptions/${patientInfo._id}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: isAuthenticated,
          },
        }
      );

      console.log(response);
      setPrescriptions(response.data.result);
      // setDocFilter(response.data.result);
      // setAllPrescriptions(response.data.result);

      // handleSearchFilter(response.data.result);
      // setFilterDoctor(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patient);
  }, []);

  useEffect(() => {
    getAllPrescriptions();
  }, [patientInfo]);
  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);

  
  //   {
  //     date: "14 Nov 2023",
  //     name: "Prescription 1",
  //     doctor: {
  //       name: "Dr. Ruby Perrin",
  //       specialty: "Dental",
  //       avatar: "assets/img/doctors/doctor-thumb-01.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "13 Nov 2023",
  //     name: "Prescription 2",
  //     doctor: {
  //       name: "Dr. Darren Elder",
  //       specialty: "Dental",
  //       avatar: "assets/img/doctors/doctor-thumb-02.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "12 Nov 2023",
  //     name: "Prescription 3",
  //     doctor: {
  //       name: "Dr. Deborah Angel",
  //       specialty: "Cardiology",
  //       avatar: "assets/img/doctors/doctor-thumb-03.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "11 Nov 2023",
  //     name: "Prescription 4",
  //     doctor: {
  //       name: "Dr. Sofia Brient",
  //       specialty: "Urology",
  //       avatar: "assets/img/doctors/doctor-thumb-04.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "10 Nov 2023",
  //     name: "Prescription 5",
  //     doctor: {
  //       name: "Dr. Marvin Campbell",
  //       specialty: "Dental",
  //       avatar: "assets/img/doctors/doctor-thumb-05.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "9 Nov 2023",
  //     name: "Prescription 6",
  //     doctor: {
  //       name: "Dr. Katharine Berthold",
  //       specialty: "Orthopaedics",
  //       avatar: "assets/img/doctors/doctor-thumb-06.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "8 Nov 2023",
  //     name: "Prescription 7",
  //     doctor: {
  //       name: "Dr. Linda Tobin",
  //       specialty: "Neurology",
  //       avatar: "assets/img/doctors/doctor-thumb-07.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "7 Nov 2023",
  //     name: "Prescription 8",
  //     doctor: {
  //       name: "Dr. Paul Richard",
  //       specialty: "Dermatology",
  //       avatar: "assets/img/doctors/doctor-thumb-08.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "6 Nov 2023",
  //     name: "Prescription 9",
  //     doctor: {
  //       name: "Dr. John Gibbs",
  //       specialty: "Dental",
  //       avatar: "assets/img/doctors/doctor-thumb-09.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   {
  //     date: "5 Nov 2023",
  //     name: "Prescription 10",
  //     doctor: {
  //       name: "Dr. Olga Barlow",
  //       specialty: "Dental",
  //       avatar: "assets/img/doctors/doctor-thumb-10.jpg",
  //       profileLink: "doctor-profile.html",
  //     },
  //   },
  //   // Add more prescriptions here if needed
  // ]);

  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Prescriptions</h2>
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
                        <li>
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
                        <li className="active">
                          <Link to="/user/prescriptions">
                            <i className="fas fa-file-invoice" />
                            <span>Prescriptions</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/medical-records">
                            <i className="fas fa-clipboard" />
                            <span> Medical Records</span>
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
                  <div className="card">
                    <div className="col-sm-12">
                      <nav className="user-tabs mb-4">
                        <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              href="#pat_appointment"
                              data-bs-toggle="tab">
                              Prescriptions
                            </a>
                          </li>
                        </ul>
                      </nav>

                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card">
                            <div className="card card-table mb-0">
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table className="table table-hover table-center mb-0">
                                    <thead>
                                      <tr>
                                        <th>ID</th>
                                        <th>Date & Times</th>
                                        <th>Physician Name</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {pageDoctor?.map(
                                        (prescription, index) => (
                                          <tr key={index}>
                                            <td>
                                              <a href="javascript:void(0);">
                                                {todayStartIndex + index + 1}
                                              </a>
                                            </td>
                                            <td>
                                              {/* {new Date(prescription?.date).toDateString(prescription.date)} */}
                                              {new Date(
                                                prescription?.date
                                              ).toLocaleString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                              })}
                                            </td>

                                            <td>
                                              <h2 className="table-avatar">
                                                <a
                                                  href={
                                                    prescription.doctor
                                                      .profileLink
                                                  }
                                                  className="avatar avatar-sm me-2">
                                                  <img
                                                    className="avatar-img rounded-circle"
                                                    src={
                                                      prescription?.doctor
                                                        ?.profilePicture ||
                                                      "assets/img/doctors/doctor-thumb-02.jpg"
                                                    }
                                                  />
                                                </a>
                                                <a
                                                  href={
                                                    prescription.doctor
                                                      .profileLink
                                                  }>
                                                  Dr.{" "}
                                                  {
                                                    prescription?.doctor?.userId
                                                      ?.name
                                                  }{" "}
                                                  <span>
                                                    {
                                                      prescription.doctor
                                                        .specialty
                                                    }
                                                  </span>
                                                </a>
                                              </h2>
                                            </td>
                                            <td>
                                              <div className="table-action">
                                                <button
                                                  className="btn btn-sm bg-info-light me-2"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#add_medical_records_modal"
                                                  onClick={() =>
                                                    setSelectedPrescriptions(
                                                      prescription.prescriptions
                                                    )
                                                  }>
                                                  <i className="far fa-eye" />{" "}
                                                  View
                                                </button>

                                                <a
                                                  href="javascript:void(0);"
                                                  title="Download attachment"
                                                  className="btn btn-primary btn-sm">
                                                  <i className="fa fa-download" />
                                                </a>
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Pagination
                          itemsPerPage={itemsPerPage}
                          totalItems={prescriptions.length}
                          paginate={paginate}
                        />
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
              <h5 className="modal-title">Prescription</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Quantities</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPrescriptions?.map((prescription, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{prescription.name}</td>
                          <td>{prescription.quantity}</td>
                          <td>
                            {prescription.times.map((time, index) => (
                              <span key={index}>{time} </span>
                            ))}
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
    </>
  );
}
