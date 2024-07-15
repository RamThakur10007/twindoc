import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OrderState } from "../../Contexts";

export default function Invoiceview() {
  const { selectedDoctor} = OrderState();

  const [patientInfo , setPatientInfo] = useState(null)

  // console.log(patientInfo) 

  useEffect (() => {
    
    const patientInfo = JSON.parse(localStorage.getItem('patientInfo'));

    if(patientInfo)
    setPatientInfo(patientInfo)
  },[])

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
                <h2 className="breadcrumb-title">Invoice</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">

                    <li className="breadcrumb-item" aria-current="page">
                      <span>Go to </span> <Link to="/user/dashboard">Dashboard</Link><hr />
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div />
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="invoice-content">
                  <div className="invoice-item">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="invoice-logo">
                          <img
                            src="/assets/img/favicon/20240505_203516.png"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <p className="invoice-details">
                          <strong>Order:</strong> #00124 <br />
                          <strong>Issued:</strong> {`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-item">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="invoice-info">
                          <strong className="customer-text">
                            Invoice From
                          </strong>
                          <p className="invoice-details invoice-details-two">
                            Dr. {selectedDoctor?.userId?.name} <br />

                            {selectedDoctor &&
                              selectedDoctor?.educationDetails &&
                              selectedDoctor?.educationDetails.map((edu, index) => (
                                <p key={index}>{edu.qualification}</p>
                              ))}

                            {selectedDoctor?.city}, {selectedDoctor?.contry}
                            <br />
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="invoice-info invoice-info2">
                          <strong className="customer-text">Invoice To</strong>
                          <p className="invoice-details">
                          {patientInfo?.userId?.name} <br />
                           {patientInfo?.city} <br />
                            {patientInfo?.contry} <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-item">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="invoice-info">
                          <strong className="customer-text">
                            Payment Method
                          </strong>
                          <p className="invoice-details invoice-details-two">
                            Razor Pay <br />
                            XXXXXXXXXXXX-2541 <br />
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice-item invoice-table-wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="invoice-table table table-bordered">
                            <thead>
                              <tr>
                                <th>Description</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">VAT</th>
                                <th className="text-end">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>General Consultation</td>
                                <td className="text-center">1</td>
                                <td className="text-center">₹ 0</td>
                                <td className="text-end">₹ {selectedDoctor?.fees}</td>
                              </tr>
                              <tr>
                                <td>Video Call Booking</td>
                                <td className="text-center">1</td>
                                <td className="text-center">₹ 0</td>
                                <td className="text-end">₹ 60</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-6 col-xl-4 ms-auto">
                        <div className="table-responsive">
                          <table className="invoice-table-two table">
                            <tbody>
                              {/* <tr>
                                <th>Subtotal:</th>
                                <td>
                                  <span>₹ 350</span>
                                </td>
                              </tr>
                              <tr>
                                <th>Discount:</th>
                                <td>
                                  <span>-10%</span>
                                </td>
                              </tr> */}
                              <tr>
                                <th>Total Amount:</th>
                                <td>
                                  <span>₹ {selectedDoctor?.fees + 60 }</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Advertisement Section */}

                  <div className=" mt-5">
                    <div className="copyright">
                      <div className="row">
                        <div className="">
                          <div className="copyright-text">
                            <p className="mb-0">
                              {" "}
                              Copyright © 2024 <a>TwinsisTech</a> All Rights
                              Reserved
                            </p>
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
    </>
  );
}
