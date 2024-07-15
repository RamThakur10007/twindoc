import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderState } from "../../Contexts";
import axios from "axios";

export default function Checkout() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const navigate = useNavigate();
	const [patientInfo, setPatientInfo] = useState();
	const {
		selectedDoctor,
		selectedSlotTime,
		selectedDate,
		symptoms,
		temperature,
		bloodpresure,
		heartRate,
		reportFiles,
		pdfRefs,
		selectedSlotDay,
		setSelectedDoctor,
		setSelectedSpecialist,
	   setSelectedLocation,
	   setSymptoms,
	   setTemperature,
		setBloodpresure,
		setHeartRate,
		setReportFiles,
		setSelectedSlotDay,
		setSelectedSlotTime,
		setSelectedDate,
		setSelectedAppointment,
		setInProcess,
		setSelectedSpecialisthome,
	   
	} = OrderState();

	function parseTime(timeStr) {
		const [time, modifier] = timeStr.split(" ");
		let [hours, minutes] = time.split(":").map(Number);

		if (modifier === "PM" && hours !== 12) {
			hours += 12;
		} else if (modifier === "AM" && hours === 12) {
			hours = 0;
		}

		return { hours, minutes };
	}
	console.log(selectedDate);
	console.log(reportFiles)
	function convertToISO(dateStr, startTimeStr) {
		// Parse the date
		const [day, month, year] = dateStr.split("-").map(Number);

		console.log(dateStr, startTimeStr);
		// Parse the start time
		const { hours: startHours, minutes: startMinutes } = parseTime(startTimeStr);

		// Create a new Date object
		const date = new Date(Date.UTC(year, month - 1, day, startHours, startMinutes));

		// Convert to ISO string
		const isoString = date.toISOString();
		return isoString;
	}
	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handlePayment = () => {
		if (!validateEmail(patientInfo?.userId?.email)) {
			toast.error("Please enter a valid email address.");
			return;
		}
		if (!isChecked) {
			toast.error("Please accept the Terms & Conditions.");
			return;
		}

		// Your payment handling logic
		const options = {
			key: "rzp_test_24yRxkxuRbu0WP",
			amount: selectedDoctor?.fees * 100 + (10 + 50) * 100,
			currency: "INR",
			name: "TwinsDoc",
			description: "Fees",
			image: "/assets/img/favicon/20240505_203516.png",
			handler: function (response) {
				if (response.razorpay_payment_id) {
					toast.success("Payment successful!");

					handleSubmit();
				} else {
					toast.error("Payment failed. Please try again.");
				}
			},
			prefill: {
				name: selectedDoctor?.userId?.name || name,
				email: selectedDoctor?.userId?.email || email,
				contact: selectedDoctor?.userId?.mobileNumber || phone,
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#0e82fd",
			},
		};

		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handleSubmit = async () => {
		const isAuthenticated = localStorage.getItem("token");
		const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
		console.log(selectedDoctor, patientInfo);

		console.log(selectedSlotTime.substring(0, 9));
		const date = convertToISO(selectedDate, selectedSlotTime.substring(0, 9));
		console.log(date);
		try {
			console.log(patientInfo._id);
			console.log(patientInfo._id);
			console.log("reportFiles", reportFiles);	
			const result = await axios.post(
				`https://twinsdocbackend.onrender.com/appointment/create`,
				{
					patientId: patientInfo._id,
					doctorId: selectedDoctor._id,
					slot: selectedSlotTime,
					reportFiles,
					date: date,
					vitals: {
						heartRate: heartRate,
						bloodPressure: bloodpresure,
						temparature: temperature,
					},
					symptoms: symptoms,
					consent: true,
				},
				{
					headers: {
						authorization: isAuthenticated,
					},
				},
			);

			console.log(result);
			
			setSelectedSpecialist("")
			setSelectedLocation("")
			setSymptoms([])
         	setTemperature("")
         	setBloodpresure("")
         	setHeartRate("")
         	setReportFiles([])
        	setSelectedSlotDay("")
          
            setSelectedAppointment(null)
        	setInProcess(false)
        	setSelectedSpecialisthome("")

			toast("Appointment Created Successfully");
			navigate("/user/booking-success");
		} catch (error) {
			console.log(error);
		}
	};

	// console.log(patientInfo);


	

	useEffect(() => {
		const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
		if (patientInfo) {
			setPatientInfo(patientInfo);
		}
	}, []);
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
								<h2 className="breadcrumb-title">Checkout</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="container">
						<div className="row">
							<div className="col-md-7 col-lg-8">
								<div className="card">
									<div className="card-body">
										<form>
											<div className="info-widget">
												<h4 className="card-title">Personal Information</h4>
												<div className="row">
													<div className="col-md-6 col-sm-12">
														<div className="mb-3 card-label">
															<label className="mb-2">
																Name{" "}
																<span style={{ color: "red" }}>
																	*
																</span>
															</label>
															<input
																className="form-control"
																type="text"
																readOnly
																value={patientInfo?.userId?.name}
																onChange={(e) =>
																	setName(
																		e.target.value.replace(
																			/[^A-Za-z]/gi,
																			" ",
																		),
																	)
																}
																autoComplete="name"
																required
															/>
														</div>
													</div>
													<div className="col-md-6 col-sm-12">
														<div className="mb-3 card-label">
															<label className="mb-2">
																Email{" "}
																<span style={{ color: "red" }}>
																	*
																</span>
															</label>
															<input
																className="form-control"
																type="email"
																readOnly
																value={patientInfo?.userId?.email}
																onChange={(e) =>
																	setEmail(e.target.value)
																}
																autoComplete="email"
																required
															/>
														</div>
													</div>
													<div className="col-md-6 col-sm-12">
														<div className="mb-3 card-label">
															<label className="mb-2">
																Phone{" "}
																<span style={{ color: "red" }}>
																	*
																</span>
															</label>
															<input
																className="form-control"
																type="tel"
																readOnly
																value={
																	patientInfo?.userId
																		?.mobileNumber
																}
																onChange={(e) =>
																	setPhone(
																		e.target.value
																			.replace(/[^0-9+]/g, "")
																			.slice(0, 13),
																	)
																}
																autoComplete="tel"
																required
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="terms-accept">
												<div className="custom-checkbox">
													<input
														type="checkbox"
														id="terms_accept"
														checked={isChecked}
														onChange={() => setIsChecked(!isChecked)}
														required
													/>
													{"  "}
													<label htmlFor="terms_accept">
														I have read and accept{" "}
														<Link to="/termscondition">
															Terms &amp; Conditions
														</Link>
													</label>
												</div>
											</div>
											<div className="form-search-btn col-md-12">
												<button
													type="button"
													className="btn"
													onClick={handlePayment}
												>
													Confirm & Pay
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="col-md-5 col-lg-4 theiaStickySidebar">
								<div className="card booking-card">
									<div className="card-header">
										<h4 className="card-title">Booking Summary</h4>
									</div>
									<div className="card-body">
										<div className="booking-doc-info">
											<a
											
												className="booking-doc-img"
											>
												<img
													src={
														selectedDoctor?.profilePicture ||
														"assets/img/doctors/doctor-thumb-02.jpg"
													}
													alt="User Image"
												/>
											</a>
											<div className="booking-info">
												<h4>
													<a >
														Dr. {selectedDoctor?.userId?.name}
													</a>
												</h4>
												<div className="rating">
													<i className="fas fa-star filled" />
													<i className="fas fa-star filled" />
													<i className="fas fa-star filled" />
													<i className="fas fa-star filled" />
													<i className="fas fa-star" />
													<span className="d-inline-block average-rating">
														35
													</span>
												</div>
												<div className="clinic-details">
													<p className="doc-location">
														<i className="fas fa-map-marker-alt" />{" "}
														{selectedDoctor?.city},{" "}
														{selectedDoctor?.contry}
													</p>
												</div>
											</div>
										</div>
										<div className="booking-summary">
											<div className="booking-item-wrap">
												<ul className="booking-date">
													<li>
														Date :<span> {selectedDate}</span>
													</li>
													<li>
														Time :<span>{selectedSlotTime}</span>
													</li>
												</ul>
												<ul className="booking-fee">
													<li>
														Consulting Fee{" "}
														<span>₹ {selectedDoctor?.fees}</span>
													</li>
													<li>
														Booking Fee <span>₹ 10</span>
													</li>
													<li>
														Video Call <span>₹ 50</span>
													</li>
												</ul>
												<div className="booking-total">
													<ul className="booking-total-list">
														<li>
															<span>Total</span>
															<span className="total-cost">
																₹ {selectedDoctor?.fees + 10 + 50}
															</span>
														</li>
													</ul>
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
			<ToastContainer />
		</div>
	);
}
