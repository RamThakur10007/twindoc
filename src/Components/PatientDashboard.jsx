import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import axios from "axios";
import { OrderState } from "../Contexts";
export default function Patientdashboard() {
  const [currentPageToday, setCurrentPageToday] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPageHistory, setCurrentPageHistory] = useState(1);
  const [itemsPerPage] = useState(5);
  const [patientInfo, setPatientInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [today, setToday] = useState([]);

  const { setSelectedAppointment, setIsLoggedIn } = OrderState();

  const navigate = useNavigate();

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

  const todayStartIndex = (currentPageToday - 1) * itemsPerPage;
  const todayEndIndex = currentPageToday * itemsPerPage;
  const todayAppointments = today.slice(todayStartIndex, todayEndIndex);

  // Upcoming Section
  const upcomingStartIndex = (currentPageUpcoming - 1) * itemsPerPage;
  const upcomingEndIndex = currentPageUpcoming * itemsPerPage;
  const upcomingAppointments = upcoming.slice(
    upcomingStartIndex,
    upcomingEndIndex
  );

  // History Section
  const historyStartIndex = (currentPageHistory - 1) * itemsPerPage;
  const historyEndIndex = currentPageHistory * itemsPerPage;
  const historyAppointments = appointments.slice(
    historyStartIndex,
    historyEndIndex
  );

  const paginate1 = (pageNumber) => setCurrentPageToday(pageNumber);
  const paginate2 = (pageNumber) => setCurrentPageUpcoming(pageNumber);
  const paginate3 = (pageNumber) => setCurrentPageHistory(pageNumber);

  const getAllAppointments = async (id, isAuthenticated) => {
    console.log(id);
    try {
      const data = await axios.post(
        "https://healthbackend-3xh2.onrender.com/appointment/patientappointments",
        {
          patientId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(data);
      const appointments = data.data.result;
      const today = new Date();
      const todayAppointmentsArray = [];
      const upcomingAppointmentsArray = [];
      const pastAppointmentsArray = [];
      console.log(today + 6000000);
      today.setHours(0, 0, 0, 0);

      appointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.date);
        console.log(appointment.date, appointmentDate);
        if (appointmentDate < today) {
          pastAppointmentsArray.push(appointment);
        } else {
          // const currentDate = today;
          // currentDate.setHours(0, 0, 0, 0);
          if (appointmentDate.toDateString() === today.toDateString()) {
            todayAppointmentsArray.push(appointment);
          } else {
            upcomingAppointmentsArray.push(appointment);
          }
        }
      });

      console.log(todayAppointmentsArray);
      console.log(upcomingAppointmentsArray);
      console.log(pastAppointmentsArray);
      setToday(todayAppointmentsArray);
      setUpcoming(upcomingAppointmentsArray);
      setAppointments(pastAppointmentsArray);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(today);

  const handleJoin = (meetingId) => {
    // console.log(meetingId);
    navigate(`/room/${meetingId}`);
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    navigate(`/user/appointment/${appointment?._id}`);
  };

  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patientInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userInfo);
    const isAuthenticated = localStorage.getItem("token");
    if (patientInfo) {
      getAllAppointments(patientInfo?._id, isAuthenticated);
    }
    if (userInfo.role !== "user") {
      navigate("/");
    }

    window.scrollTo(0, 0);
  }, []);

  console.log(upcoming);

 
  return (
    <>
      <div className="main-wrapper">
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
                        <li className="active">
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
                        <li>
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
                {/* <div className="row">
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img
                            src="assets/img/specialities/pt-dashboard-01.png"
                            alt="heart-image"
                            width={55}
                          />
                        </div>
                        <h5>Heart Rate</h5>
                        <h6>
                          12 <sub>bpm</sub>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img
                            src="assets/img/specialities/pt-dashboard-02.png"
                            alt="thermometer-image"
                            width={55}
                          />
                        </div>
                        <h5>Body Temperature</h5>
                        <h6>
                          18 <sub>C</sub>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img
                            src="assets/img/specialities/pt-dashboard-03.png"
                            alt="hospital-equipment"
                            width={55}
                          />
                        </div>
                        <h5>Glucose Level</h5>
                        <h6>70 - 90</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-3 patient-dashboard-top">
                    <div className="card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <img
                            src="assets/img/specialities/pt-dashboard-04.png"
                            alt="hospital-equipment"
                            width={55}
                          />
                        </div>
                        <h5>Blood Pressure</h5>
                        <h6>
                          202/90 <sub>mg/dl</sub>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="row patient-graph-col">
                  <div className="col-12"></div>
                </div>
                <div className="card">
                  <div className="card-body pt-0">
                    <nav className="user-tabs mb-4">
                      <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#pat_appointment"
                            data-bs-toggle="tab">
                            Appointments
                          </a>
                        </li>
                      </ul>
                    </nav>
                    {/* <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#pat_prescriptions"
                            data-bs-toggle="tab"
                          >
                            Prescriptions
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#pat_medical_records"
                            data-bs-toggle="tab"
                          >
                            <span className="med-records">Medical Records</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#pat_billing"
                            data-bs-toggle="tab"
                          >
                            Billing
                          </a>
                        </li> */}

                    <div className="tab-content pt-0">
                      <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#today-appointments"
                            data-bs-toggle="tab">
                            Today
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#upcoming-appointments"
                            data-bs-toggle="tab">
                            Upcoming
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#history-appointments"
                            data-bs-toggle="tab"
                            // onClick={() =>
                            //   getAllAppointments(
                            //     doctorInfo._id,
                            //     isAuthenticated,
                            //     true
                            //   )
                            // }
                          >
                            History
                          </a>
                        </li>
                      </ul>
                      <br />
                      <div
                        id="today-appointments"
                        className="tab-pane fade show active">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Physician</th>
                                    <th>Apt Date & Time</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {todayAppointments?.map((row, index) => (
                                    <tr key={index}>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                           
                                            className="avatar avatar-sm me-2">
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={
                                                row?.doctor?.profilePicture ||
                                                "assets/img/doctors/doctor-thumb-02.jpg"
                                              }
                                              alt="User Image"
                                            />
                                          </a>
                                          <a >
                                            {row?.doctor.userId.name}{" "}
                                            <span>
                                              {row.doctor.specialization}
                                            </span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        {new Date(row.date).toLocaleString(
                                          "en-US",
                                          {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                          }
                                        )}
                                      </td>

                                      <td>
                                        <div className="table-action">
                                          <button
                                            className="btn btn-sm bg-info-light me-2"
                                            onClick={() =>
                                              handleJoin(row?.meetingId)
                                            }>
                                            Join
                                          </button>

                                          <button
                                            className="btn btn-sm bg-info-light me-2"
                                            onClick={() =>
                                              handleAppointmentSelect(row)
                                            }>
                                            <i className="far fa-eye" /> View
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={today.length}
                                paginate={paginate1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="upcoming-appointments"
                        className="tab-pane fade ">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Physician</th>
                                    <th>Appt. Date and Time</th>
                                    {/* <th>Action</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {upcomingAppointments.map((row, index) => (
                                    <tr key={index}>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                            
                                            className="avatar avatar-sm me-2">
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={
                                                row?.doctor?.profilePicture ||
                                                "assets/img/doctors/doctor-thumb-02.jpg"
                                              }
                                              alt="User Image"
                                            />
                                          </a>
                                          <a >
                                            {row.doctor.userId.name}{" "}
                                            <span>
                                              {row.doctor.specialization}
                                            </span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        {/* {new Date(row.date).toDateString(
                                          row?.date
                                        )} */}
                                        {new Date(row.date).toLocaleString(
                                          "en-US",
                                          {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                          }
                                        )}
                                      </td>
                                      {/* <td>
                                        <div className="table-action">
                                          <button className="btn btn-sm bg-info-light me-2">
                                            <i className="fas fa-sign-in-alt" />{" "}
                                            Join
                                          </button>
                                          <button className="btn btn-sm bg-info-light">
                                            <i className="far fa-eye" /> View
                                          </button>
                                        </div>
                                      </td> */}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={upcoming.length}
                                paginate={paginate2}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="history-appointments" className="tab-pane fade">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Physician</th>
                                    <th>Appointment Date and Time</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {historyAppointments.map((row, index) => (
                                    <tr key={index}>
                                      <td>
                                        <h2 className="table-avatar">
                                          <a
                                           
                                            className="avatar avatar-sm me-2">
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={
                                                row?.doctor?.profilePicture ||
                                                "assets/img/doctors/doctor-thumb-02.jpg"
                                              }
                                              alt="User Image"
                                            />
                                          </a>
                                          <a href="doctor-profile.html">
                                            {row?.doctor?.userId?.name}{" "}
                                            <span>
                                              {row?.doctor?.specialization}
                                            </span>
                                          </a>
                                        </h2>
                                      </td>
                                      <td>
                                        {new Date(row.date).toLocaleString(
                                          "en-US",
                                          {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                          }
                                        )}
                                      </td>
                                      <td>
                                        <div className="table-action">
                                          <button
                                            className="btn btn-sm bg-info-light me-2"
                                            onClick={() =>
                                              handleAppointmentSelect(row)
                                            }>
                                            <i className="far fa-eye" /> View
                                          </button>
                                          {/* <button className="btn btn-sm bg-info-light">
                                            <i className="far fa-eye" /> 
                                          </button> */}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={appointments.length}
                                paginate={paginate3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="tab-pane fade" id="pat_prescriptions">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Date </th>
                                    <th>Name</th>
                                    <th>Created by </th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
  {prescriptions.map((prescription, index) => (
    <tr key={index}>
      <td>{prescription.date}</td>
      <td>{prescription.prescription}</td>
      <td>
        <h2 className="table-avatar">
          <a href={prescription.doctor.profileUrl} className="avatar avatar-sm me-2">
            <img
              className="avatar-img rounded-circle"
              src={prescription.doctor.avatar}
              alt="Doctor Avatar"
            />
          </a>
          <a href={prescription.doctor.profileUrl}>
            {prescription.doctor.name} <span>{prescription.doctor.speciality}</span>
          </a>
        </h2>
      </td>
      <td>
        <div className="table-action">
         
          <a  className="btn btn-sm bg-info-light">
            <i className="far fa-eye" /> View
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
                      </div> */}
                      {/* <div id="pat_medical_records" className="tab-pane fade">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Date </th>
                                    <th>Description</th>
                                    <th>Attachment</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0010</a>
                                    </td>
                                    <td>14 Nov 2023</td>
                                    <td>Dental Filling</td>
                                    <td>
                                      <a href="#">dental-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-01.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Ruby Perrin <span>Dental</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0009</a>
                                    </td>
                                    <td>13 Nov 2023</td>
                                    <td>Teeth Cleaning</td>
                                    <td>
                                      <a href="#">dental-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-02.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Darren Elder <span>Dental</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0008</a>
                                    </td>
                                    <td>12 Nov 2023</td>
                                    <td>General Checkup</td>
                                    <td>
                                      <a href="#">cardio-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-03.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Deborah Angel{" "}
                                          <span>Cardiology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0007</a>
                                    </td>
                                    <td>11 Nov 2023</td>
                                    <td>General Test</td>
                                    <td>
                                      <a href="#">general-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-04.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Sofia Brient <span>Urology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0006</a>
                                    </td>
                                    <td>10 Nov 2023</td>
                                    <td>Eye Test</td>
                                    <td>
                                      <a href="#">eye-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-05.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Marvin Campbell{" "}
                                          <span>Ophthalmology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0005</a>
                                    </td>
                                    <td>9 Nov 2023</td>
                                    <td>Leg Pain</td>
                                    <td>
                                      <a href="#">ortho-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-06.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Katharine Berthold{" "}
                                          <span>Orthopaedics</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0004</a>
                                    </td>
                                    <td>8 Nov 2023</td>
                                    <td>Head pain</td>
                                    <td>
                                      <a href="#">neuro-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-07.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Linda Tobin <span>Neurology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0003</a>
                                    </td>
                                    <td>7 Nov 2023</td>
                                    <td>Skin Alergy</td>
                                    <td>
                                      <a href="#">alergy-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-08.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Paul Richard{" "}
                                          <span>Dermatology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0002</a>
                                    </td>
                                    <td>6 Nov 2023</td>
                                    <td>Dental Removing</td>
                                    <td>
                                      <a href="#">dental-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-09.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. John Gibbs <span>Dental</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="javascript:void(0);">#MR-0001</a>
                                    </td>
                                    <td>5 Nov 2023</td>
                                    <td>Dental Filling</td>
                                    <td>
                                      <a href="#">dental-test.pdf</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-10.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Olga Barlow <span>Dental</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* <div id="pat_billing" className="tab-pane fade">
                        <div className="card card-table mb-0">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Invoice No</th>
                                    <th>Doctor</th>
                                    <th>Amount</th>
                                    <th>Paid On</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0010</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-01.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Ruby Perrin <span>Dental</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$450</td>
                                    <td>14 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0009</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-02.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Darren Elder <span>Dental</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$300</td>
                                    <td>13 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0008</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-03.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Deborah Angel{" "}
                                          <span>Cardiology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$150</td>
                                    <td>12 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0007</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-04.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Sofia Brient <span>Urology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$50</td>
                                    <td>11 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0006</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-05.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Marvin Campbell{" "}
                                          <span>Ophthalmology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$600</td>
                                    <td>10 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0005</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-06.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Katharine Berthold{" "}
                                          <span>Orthopaedics</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$200</td>
                                    <td>9 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0004</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-07.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Linda Tobin <span>Neurology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$100</td>
                                    <td>8 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0003</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-08.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Paul Richard{" "}
                                          <span>Dermatology</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$250</td>
                                    <td>7 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0002</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-09.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. John Gibbs <span>Dental</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$175</td>
                                    <td>6 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <a href="invoice-view.html">#INV-0001</a>
                                    </td>
                                    <td>
                                      <h2 className="table-avatar">
                                        <a
                                          href="doctor-profile.html"
                                          className="avatar avatar-sm me-2"
                                        >
                                          <img
                                            className="avatar-img rounded-circle"
                                            src="assets/img/doctors/doctor-thumb-10.jpg"
                                            alt="User Image"
                                          />
                                        </a>
                                        <a href="doctor-profile.html">
                                          Dr. Olga Barlow <span>#0010</span>
                                        </a>
                                      </h2>
                                    </td>
                                    <td>$550</td>
                                    <td>5 Nov 2023</td>
                                    <td>
                                      <div className="table-action">
                                        <a
                                          href="invoice-view.html"
                                          className="btn btn-sm bg-info-light"
                                        >
                                          <i className="far fa-eye" /> View
                                        </a>
                                        <a
                                          href="javascript:void(0);"
                                          className="btn btn-sm bg-primary-light"
                                        >
                                          <i className="fas fa-print" /> Print
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="graph1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">BMI Status</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div id="bmi-status" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="graph2">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Heart Rate Status</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div id="heartrate-status" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="graph3">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">FBC Status</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div id="fbc-status" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade custom-modal" id="graph4">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Weight Status</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div id="weight-status" />
            </div>
          </div>
        </div>
      </div>
      {/* Mirrored from TwinsisTech.dreamstechnologies.com/html/template/patient-dashboard.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Apr 2024 16:46:24 GMT */}
    </>
  );
}
