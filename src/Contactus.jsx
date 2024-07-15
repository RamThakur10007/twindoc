import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

export default function Contactus() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate user name
    if (formData.user_name.trim() === "") {
      errors.user_name = "Name is required";
      valid = false;
    }

    // Validate user email
    if (!/^\S+@\S+\.\S+$/.test(formData.user_email)) {
      errors.user_email = "Valid email is required";
      valid = false;
    }

    // Validate subject
    if (formData.subject.trim() === "") {
      errors.subject = "Subject is required";
      valid = false;
    }

    // Validate message
    if (formData.message.trim() === "") {
      errors.message = "Message is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const sendEmail = () => {
    emailjs
      .send(
        "service_9vvxymo",
        "template_0eii7ec",
        formData,
        "169BywfXpHfQ26JI1"
      )
      .then((result) => {
        console.log(result.text);

        // Show a success notification
        toast.success("We've dispatched your message. Thanks a bunch!");

        // Clear the form fields
        setFormData({
          user_name: "",
          user_email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);

        // Show an error notification
        toast.error("An error occurred while sending the message.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Show loading state
      setIsLoading(true);

      // Simulate a delay (replace with actual form submission)
      setTimeout(sendEmail, 100); // Simulated 2-second delay for demonstration
    } else {
      // Display validation errors
      toast.error("Please correct the errors in the form.");
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };
  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Contact Us</h2>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-section">
          <ToastContainer />
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-12">
                <div className="section-inner-header contact-inner-header">
                  <h6>Get in touch</h6>
                  <h2>Have Any Question?</h2>
                </div>
                <div className="card contact-card">
                  <div className="card-body">
                    <div className="contact-icon">
                      <i className="feather-map-pin" />
                    </div>
                    <div className="contact-details">
                      <h4>Address</h4>
                      <p><a href="https://maps.app.goo.gl/1KJkt5xJrzm1fxJb6" target="_blank">Govind Galaxy, Nasik MH 422002 India</a></p>
                    </div>
                  </div>
                </div>
                <div className="card contact-card">
                  <div className="card-body">
                    <div className="contact-icon">
                      <i className="feather-phone" />
                    </div>
                    <div className="contact-details">
                      <h4>Phone Number</h4>
                      <p><a href="tel:+918983633057">+91 8983633057</a></p>
                    </div>
                  </div>
                </div>
                <div className="card contact-card">
                  <div className="card-body">
                    <div className="contact-icon">
                      <i className="feather-mail" />
                    </div>
                    <div className="contact-details">
                      <h4>Email Address</h4>
                      <p><a href="mailto:connect@twinsistech.com" target="_blank">connect@twinsistech.com</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 d-flex">
                <div className="card contact-form-card w-100">
                  <div className="card-body">
                    <form action="#" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="name"
                              className={
                                focusedField === "user_name mb-2" ||
                                formData.user_name !== ""
                                  ? "active"
                                  : ""
                              }>
                              Name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Your Name"
                              name="user_name"
                              className={`form-control ${
                                formErrors.user_name && "is-invalid"
                              }`}
                              id="name"
                              required
                              value={formData.user_name}
                              onChange={handleChange}
                              onFocus={() => handleFocus("user_name")}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {formErrors.user_name}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">Email Address</label>
                            <input
                              placeholder="Enter Email Address"
                              type="email"
                              name="user_email"
                              className={`form-control ${
                                formErrors.user_email && "is-invalid"
                              }`}
                              id="email"
                              required
                              value={formData.user_email}
                              onChange={handleChange}
                              onFocus={() => handleFocus("user_email")}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {formErrors.user_email}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="subject"
                              className={
                                focusedField === "subject mb-2" ||
                                formData.subject !== ""
                                  ? "active"
                                  : ""
                              }>
                              Phone Number
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Phone Number"
                              className={`form-control ${
                                formErrors.subject && "is-invalid"
                              }`}
                              name="subject"
                              id="subject"
                              required
                              value={formData.subject}
                              onChange={handleChange}
                              onFocus={() => handleFocus("subject")}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {formErrors.subject}
                          </div>
                        </div>
                        {/* <div className="col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">Services</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Services"
                            />
                          </div>
                        </div> */}
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label
                              htmlFor="message"
                              className={
                                focusedField === "message mb-2" ||
                                formData.message !== ""
                                  ? "active"
                                  : ""
                              }>
                              Message
                            </label>
                            <textarea
                              placeholder="Enter your comments"
                              defaultValue={""}
                              className={`form-control ${
                                formErrors.message && "is-invalid"
                              }`}
                              name="message"
                              rows="10"
                              required
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => handleFocus("message")}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="invalid-feedback">
                            {formErrors.message}
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="loading">
                            {isLoading ? "Loading" : ""}
                          </div>
                          <div className="error-message"></div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group-btn mb-0">
                            <button
                              type="submit"
                              className="btn btn-primary  prime-btn"
                              disabled={isLoading}>
                              {isLoading ? "Sending..." : "Send Message"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="contact-map d-flex">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.7747324071847!2d73.84174931125925!3d20.017967081312662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddc1c41af3c085%3A0x3a7f6e9dfb215f5c!2sGovind%20Galaxy!5e0!3m2!1sen!2sin!4v1715969528183!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      {/* Mirrored from doccure.dreamstechnologies.com/html/template/contact-us.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Apr 2024 16:47:27 GMT */}
    </>
  );
}
