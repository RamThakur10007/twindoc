import React from 'react'

export default function Forgetpass() {
  return (
    <div>
   
    <div className="main-wrapper">
      
      <div className="content top-space">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="assets/img/bg/pic.jpg"
                      className="img-fluid"
                      alt="Login Banner"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Forgot Password?</h3>
                      <p className="small text-muted">
                        Enter your email to get a One Time Password(OTP)
                      </p>
                    </div>
                    <form action="https://doccure.dreamstechnologies.com/html/template/login.html">
                      <div className="mb-3 form-focus">
                        <input type="email" className="form-control floating" />
                        <label className="focus-label">Email</label>
                      </div>
                      <div className="text-end">
                        <a className="forgot-link" href="login.html">
                          Remember your password?
                        </a>
                      </div>
                      <button
                        className="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
 
  
  </div>
  )
}
