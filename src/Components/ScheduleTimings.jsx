import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderState } from "../Contexts";

const generateTimeSlots = () => {
  const slots = [];
  const startTime = new Date().setHours(0, 0, 0, 0); // Start time at 00:00 AM
  const endTime = new Date().setHours(23, 59, 59, 999); // End time at 11:59 PM

  for (let time = startTime; time <= endTime; time += 30 * 60 * 1000) {
    const startTimeString = new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endTimeString = new Date(time + 30 * 60 * 1000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit", hour12: true }
    );
    slots.push(`${startTimeString} to ${endTimeString}`);
  }

  return slots;
};

export default function ScheduleTime() {
  const { setIsLoggedIn } = OrderState();
  const [slotDuration, setSlotDuration] = useState("30 mins");
  const [copyToAllDays, setCopyToAllDays] = useState(false);
  const [schedule, setSchedule] = useState({});
  const [selectedSlots, setSelectedSlots] = useState({
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  });
  const [doctorInfo, setDoctorInfo] = useState("");

  // console.log(selectedSlots)

  const handleSlotClick = (day, slot) => {
    const newSlot = {
      time: slot,
      isBooked: false,
    };

    const isSelected = selectedSlots[day].some(
      (selectedSlot) => selectedSlot.time === newSlot.time
    );

    if (isSelected) {
      setSelectedSlots({
        ...selectedSlots,
        [day]: selectedSlots[day].filter(
          (selectedSlot) => selectedSlot.time !== newSlot.time
        ),
      });
    } else {
      setSelectedSlots({
        ...selectedSlots,
        [day]: [...selectedSlots[day], newSlot],
      });
    }
  };

  const handleCopySlotsToAllDays = () => {
    const mondaySlots = selectedSlots.monday;
    const updatedTimeSlots = { ...selectedSlots };

    if (copyToAllDays) {
      // Clear slots from all days except Monday and Sunday
      Object.keys(updatedTimeSlots).forEach((day) => {
        if (day !== "monday") {
          updatedTimeSlots[day] = [];
        }
      });
    } else {
      // Copy Monday slots to all days except Monday and Sunday
      Object.keys(updatedTimeSlots).forEach((day) => {
        if (day !== "monday") {
          updatedTimeSlots[day] = [...mondaySlots];
        }
      });
    }

    setSelectedSlots(updatedTimeSlots);
    setCopyToAllDays(!copyToAllDays);
  };

  const handleSubmit = async () => {
    const isAuthenticated = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://healthbackend-3xh2.onrender.com/doctor/${schedule.userId._id}/update`,
        {
          schedules: selectedSlots,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: isAuthenticated,
          },
        }
      );

      // console.log(response);

      toast("Time slots updated successfully.", {
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

      const doctor = await axios.get(
        `https://healthbackend-3xh2.onrender.com/doctor/${schedule.userId._id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: isAuthenticated,
          },
        }
      );
      // Store the token securely
      await localStorage.setItem(
        "docInfo",
        JSON.stringify(doctor.data.result.doctor)
      );
    } catch (error) {
      toast.error("Failed to update time slots. Please try again later.", {
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
  };

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
    const t = JSON.parse(localStorage.getItem("docInfo"));
    if (t) {
      setSchedule(t);
      setSelectedSlots(t.schedules);
      setDoctorInfo(t);
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
                <h2 className="breadcrumb-title">Schedule Timings</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Schedule Timings
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
                        {/* <li>
                          <Link to="/appointments">
                            <i className="fas fa-calendar-check" />
                            <span>Appointments</span>
                          </Link>
                        </li> */}
                        <li className="active">
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
                        <h4 className="card-title">Schedule Timings</h4>
                        <div className="profile-box">
                          <div className="row">
                            <div className="col-lg-4">
                              {/* <div className="mb-3">
                                <label className="durations">
                                  Timing Slot Duration
                                </label>
                                <select 
                                value={slotDuration}
                                onChange={(event) => setSlotDuration(event.target.value)}
                                className="form-select form-control">
                                  <option>-</option>
                                  <option>15 mins</option>
                                  <option selected="selected">30 mins</option>
                                  <option>45 mins</option>
                                  <option>1 Hour</option>
                                </select>
                              </div> */}
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={copyToAllDays}
                            onChange={handleCopySlotsToAllDays}
                          />{" "}
                          Copy Monday slots to all days
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card schedule-widget mb-0">
                                <div className="schedule-header">
                                  <div className="schedule-nav">
                                    <ul className="nav nav-tabs nav-justified">
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#slot_sunday">
                                          Sunday
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link active"
                                          data-bs-toggle="tab"
                                          href="#slot_monday">
                                          Monday
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#slot_tuesday">
                                          Tuesday
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#slot_wednesday">
                                          Wednesday
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#slot_thursday">
                                          Thursday
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#slot_friday">
                                          Friday
                                        </a>
                                      </li>
                                      <li className="nav-item">
                                        <a
                                          className="nav-link"
                                          data-bs-toggle="tab"
                                          href="#slot_saturday">
                                          Saturday
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="tab-content schedule-cont">
                                  <div
                                    id="slot_sunday"
                                    className="tab-pane fade">
                                    <h4 className="card-title d-flex justify-content-between">
                                      <span>Time Slots</span>
                                     
                                    </h4>

                                    <div
                                      className="doc-times"
                                      style={{ gap: "1px" }}>
                                      {generateTimeSlots().map(
                                        (timeSlot, index) => (
                                          <button
                                            className={`col-lg-2 col-md-4 mx-auto doc-slot-list ${
                                              selectedSlots["sunday"]?.includes(
                                                timeSlot
                                              )
                                                ? ""
                                                : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                              handleSlotClick(
                                                "sunday",
                                                timeSlot
                                              )
                                            }
                                            style={{
                                              borderColor: selectedSlots[
                                                "sunday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              color: selectedSlots[
                                                "sunday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#ffffff"
                                                : "",
                                              backgroundColor: selectedSlots[
                                                "sunday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              border: selectedSlots[
                                                "sunday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "1px solid #42c0fb"
                                                : "",
                                            }}>
                                            {timeSlot}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    id="slot_monday"
                                    className="tab-pane fade show active">
                                    <h4 className="card-title d-flex justify-content-between">
                                      <span>Time Slots</span>
                                      {/* <a
                                        className="edit-link"
                                        data-bs-toggle="modal"
                                        href="#add_time_slot_monday">
                                        <i className="fa fa-plus-circle" /> Add
                                        Slot
                                      </a> */}
                                    </h4>

                                    <div className="doc-times gap-lg-1">
                                      {generateTimeSlots().map(
                                        (timeSlot, index) => (
                                          <button
                                            className={`col-lg-2 col-md-4 mx-auto doc-slot-list ${
                                              selectedSlots["monday"]?.includes(
                                                timeSlot
                                              )
                                                ? ""
                                                : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                              handleSlotClick(
                                                "monday",
                                                timeSlot
                                              )
                                            }
                                            style={{
                                              borderColor: selectedSlots[
                                                "monday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              color: selectedSlots[
                                                "monday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#ffffff"
                                                : "",
                                              backgroundColor: selectedSlots[
                                                "monday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              border: selectedSlots[
                                                "monday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "1px solid #42c0fb"
                                                : "",
                                            }}>
                                            {timeSlot}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    id="slot_tuesday"
                                    className="tab-pane fade">
                                    <h4 className="card-title d-flex justify-content-between">
                                      <span>Time Slots</span>
                                      {/* <a
                                        className="edit-link"
                                        data-bs-toggle="modal"
                                        href="#add_time_slot_tuesday">
                                        <i className="fa fa-plus-circle" /> Add
                                        Slot
                                      </a> */}
                                    </h4>
                                    <div className="doc-times gap-lg-1">
                                      {generateTimeSlots().map(
                                        (timeSlot, index) => (
                                          <button
                                            className={`col-lg-2 col-md-4 mx-auto doc-slot-list ${
                                              selectedSlots[
                                                "tuesday"
                                              ]?.includes(timeSlot)
                                                ? ""
                                                : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                              handleSlotClick(
                                                "tuesday",
                                                timeSlot
                                              )
                                            }
                                            style={{
                                              borderColor: selectedSlots[
                                                "tuesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              color: selectedSlots[
                                                "tuesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#ffffff"
                                                : "",
                                              backgroundColor: selectedSlots[
                                                "tuesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              border: selectedSlots[
                                                "tuesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "1px solid #42c0fb"
                                                : "",
                                            }}>
                                            {timeSlot}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    id="slot_wednesday"
                                    className="tab-pane fade">
                                    <h4 className="card-title d-flex justify-content-between">
                                      <span>Time Slots</span>
                                      {/* <a
                                        className="edit-link"
                                        data-bs-toggle="modal"
                                        href="#add_time_slot_wednesday">
                                        <i className="fa fa-plus-circle" /> Add
                                        Slot
                                      </a> */}
                                    </h4>
                                    <div className="doc-times gap-lg-1">
                                      {generateTimeSlots().map(
                                        (timeSlot, index) => (
                                          <button
                                            className={`col-lg-2 col-md-4 mx-auto doc-slot-list ${
                                              selectedSlots[
                                                "wednesday"
                                              ]?.includes(timeSlot)
                                                ? ""
                                                : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                              handleSlotClick(
                                                "wednesday",
                                                timeSlot
                                              )
                                            }
                                            style={{
                                              borderColor: selectedSlots[
                                                "wednesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              color: selectedSlots[
                                                "wednesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#ffffff"
                                                : "",
                                              backgroundColor: selectedSlots[
                                                "wednesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              border: selectedSlots[
                                                "wednesday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "1px solid #42c0fb"
                                                : "",
                                            }}>
                                            {timeSlot}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    id="slot_thursday"
                                    className="tab-pane fade">
                                    <h4 className="card-title d-flex justify-content-between">
                                      <span>Time Slots</span>
                                      {/* <a
                                        className="edit-link"
                                        data-bs-toggle="modal"
                                        href="#add_time_slot_thursday">
                                        <i className="fa fa-plus-circle" /> Add
                                        Slot
                                      </a> */}
                                    </h4>
                                    <div className="doc-times gap-lg-1">
                                      {generateTimeSlots().map(
                                        (timeSlot, index) => (
                                          <button
                                            className={`col-lg-2 col-md-4 mx-auto doc-slot-list ${
                                              selectedSlots[
                                                "thursday"
                                              ]?.includes(timeSlot)
                                                ? ""
                                                : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                              handleSlotClick(
                                                "thursday",
                                                timeSlot
                                              )
                                            }
                                            style={{
                                              borderColor: selectedSlots[
                                                "thursday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              color: selectedSlots[
                                                "thursday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#ffffff"
                                                : "",
                                              backgroundColor: selectedSlots[
                                                "thursday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              border: selectedSlots[
                                                "thursday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "1px solid #42c0fb"
                                                : "",
                                            }}>
                                            {timeSlot}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    id="slot_friday"
                                    className="tab-pane fade">
                                    <h4 className="card-title d-flex justify-content-between">
                                      <span>Time Slots</span>
                                      {/* <a
                                        className="edit-link"
                                        data-bs-toggle="modal"
                                        href="#add_time_slot_friday">
                                        <i className="fa fa-plus-circle" /> Add
                                        Slot
                                      </a> */}
                                    </h4>
                                    <div className="doc-times gap-lg-1">
                                      {generateTimeSlots().map(
                                        (timeSlot, index) => (
                                          <button
                                            className={`col-lg-2 col-md-4 mx-auto doc-slot-list ${
                                              selectedSlots["friday"]?.includes(
                                                timeSlot
                                              )
                                                ? ""
                                                : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                              handleSlotClick(
                                                "friday",
                                                timeSlot
                                              )
                                            }
                                            style={{
                                              borderColor: selectedSlots[
                                                "friday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              color: selectedSlots[
                                                "friday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#ffffff"
                                                : "",
                                              backgroundColor: selectedSlots[
                                                "friday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              border: selectedSlots[
                                                "friday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "1px solid #42c0fb"
                                                : "",
                                            }}>
                                            {timeSlot}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    id="slot_saturday"
                                    className="tab-pane fade">
                                    <h4 className="card-title d-flex justify-content-between">
                                      <span>Time Slots</span>
                                      {/* <a
                                        className="edit-link"
                                        data-bs-toggle="modal"
                                        href="#add_time_slot_saturday">
                                        <i className="fa fa-plus-circle" /> Add
                                        Slot
                                      </a> */}
                                    </h4>
                                    <div className="doc-times gap-lg-1">
                                      {generateTimeSlots().map(
                                        (timeSlot, index) => (
                                          <button
                                            className={`col-lg-2 col-md-4 mx-auto doc-slot-list ${
                                              selectedSlots[
                                                "saturday"
                                              ]?.includes(timeSlot)
                                                ? ""
                                                : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                              handleSlotClick(
                                                "saturday",
                                                timeSlot
                                              )
                                            }
                                            style={{
                                              borderColor: selectedSlots[
                                                "saturday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              color: selectedSlots[
                                                "saturday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#ffffff"
                                                : "",
                                              backgroundColor: selectedSlots[
                                                "saturday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "#42c0fb"
                                                : "",
                                              border: selectedSlots[
                                                "saturday"
                                              ]?.some(
                                                (s) => s.time === timeSlot
                                              )
                                                ? "1px solid #42c0fb"
                                                : "",
                                            }}>
                                            {timeSlot}
                                          </button>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" text-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => handleSubmit()}>
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}