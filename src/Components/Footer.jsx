import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-one">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <Link to="/" className="navbar-brand logo">
                    <img
                      src="/assets/img/favicon/TwinsDoc_Logo.png"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div className="footer-about-content">
                  <p>
                    Discover seamless online Physician appointments with
                    TwinsDoc. Book trusted professionals instantly and
                    prioritize your well-being from home.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Patients</h2>
                    <ul>
                      <li>
                        <Link to="/user/docsearch">Search for Physicians</Link>
                      </li>

                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/signup?role=user">Register</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Physicians</h2>
                    <ul>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/signup?role=doctor">Physician Register</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-4">
                  <div className="footer-widget footer-contact">
                    <h2 className="footer-title">Contact Us</h2>
                    <div className="footer-contact-info">
                      <div className="footer-address">
                        <p>
                          <i className="feather-map-pin" /><a href="https://maps.app.goo.gl/1KJkt5xJrzm1fxJb6" target="_blank">Govind Galaxy, Nasik
                          MH 422002 India</a>
                        </p>
                      </div>
                      <div className="footer-address">
                        <p>
                          <i className="feather-phone-call" /><a href="tel:+918983633057">+91 8983633057</a>
                        </p>
                      </div>
                      <div className="footer-address mb-0">
                        <p>
                          <i className="feather-mail" />{" "}
                          <a
                            href="mailto:connect@twinsistech.com"
                            className="_cf_email_" target="_blank">
                            connect@twinsistech.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-7">
              <div className="footer-widget">
                <h2 className="footer-title">Join Our Newsletter</h2>
                <div className="subscribe-form">
                  <form action="#">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="social-icon">
                  <ul>
                    <li>
                      <a href="javascript:void(0);">
                        <i className="fab fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="copyright-text">
                  <p className="mb-0">
                    {" "}
                    Copyright © 2024 <a>TwinsisTech</a> All Rights Reserved
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="copyright-menu">
                  <ul className="policy-menu">
                    <li>
                      <Link to="/privacypolicy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/termscondition">Terms and Conditions</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
