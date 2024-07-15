import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderState } from "../../Contexts";

export default function Bookingsuccess() {
  const {
    selectedDoctor,
    symptoms,
    temperature,
    bloodpresure,
    heartRate,
    reportFiles,
    pdfRefs,
    selectedSlotDay,
    selectedSlotTime,
    selectedDate,
  } = OrderState();
  
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
                <h2 className="breadcrumb-title">Booking</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="content success-page-cont">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card success-card">
                  <div className="card-body">
                    <div className="success-cont">
                      <i className="fas fa-check" />
                      <h3>Appointment booked Successfully!</h3>
                      <p>
                        Appointment booked with{" "}
                        <strong>Dr. {selectedDoctor?.userId?.name}</strong>
                        <br /> on{" "}
                        <strong>
                          {selectedDate} {selectedSlotTime}
                        </strong>
                      </p>
                      <Link
                        to="/user/invoice-view"
                        className="btn btn-primary view-inv-btn">
                        View Invoice
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mirrored from TwinsisTech.dreamstechnologies.com/html/template/booking-success.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Apr 2024 16:46:18 GMT */}
    </>
  );
}
