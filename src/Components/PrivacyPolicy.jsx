import React, { useEffect } from "react";

export default function Privacypolicy() {
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
                <h2 className="breadcrumb-title">Privacy Policy</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb"></nav>
              </div>
            </div>
          </div>
        </div>
        <div className="terms-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="terms-content pb-0">
                  <div className="terms-text">
                    <p>
                      At TwinsDoc, we are committed to protecting your privacy
                      and ensuring the security of your personal information.
                      This Privacy Policy outlines how we collect, use, and
                      disclose your information when you access and use our
                      comprehensive healthcare services online.
                    </p>
                  </div>
                  <div className="terms-text terms-list">
                    <p>
                      <i class="fa-solid fa-1"></i>{" "}
                      <strong>Information Collection:</strong>
                    </p>
                    <p>
                      <strong>1.1 &nbsp;&nbsp;</strong> Personal Information:
                      When you register an account or use our services, we may
                      collect personal information such as your name, contact
                      details, date of birth, medical history, and payment
                      information.
                    </p>
                    <p>
                      <strong>1.2&nbsp;&nbsp;</strong> Usage Information: We
                      automatically collect certain information when you access
                      our platform, including your IP address, device
                      information, browser type, and usage patterns. This helps
                      us analyze user behavior and improve our services.
                    </p>

                    <p>
                      <i class="fa-solid fa-2"></i>{" "}
                      <strong>Use of Information:</strong>
                    </p>
                    <p>
                      <strong>2.1&nbsp;&nbsp; </strong> Service Provision: We
                      use your personal information to provide you with access
                      to healthcare services, including medical consultations,
                      prescriptions, radiology services, and more. Your
                      information helps us connect you with experienced
                      healthcare professionals who can address your medical
                      concerns effectively.
                    </p>
                    <p>
                      <strong>2.2&nbsp;&nbsp;</strong> Communication: We may use
                      your contact information to communicate with you about
                      your appointments, medical advice, service updates, and
                      promotional offers. You can opt out of receiving
                      promotional communications at any time.
                    </p>
                    <p>
                      <strong>2.3 &nbsp;&nbsp;</strong> Quality Improvement: We
                      analyze usage patterns, feedback, and other relevant data
                      to improve the quality, efficiency, and effectiveness of
                      our healthcare services.
                    </p>

                    <p>
                      <i class="fa-solid fa-3"></i>{" "}
                      <strong>Sharing of Information:</strong>
                    </p>
                    <p>
                      <strong>3.1&nbsp;&nbsp;</strong>{" "}
                      <p>
                        Communication: We may use your contact information to
                        communicate with you about your appointments, medical
                        advice, service updates, and promotional offers. You can
                        opt out of receiving promotional communications at any
                        time.
                      </p>
                    </p>
                    <p>
                      <strong>3.2&nbsp;&nbsp;</strong> Trusted Partners : We may
                      share your information with trusted pharmacies,
                      laboratories, and other healthcare partners to fulfill
                      prescriptions, diagnostic tests, and other healthcare
                      needs.
                    </p>

                    <p>
                      <i class="fa-solid fa-4"></i>{" "}
                      <strong>Security Measures:</strong>
                    </p>
                    <p>
                      <strong>4.1&nbsp;&nbsp;</strong>{" "}
                      <p>
                        Data Security: We implement robust security measures to
                        protect your personal information from unauthorized
                        access, disclosure, alteration, or destruction. This
                        includes encryption, firewalls, access controls, and
                        other industry-standard security practices.
                      </p>
                    </p>
                    <p>
                      <strong>4.2&nbsp;&nbsp;</strong> Confidentiality: Our
                      healthcare professionals are bound by strict
                      confidentiality obligations to ensure the privacy and
                      security of your medical information.
                    </p>

                    <p>
                      <i class="fa-solid fa-5"></i>{" "}
                      <strong>Security Measures:</strong>
                    </p>
                    <p>
                      <strong>5.1&nbsp;&nbsp;</strong>{" "}
                      <p>
                        1 Account Management: You can manage your account
                        settings, update your personal information, and control
                        your communication preferences through your TwinsDoc
                        account.
                      </p>
                    </p>
                    <p>
                      <strong>5.2&nbsp;&nbsp;</strong> Opt-Out: You have the
                      option to opt out of certain communications and
                      promotional offers by adjusting your account settings or
                      contacting us directly.
                    </p>

                    <p>
                      <i class="fa-solid fa-6"></i>{" "}
                      <strong>Updates to Privacy Policys:</strong>
                    </p>
                    <p>
                      <strong>6.1&nbsp;&nbsp;</strong> We may update this
                      Privacy Policy periodically to reflect changes in our
                      services, legal requirements, or industry standards. We
                      will notify you of any significant changes and provide you
                      with the opportunity to review and consent to the updated
                      policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mouse-cursor cursor-outer" />
        <div className="mouse-cursor cursor-inner" />
      </div>
    </>
  );
}
