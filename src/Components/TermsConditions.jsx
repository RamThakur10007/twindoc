import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderState } from "../Contexts";

export default function Termscondition() {

  const {selectedDoctor} = OrderState();
  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);
  return (
    <div>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Terms &amp; Condition</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="terms-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="terms-content">
                  <div className="terms-text">
                    <p>
                      By registering as a Physician on our online healthcare
                      platform, you agree to abide by the following terms and
                      conditions:
                    </p>
                  </div>
                  <div className="terms-text terms-list">
                    <p>
                      <i className="fas fa-circle-check" /> As a registered
                      Physician, you must provide accurate and up-to-date
                      information about your credentials, qualifications, and
                      expertise.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You are responsible
                      for maintaining the confidentiality and security of your
                      login credentials. Any unauthorized access to your account
                      should be reported immediately.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" />
                      You agree to use our platform solely for providing
                      professional healthcare services to patients within your
                      scope of practice and expertise.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" />
                      You acknowledge that the information exchanged between you
                      and your patients on our platform is confidential and must
                      be treated as such. Any breach of patient confidentiality
                      is strictly prohibited.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You agree to provide
                      timely and appropriate medical advice and treatment to
                      patients, adhering to the highest standards of medical
                      ethics and professionalism.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You understand that
                      you are solely responsible for the medical decisions and
                      treatments you prescribe to patients through our platform.
                    </p>

                    <p>
                      <i className="fas fa-circle-check" /> You agree to
                      maintain accurate and detailed records of patient
                      consultations and treatments, in compliance with
                      applicable laws and regulations.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> In case of any
                      adverse medical outcomes or complications arising from
                      your advice or treatment, you agree to take full
                      responsibility and provide necessary follow-up care to the
                      affected patients.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You acknowledge that
                      our platform may use telemedicine technology for remote
                      consultations, and you agree to use this technology
                      responsibly and ethically.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You understand that
                      our platform may collect and store personal health
                      information about patients for the purpose of providing
                      healthcare services, and you agree to comply with all
                      applicable data protection laws and regulations.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You agree to
                      communicate with patients in a professional and courteous
                      manner, and to refrain from any behavior or language that
                      may be deemed offensive or inappropriate.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You acknowledge that
                      our platform may use secure communication channels for
                      transmitting patient data, and you agree to maintain the
                      security and integrity of these channels.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" />
                      You understand that you may be subject to disciplinary
                      action, including suspension or termination of your
                      account, if you violate any of these terms and conditions
                      or engage in misconduct.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You agree to
                      cooperate with our platform's administrators and staff in
                      the event of any investigations or complaints regarding
                      your conduct or practice.
                    </p>
                    <p>
                      <i className="fas fa-circle-check" /> You understand that
                      our platform may periodically update these terms and
                      conditions, and you agree to abide by the latest version
                      available on our website.
                    </p>
                  </div>
                </div>
                {selectedDoctor ?
                <div className="terms-btn">
                  <Link
                    to="/checkout"
                    className="btn btn-right-now">
                    Not right now...
                  </Link>
                  <Link
                    to="/checkout"
                    className="btn btn-primary prime-btn">
                    I agree with terms
                  </Link>
                </div>
               : 
               <div className="terms-btn">
               <Link
                    to="/"
                    className="btn btn-right-now">
                    Go To Home Page
                  </Link>
                  </div>
               }
              </div>
            </div>
          </div>
        </div>

        <div className="mouse-cursor cursor-outer" />
        <div className="mouse-cursor cursor-inner" />
      </div>
    </div>
  );
}
