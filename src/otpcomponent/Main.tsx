import React, { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "../api/otp.ts";

const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

const Main = (UserInfo) => {
  const initialMessage = { type: "", text: "" };
  const [code, setCode] = useState("");
  const [isVerified, setVerified] = useState(false);
  const [pno, setPno] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(`https://twinsdocbackend.onrender.com/user/verifyMobile/${UserInfo._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserInfo }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Verified at backend", result);
        } else {
          console.error('Failed to verify user');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };

    if (isVerified) {
      verifyUser();
    }
  }, [isVerified, UserInfo]);

  const handleResendOtp = async () => {
    if (!pno || !code) return;

    const result = await sendOtp({ code, phone: pno });
    if (result.status) {
      setIsOtpVisible(true);
      setMessage({ type: "success", text: "OTP resent successfully" });

      setTimeout(() => setMessage(initialMessage), 2000);
    }
  };

  const handleBtnClick = async () => {
    if (!pno || !code) return;

    if (!isOtpVisible) {
      const result = await sendOtp({ code, phone: pno });
      if (result?.payload?.status) {
        setIsOtpVisible(true);
      }
    } else {
      if (!otp) return;
      const result = await verifyOtp({ code, phone: pno, otp });
      console.log(result);
      if (result?.payload?.status === 'approved') {
        setVerified(true);
        setMessage({ type: "success", text: "OTP is Verified" });
        setIsOtpVisible(false);
        setOtp("");
      } else {
        setMessage({ type: "error", text: "Could not verify OTP" });
        setOtp("");
      }

      setTimeout(() => setMessage(initialMessage), 2000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "35vh",
      }}
    >
      {isVerified ? (
        <div>
          <h3 style={{ marginLeft: 10, color: "#9f9f9f" }}>OTP is Verified</h3>
        </div>
      ) : (
        <div
          style={{
            padding: 25,
            flex: 1,
            marginTop: 20,
          }}
        >
          {!isOtpVisible ? (
            <h3 style={{ marginLeft: 10, color: "#9f9f9f" }}>Send OTP</h3>
          ) : (
            <button
              onClick={() => {
                setIsOtpVisible(false);
                setOtp("");
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Back
            </button>
          )}
          <h3>{isOtpVisible ? "Enter the OTP" : "Enter your Phone Number"}</h3>
          {isOtpVisible && (
            <p>
              A One Time Password has been sent to your phone number for
              verification purposes.
            </p>
          )}
          <div>
            {!isOtpVisible ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: "0.5rem",
                }}
              >
                <input
                  id="code"
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ flex: 1, maxWidth: "5rem" }}
                />
                <input
                  id="phone"
                  placeholder="Phone"
                  value={pno}
                  onChange={(e) => {
                    if (
                      (e.target.value[e.target.value.length - 1] >= "0" &&
                        e.target.value[e.target.value.length - 1] <= "9") ||
                      !e.target.value
                    ) {
                      setPno(e.target.value);
                    }
                  }}
                  style={{ flex: 2 }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            {isOtpVisible && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                Didn't receive an OTP?{" "}
                <button
                  onClick={handleResendOtp}
                  style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    cursor: "pointer",
                    fontSize: 15,
                    textTransform: "none",
                  }}
                >
                  Resend OTP
                </button>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
              <button
                disabled={
                  pno?.length !== 10 ||
                  !code ||
                  !isNumeric(pno) ||
                  (isOtpVisible && otp?.length !== 6)
                }
                style={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "none",
                  marginLeft: "auto",
                }}
                onClick={handleBtnClick}
              >
                {isOtpVisible ? "Verify" : "Send"}
              </button>
            </div>
            <br />
            {message.type === "success" && <p>{message.text}</p>}
            {!isOtpVisible && (
              <p>
                Make sure your Country Code And Mobile Number is Correct.
              </p>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <a href="#" style={{ textDecoration: "none", fontSize: 14 }}>
                Terms of service
              </a>
              <a
                href="#"
                style={{ textDecoration: "none", fontSize: 14, marginLeft: 10 }}
              >
                User agreement
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
