import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Aboutus() {
  const [topDoctors, setTopDoctors]=useState();
  const getTopDoctors = async () =>{
    try {
      const response = await axios.get(
        "https://twinsdocbackend.onrender.com/patient/top",
        {
          headers:{
            isvalidrequest:"twinsistech",
            
          },
        }
      );
      console.log(response)

      setTopDoctors(response.data.result);
    } catch (error) {
      console(error)
    }
  }
  useEffect(() => {
   
    getTopDoctors();
  }, []);
  return (
    <div>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">About Us</h2>
              </div>
            </div>
          </div>
        </div>
        <section className="about-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12">
                <div className="about-img-info">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="about-inner-img">
                        <div className="about-img">
                          <img
                            src="assets/img/about-img1.jpg"
                            className="img-fluid"
                            alt="about-image"
                          />
                        </div>
                        <div className="about-img">
                          <img
                            src="assets/img/about-img2.jpg"
                            className="img-fluid"
                            alt="about-image"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-inner-img">
                        <div className="about-box">
                          <h4>Over 25+ Years Experience</h4>
                        </div>
                        <div className="about-img">
                          <img
                            src="assets/img/about-img3.jpg"
                            className="img-fluid"
                            alt="about-image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="section-inner-header about-inner-header">
                  <h6>About Our Company</h6>
                  <h2>
                    We Are Always Ensure Best Medical Treatment For Your Health
                  </h2>
                </div>
                <div className="about-content">
                  <div className="about-content-details">
                    <p>
                      Welcome to our comprehensive online doctor appointment
                      platform, where your health and well-being are our top
                      priority. We are committed to delivering the highest
                      quality medical care, ensuring you receive the best
                      treatment for all your healthcare needs.
                    </p>
                  </div>
                  <div className="about-contact">
                    <div className="about-contact-icon">
                      <span>
                        <img
                          src="assets/img/icons/phone-icon.svg"
                          alt="phone-image"
                        />
                      </span>
                    </div>
                    <div className="about-contact-text">
                      <p>Need Emergency?</p>
                      <h4><a href="tel:+918983633057">+918983633057</a></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="why-choose-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-inner-header text-center">
                  <h2>Why Choose Us</h2>
                </div>
              </div>
            </div>

            <div className="row">
              <style>
                {`
          .unique-border-card:hover {
            border-color: #3498db !important;
            border-width: 2px !important;
            border-style: solid !important;
          }
        `}
              </style>

              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card why-choose-card w-100 unique-border-card">
                  <div className="card-body">
                    <div className="why-choose-icon">
                      <span>
                        <img
                          src="assets/img/icons/choose-01.svg"
                          alt="choose-image"
                        />
                      </span>
                    </div>
                    <div className="why-choose-content">
                      <h4>Qualified Staff of Doctors</h4>
                      <p>
                        Connect with our skilled team for expert medical
                        guidance. Experience personalized care and a seamless
                        online appointment.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card why-choose-card w-100 unique-border-card ">
                  <div className="card-body">
                    <div className="why-choose-icon">
                      <span>
                        <img
                          src="assets/img/icons/choose-02.svg"
                          alt="choose-image"
                        />
                      </span>
                    </div>
                    <div className="why-choose-content">
                      <h4>24/7 Service</h4>
                      <p>
                        24/7 access for immediate care. Get assistance anytime,
                        ensuring peace of mind and continuity.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card why-choose-card w-100 unique-border-card">
                  <div className="card-body">
                    <div className="why-choose-icon">
                      <span>
                        <img
                          src="assets/img/icons/choose-03.svg"
                          alt="choose-image"
                        />
                      </span>
                    </div>
                    <div className="why-choose-content">
                      <h4>Labs and Reports</h4>
                      <p>
                        Lorem ipsum sit amet consectetur incididunt ut labore et
                        exercitation ullamco laboris nisi dolore magna enim
                        veniam aliqua.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card why-choose-card w-100 unique-border-card">
                  <div className="card-body">
                    <div className="why-choose-icon">
                      <span>
                        <img
                          src="assets/img/icons/choose-04.svg"
                          alt="choose-image"
                        />
                      </span>
                    </div>
                    <div className="why-choose-content">
                      <h4>Online consulation</h4>
                      <p>
                        Online consultation offers remote access to professional
                        advice via digital platforms, providing convenience and
                        accessibility from anywhere.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="way-section">
          <div className="container">
            <div className="way-bg">
              <div className="way-shapes-img">
                <div className="way-shapes-left">
                  <img src="assets/img/shape-06.png" alt="shape-image" />
                </div>
                <div className="way-shapes-right">
                  <img src="assets/img/shape-07.png" alt="shape-image" />
                </div>
              </div>
              <div className="row align-items-end">
                <div className="col-lg-7 col-md-12">
                  <div className="section-inner-header way-inner-header mb-0">
                    <h2>Be on Your Way to Feeling Better with the Twinsdoc</h2>
                    <p>
                      Our platform connects you with top-rated doctors for
                      convenient and reliable online appointments, ensuring you
                      receive the best medical care from the comfort of your
                      home. Experience hassle-free healthcare tailored to your
                      needs with Twinsdoc.
                    </p>
                    <Link to="/contactus" className="btn  ">
                      Contact With Us
                    </Link>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12">
                  <div className="way-img">
                    <img
                      src="assets/img/way-img.png"
                      className="img-fluid"
                      alt="doctor-way-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

         

       <section className="doctors-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="section-header-one section-header-slider">
                  <h2 className="section-title">Best Physicians</h2>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <div className="owl-nav slide-nav-2 nav-control"></div>
              </div>
            </div>
            <OwlCarousel
              className="owl-carousel doctor-slider-one owl-theme"
              loop
              margin={10}
              nav
              responsive={{
                0: { items: 1 },
                600: { items: 3 },
                1000: { items: 5 },
              }}>
                {topDoctors?.map((doctor, index)=>(

                <div key={index} className="item">
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a >
                      <div className="doctor-profile-img">
                        <img
                          src={doctor?.profilePicture||
                            "assets/img/doctors/doctor-thumb-02.jpg"}
                          className="img-fluid"
                          alt={doctor.userId}
                        />
                      </div>
                    </a>
                    <div className="doctor-amount"></div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a >{`Dr. ${doctor.name}`}</a>
                        <p>{doctor.specialization.join(', ')}</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> {doctor.avgRating}
                          </span>{" "}
                          ({doctor.reviewCount || 0})
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> {doctor.city}
                      </p>
                    </div>
                  </div>
                </div>
                </div>
                )
              )

                }
              {/* <div className="item">
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a href="doctor-profile.html">
                      <div className="doctor-profile-img">
                        <img
                          src="assets/img/doctors/doctor-04.jpg"
                          className="img-fluid"
                          alt="Darren Elder"
                        />
                      </div>
                    </a>
                    <div className="doctor-amount"></div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a href="doctor-profile.html">Dr. Darren Elder</a>
                        <p>Neurology</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> 4.0
                          </span>{" "}
                          (20)
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> Florida, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a href="doctor-profile.html">
                      <div className="doctor-profile-img">
                        <img
                          src="assets/img/doctors/doctor-04.jpg"
                          className="img-fluid"
                          alt="Darren Elder"
                        />
                      </div>
                    </a>
                    <div className="doctor-amount"></div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a href="doctor-profile.html">Dr. Darren Elder</a>
                        <p>Neurology</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> 4.0
                          </span>{" "}
                          (20)
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> Florida, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a href="doctor-profile.html">
                      <div className="doctor-profile-img">
                        <img
                          src="assets/img/doctors/doctor-05.jpg"
                          className="img-fluid"
                          alt="Sofia Brient"
                        />
                      </div>
                    </a>
                    <div className="doctor-amount"></div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a href="doctor-profile.html">Dr. Sofia Brient</a>
                        <p>Urology</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> 4.5
                          </span>{" "}
                          (30)
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> Georgia, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a href="doctor-profile.html">
                      <div className="doctor-profile-img">
                        <img
                          src="assets/img/doctors/doctor-05.jpg"
                          className="img-fluid"
                          alt="Sofia Brient"
                        />
                      </div>
                    </a>
                    <div className="doctor-amount"></div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a href="doctor-profile.html">Dr. Sofia Brient</a>
                        <p>Urology</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> 4.5
                          </span>{" "}
                          (30)
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> Georgia, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a href="doctor-profile.html">
                      <div className="doctor-profile-img">
                        <img
                          src="assets/img/doctors/doctor-02.jpg"
                          className="img-fluid"
                          alt="Paul Richard"
                        />
                      </div>
                    </a>
                    <div className="doctor-amount">
                      <span>$ 570</span>
                    </div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a href="doctor-profile.html">Dr. Paul Richard</a>
                        <p>Orthopedic</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> 4.3
                          </span>{" "}
                          (45)
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> Michigan, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a href="doctor-profile.html">
                      <div className="doctor-profile-img">
                        <img
                          src="assets/img/doctors/doctor-01.jpg"
                          className="img-fluid"
                          alt="Paul Richard"
                        />
                      </div>
                    </a>
                    <div className="doctor-amount">
                      <span>$ 570</span>
                    </div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a href="doctor-profile.html">Dr. Paul Richard</a>
                        <p>Orthopedic</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> 4.3
                          </span>{" "}
                          (45)
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> Michigan, USA
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Add similar item blocks for other doctors */}
            </OwlCarousel>
          </div>
        </section>

        {/* happy clinents seaction */}
        {/* <section className="testimonial-section">
          <div className="testimonial-shape-img">
            <div className="testimonial-shape-left">
              <img src="assets/img/shape-04.png" alt="shape-image" />
            </div>
            <div className="testimonial-shape-right">
              <img src="assets/img/shape-05.png" alt="shape-image" />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="testimonial-slider slick">
                  <div className="testimonial-grid">
                    <div className="testimonial-info">
                      <div className="testimonial-img">
                        <img
                          src="assets/img/clients/client-01.jpg"
                          className="img-fluid"
                          alt="client-image"
                        />
                      </div>
                      <div className="testimonial-content">
                        <div className="section-inner-header testimonial-header">
                          <h6>Testimonials</h6>
                          <h2>What Our Client Says</h2>
                        </div>
                        <div className="testimonial-details">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </p>
                          <h6>
                            <span>John Doe</span> New York
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-grid">
                    <div className="testimonial-info">
                      <div className="testimonial-img">
                        <img
                          src="assets/img/clients/client-02.jpg"
                          className="img-fluid"
                          alt="client-image"
                        />
                      </div>
                      <div className="testimonial-content">
                        <div className="section-inner-header testimonial-header">
                          <h6>Testimonials</h6>
                          <h2>What Our Client Says</h2>
                        </div>
                        <div className="testimonial-details">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </p>
                          <h6>
                            <span>Amanda Warren</span> Florida
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-grid">
                    <div className="testimonial-info">
                      <div className="testimonial-img">
                        <img
                          src="assets/img/clients/client-03.jpg"
                          className="img-fluid"
                          alt="client-image"
                        />
                      </div>
                      <div className="testimonial-content">
                        <div className="section-inner-header testimonial-header">
                          <h6>Testimonials</h6>
                          <h2>What Our Client Says</h2>
                        </div>
                        <div className="testimonial-details">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </p>
                          <h6>
                            <span>Betty Carlson</span> Georgia
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-grid">
                    <div className="testimonial-info">
                      <div className="testimonial-img">
                        <img
                          src="assets/img/clients/client-04.jpg"
                          className="img-fluid"
                          alt="client-image"
                        />
                      </div>
                      <div className="testimonial-content">
                        <div className="section-inner-header testimonial-header">
                          <h6>Testimonials</h6>
                          <h2>What Our Client Says</h2>
                        </div>
                        <div className="testimonial-details">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </p>
                          <h6>
                            <span>Veronica</span> California
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-grid">
                    <div className="testimonial-info">
                      <div className="testimonial-img">
                        <img
                          src="assets/img/clients/client-05.jpg"
                          className="img-fluid"
                          alt="client-image"
                        />
                      </div>
                      <div className="testimonial-content">
                        <div className="section-inner-header testimonial-header">
                          <h6>Testimonials</h6>
                          <h2>What Our Client Says</h2>
                        </div>
                        <div className="testimonial-details">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur.
                          </p>
                          <h6>
                            <span>Richard</span> Michigan
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="faq-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header-one text-center ">
                  <h5>Get Your Answer</h5>
                  <h2 className="section-title">Frequently Asked Questions</h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 ">
                <div className="faq-img">
                  <img
                    src="assets/img/faq-img.png"
                    className="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="faq-info ">
                  <div className="accordion" id="faq-details">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne">
                          How do I schedule an appointment with a doctor through
                          the portal?
                        </a>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Scheduling an appointment is easy, just log in,
                              pick your time, and confirm.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo">
                          What types of medical professionals are available for
                          consultations?
                        </a>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              We provide consultations with diverse medical
                              experts, from general practitioners to specialized
                              professionals.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree">
                          Can I get prescriptions through the online portal?
                        </a>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Yes, prescriptions can be obtained through our
                              online platform for your convenience.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFour">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour">
                          Are there options for video consultations, or is it
                          strictly text-based communication?
                        </a>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Choose video consultations for personalized
                              communication with our doctors.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFive">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive">
                          Can I request a specific doctor for my consultation?
                        </a>
                      </h2>
                      <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Absolutely, you can request a specific doctor for
                              your consultation based on availability.{" "}
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
        </section>

        <div className="mouse-cursor cursor-outer" />
        <div className="mouse-cursor cursor-inner" />
      </div>
      {/* Mirrored from Twinsdoc.dreamstechnologies.com/html/template/about-us.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Apr 2024 16:47:27 GMT */}
    </div>
  );
}
