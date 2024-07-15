import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OrderState } from "../../Contexts";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [fileName, setFileName] = useState("");
  const [patientInfo, setPatientInfo] = useState();

  
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // 'error' or 'warning'
  const [showConsentModal, setShowConsentModal] = useState(false);
  const navigate = useNavigate();

  const {
    symptoms,
    setSymptoms,
    temperature,
    setTemperature,
    bloodpresure,
    setBloodpresure,
    heartRate,
    setHeartRate,
    reportFiles,
    setReportFiles,
    pdfRefs,
    setPdfRefs,
    setInProcess,
    isLoggedIn,
    patientName,
    setPatientName
  } = OrderState();

  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox

  // Vitals

  const [inputSymptoms, setInputSymptoms] = useState("");

  const handleFileChange = async (event) => {
		try {
			const isAuthenticated = localStorage.getItem("token");
			const patient = localStorage.getItem("patientInfo");
			const patientId = JSON.parse(patient)?._id;
			const description = "Medical Report";
			const file = event.target.files[0];

			if (file) {
				const fileName = file.name;
				setFileName(fileName);

				// First API call to upload the file
				const formData1 = new FormData();
				formData1.append("title", fileName);
				formData1.append("file", file);

				const uploadResult = await axios.post(
					"https://healthbackend-3xh2.onrender.com/service/uploadPdf",
					formData1,
					{
						headers: {
							isvalidrequest: "twinsistech",
						},
					},
				);
				console.log(uploadResult);
				setUploadedFileName(uploadResult.data.result);
				const formData2 = {
					attachment: fileName,
					filename: uploadResult.data.result,
					description: description,
				};
				console.log("formData2", formData2);
				console.log("reportFiles", reportFiles);
				setReportFiles([...reportFiles, formData2]);
				console.log("reportFiles", reportFiles);

				// const reportResult = await axios.put(
				// 	`https://healthbackend-3xh2.onrender.com/patient/${patientId}/report`,
				// 	formData2,
				// 	{
				// 		headers: {
				// 			authorization: isAuthenticated,
				// 		},
				// 	},
				// );

				// console.log(reportResult);
				toast(uploadResult.data.message);
			} else {
				setFileName("");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

  const addSymptom = () => {
    if (inputSymptoms.trim() !== "") {
      setSymptoms([...symptoms, inputSymptoms]); // Add new symptom to the list
      setInputSymptoms(""); // Clear input field
    }
    console.log(symptoms);
  };

  //   const handleFileChange = (e) => {
  //     const files = Array.from(e.target.files);
  //     const newFiles = files.map((file) => ({
  //       file: file,
  //       src: URL.createObjectURL(file), // Create URL for each file
  //     }));
  //     setReportFiles([...reportFiles, ...newFiles]);
  //     newFiles.forEach(({ file }) => {
  //       if (file.type === "application/pdf") {
  //         const reader = new FileReader();
  //         reader.onload = (e) => {
  //           setPdfRefs((pdfRefs) => [...pdfRefs, e.target.result]);
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     });
  //   };

  const handleRemoveFile = (index) => {
		const updatedFiles = [...reportFiles];
		updatedFiles.splice(index, 1);
		console.log("Updated files", updatedFiles);
		setReportFiles(updatedFiles);
		console.log("Report Files:", reportFiles);

		const updatedPdfRefs = [...pdfRefs];
		updatedPdfRefs.splice(index, 1);
		setPdfRefs(updatedPdfRefs);
	};

  const showModalMessage = (type, message) => {
    setModalType(type);
    setModalMessage(message);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (temperature || bloodpresure || heartRate) {
      const temp = temperature ? parseFloat(temperature) : null;
      const bp = bloodpresure ? parseInt(bloodpresure, 10) : null;
      const hr = heartRate ? parseInt(heartRate, 10) : null;
  
      const normalTempRange = { min: 95, max: 100.4 }; // Normal human body temperature in Fahrenheit
      const normalBPRanges = { systolic: { min: 90, max: 120 }, diastolic: { min: 60, max: 80 } };
      const normalHRRange = { min: 60, max: 100 };
  
      if (temp !== null && (temp < normalTempRange.min || temp > normalTempRange.max)) {
        showModalMessage("Warning", "⚠️ AI Analysis: Your temperature is outside the normal range. Immediate medical attention is strongly recommended.\nAmbulance No. (108)");
        return;
      }
  
      if (bp) {
        const [systolic, diastolic] = bloodpresure.split('/').map(Number);
        if (
          systolic < normalBPRanges.systolic.min || systolic > normalBPRanges.systolic.max ||
          diastolic < normalBPRanges.diastolic.min || diastolic > normalBPRanges.diastolic.max
        ) {
          showModalMessage("Warning", "⚠️ AI Analysis: Your blood pressure readings are outside the normal range. Immediate medical advice is recommended.\nAmbulance No. (108)");
          return;
        }
      }
  
      if (hr !== null && (hr < normalHRRange.min || hr > normalHRRange.max)) {
        showModalMessage("Warning", "⚠️ AI Analysis: Your heart rate is outside the normal range. Please consult with a healthcare professional as soon as possible.\nAmbulance No. (108)");
        return;
      }
    }
  
    setInProcess(true);
    console.log("Vitals:", temperature);
    console.log("Vitals:", heartRate);
    console.log("Vitals:", bloodpresure);
    console.log("Symptoms:", symptoms);
    console.log("Report Files:", reportFiles.map(({ file }) => file));
    console.log("PDF Files:", pdfRefs);
  
    if (isLoggedIn) {
      if (patientInfo) {
        navigate("/user/checkout");
      } else {
        toast("You have not set up Profile, Redirecting to Profile Page");
        setTimeout(() => {
          navigate("/user/profile-settings");
        }, 3000);
      }
    } else {
      toast("You are not Logged In, Redirecting to Login Page");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  



  const handleAgree = () => {
    setAgreed(true);
    setShowModal(false);
    setShowConsentModal(false);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked); // Update checkbox state
  };

  // Internal CSS for fade-in animation
  const modalStyle = `
        .fade-in {
            animation: fadeIn 0.7s ease forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;

  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    
    setPatientInfo(patientInfo);
    window.scrollTo(0, 0);
  }, []);



  return (
    <div className="main-wrapper">
    <div className="container">
      <div className="row align-items-center inner-banner">
        <div className="col-md-12 col-12 text-center">
          <h2 className="breadcrumb-title">Consents with Symptoms</h2>
        </div>
      </div>
    </div>
    <div className="content mt-4">
      <div className="container">
        <div className="row">
        <ToastContainer>
          
        </ToastContainer>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <h4>Vitals</h4>
              <div className="">
                <div className="mb-3">
                  <label htmlFor="vitals">Temperature: (F)</label>
                  <input
                    type="text"
                    id="vitals"
                    className="form-control"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="Enter Temperature"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vitals">Blood Pressure: (e.g., 120/80)</label>
                  <input
                    type="text"
                    id="vitals"
                    className="form-control"
                    value={bloodpresure}
                    onChange={(e) => setBloodpresure(e.target.value)}
                    placeholder="Enter Blood Pressure"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="vitals">Heart Rate: (bpm)</label>
                  <input
                    type="text"
                    id="vitals"
                    className="form-control"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    placeholder="Enter Heart Rate"
                  />
                </div>
              </div>
              <h4>Symptoms</h4>
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  value={inputSymptoms}
                  onChange={(e) => setInputSymptoms(e.target.value)}
                  placeholder="Enter symptoms (minimum 3)"
                />
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={addSymptom}
                >
                  Add
                </button>
              </div>
              {symptoms.length > 0 && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <h5>Added Symptoms:</h5>
                  <ul
                    style={{
                      display: "flex",
                      flex: "column",
                      flexWrap: "wrap",
                    }}
                  >
                    {symptoms.map((symptom, index) => (
                      <li key={index}>
                        {symptom}
                        {index !== symptoms.length - 1 && ","}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <h4>Report</h4>
              <div className="mb-3">
                <label htmlFor="reportFile">Upload Report:</label>
                <input
                  type="file"
                  id="reportFile"
                  className="form-control"
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              {reportFiles?.map((report) => (
									<iframe
										style={{ width: "100%", height: "500px" }}
										src={`https://healthbackend-3xh2.onrender.com/files/${report.filename}`}
									></iframe>
								))}

              <div className="my-3">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                  onClick={() => setShowConsentModal(true)}
                />
                <label
                  htmlFor="consentCheckbox"
                  style={{ marginLeft: "10px" }}
                >
                  I Agree to the Consent Form
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary submit-btn my-3"
                disabled={!isCheckboxChecked}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6">
            {reportFiles.length > 0 ? (
              <div>
                <h4>PDF Previews</h4>
                {reportFiles?.map((file, index) => (
										<div key={index}>
											<h5>File {index + 1}</h5>
											{pdfRefs[index] && (
												<embed
													src={pdfRefs[index]}
													type="application/pdf"
													width="100%"
													height="300px"
												/>
											)}
											<button
												className="btn btn-danger btn-sm mt-2"
												onClick={() => handleRemoveFile(index)}
											>
												Remove
											</button>
										</div>
									))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "350px",
                }}
              >
                <h4>No Files Uploaded</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <style>{modalStyle}</style>
    <div
      className={`modal fade custom-modal ${showConsentModal ? "show fade-in" : ""}`}
      style={{ display: showConsentModal ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ marginTop: "100px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Consent Form</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowConsentModal(false)}
            ></button>
          </div>
          <div className="modal-body mb-3">
            <p>
              Patient Consent Form
              <br />
              <br />
              I,{" "}
              <input
                type="text"
                id="patientName"
                style={{
                  width: "150px",
                  fontSize: "14px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                value={patientInfo?.userId?.name}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter Patient Name"
              />
              , hereby consent to [Procedure/Service] to be performed at
              TwinsDoc Pvt Ltd on {new Date().toDateString()}.
              <br />
              <br />
              I understand the nature of the procedure/service, its purpose,
              potential benefits, risks, and alternatives. I have had the
              opportunity to ask questions, and all my concerns have been
              addressed to my satisfaction.
              <br />
              <br />
              I understand that I have the right to refuse or withdraw
              consent at any time before or during the procedure/service.
              <br />
              <br />
              I acknowledge that no guarantees have been made regarding the
              outcome of the procedure/service, and unforeseen complications
              may occur.
              <br />
              <br />
              I consent to the use of any photographs, images, or recordings
              deemed necessary for medical, scientific, or educational
              purposes, provided my identity remains confidential.
              <br />
              <br />
              I confirm that I have been informed about the risks and
              benefits of anesthesia, if applicable, and I consent to its
              administration as deemed necessary by the healthcare provider.
              <br />
              <br />
              I certify that I am of legal age and competent to provide
              consent for this procedure/service.
              <br />
              <br />
              I understand that I may request further information or
              clarification at any time.
              <br />
              <br />
            </p>
          </div>
          <div className="modal-footer text-center">
            {!agreed && (
              <button
                className="btn btn-primary submit-btn"
                onClick={handleAgree}
                disabled={!patientName.trim()}
              >
                Agree
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    {showConsentModal && <div className="modal-backdrop fade show"></div>}

    {showModal && (
  <div
    className={`modal fade custom-modal ${showModal ? "show fade-in" : ""}`}
    style={{ display: showModal ? "block" : "none" }}
    tabIndex="-1"
    role="dialog"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content" style={{ marginTop: "100px" }}>
        <div className="modal-header">
          <h5 className="modal-title">
            {modalType === "error" ? "Error" : "Warning"}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <div className="modal-body mb-3" style={{ textAlign: "center" }}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            xmlSpace="preserve"
            width="50px"
            height="50px"
            style={{ marginBottom: "10px" }}
          >
            <circle fill="#001F3F" cx="32" cy="32" r="32" />
            <circle fill="#FFFFFF" cx="32" cy="32" r="30" />
            <circle fill="#001F3F" cx="32" cy="32" r="28" />
            <circle fill="#FFFFFF" cx="32" cy="32" r="26" />
            <circle fill="#001F3F" cx="32" cy="32" r="24" />
            <circle fill="#FFFFFF" cx="32" cy="32" r="22" />
            <circle fill="#001F3F" cx="32" cy="32" r="20" />
            <path
              fill="#FFFFFF"
              d="M20.5,24c0-6.6,4.3-11,11-11s11,4.4,11,11c0,4.9-3.5,8.5-7,8.5s-6-1.4-6-5.5c0-4.7,2.6-6.5,5.3-6.5
                      c2.4,0,4.7,1.6,4.7,5.5c0,4.4-2.4,5.5-4.7,5.5c-1.6,0-2.5-1.3-2.5-3c0-1.6,0.6-2.5,1.4-2.5s1.4,0.9,1.4,2.5c0,1.4-0.4,1.5-1,1.5
                      c-0.6,0-0.9-0.4-0.9-1c0-0.6,0.2-1,0.5-1c0.3,0,0.4,0.1,0.4,0.4c0,0.2-0.1,0.2-0.2,0.2s-0.2-0.1-0.2-0.3c0-0.1,0.1-0.2,0.3-0.2
                      c0.2,0,0.4,0.2,0.4,0.4c0,0.4-0.2,0.7-0.5,0.7c-0.4,0-0.5-0.3-0.5-0.7c0-0.7,0.3-1,0.7-1c0.5,0,0.8,0.5,0.8,1c0,0.9-0.5,1.5-1.2,1.5
                      c-0.8,0-1.3-0.5-1.3-1.5c0-1.2,0.6-1.5,1.2-1.5s1.3,0.4,1.3,1.5c0,0.7-0.3,1.1-0.8,1.1c-0.5,0-0.7-0.3-0.7-0.9c0-0.6,0.2-1,0.7-1
                      c0.4,0,0.6,0.4,0.6,1c0,1.3-0.8,2-1.6,2c-1,0-1.5-0.6-1.5-1.5c0-1.3,0.7-1.5,1.5-1.5s1.5,0.4,1.5,1.5c0,0.7-0.3,1.1-0.8,1.1
                      c-0.5,0-0.7-0.3-0.7-0.9c0-0.6,0.2-1,0.7-1c0.5,0,0.8,0.4,0.8,1c0,0.9-0.6,1.5-1.2,1.5c-0.8,0-1.2-0.5-1.2-1.5
                      C21.5,27.1,20.5,27.1,20.5,24z"
            />
          </svg>
          <p>{modalMessage}</p>
        </div>
        <div className="modal-footer text-center">
          <button className="btn btn-primary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}



    {showModal && <div className="modal-backdrop fade show"></div>}
  </div>
  );
}
