import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { OrderState } from "../../Contexts";
const LabReports = () => {
  const [currentPageToday, setCurrentPageToday] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPageHistory, setCurrentPageHistory] = useState(1);
  const [itemsPerPage] = useState(5);
  const [patientInfo, setPatientInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [today, setToday] = useState([]);
  const [LabReports, setLabReports] = useState([]);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfPath, setPdfPath] = useState("");

  const { setSelectedAppointment, setIsLoggedIn } = OrderState();

  const navigate = useNavigate();

  useEffect(() => {
		if (pdfPath) {
			setIsPdfOpen(true);
		}
  }, [pdfPath]);

  const openPdf = (path) => {
		setPdfPath(`https://healthbackend-3xh2.onrender.com/files/${path}`);
  };

  const closePdf = () => {
		setIsPdfOpen(false);
		setPdfPath("");
  };

  const handleLogout = () => {
    console.log("in here");
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      localStorage.removeItem("userInfo");
    }
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
    const patientInfo = localStorage.getItem("patientInfo");
    if (patientInfo) {
      localStorage.removeItem("patientInfo");
    }
    setIsLoggedIn(false);
  };

  const paginate1 = (pageNumber) => setCurrentPageToday(pageNumber);
  const paginate2 = (pageNumber) => setCurrentPageUpcoming(pageNumber);
  const paginate3 = (pageNumber) => setCurrentPageHistory(pageNumber);

  const getAllLabReports = async (id, isAuthenticated) => {
		const patient = localStorage.getItem("patientInfo");
		const patientId = JSON.parse(patient)?._id;
		try {
			const response = await axios.get(`https://healthbackend-3xh2.onrender.com/patient/${patientId}/reports`, {
				headers: {
					isvalidrequest: "twinsistech",
					Authorization: isAuthenticated,
				},
			});
			console.log(response.data);
			setLabReports(response.data.result);
			console.log(LabReports);
		} catch (error) {
			console.log(error);
		}
  };

  useEffect(() => {
		console.log(LabReports);
		setRecords(LabReports);
  }, [LabReports]);

  const getAllAppointments = async (id, isAuthenticated) => {
    console.log(id);
    try {
      const data = await axios.post(
        "https://healthbackend-3xh2.onrender.com/appointment/patientappointments",
        {
          patientId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: isAuthenticated,
          },
        }
      );

      console.log(data);
      const appointments = data.data.result;
      const today = new Date();
      const todayAppointmentsArray = [];
      const upcomingAppointmentsArray = [];
      const pastAppointmentsArray = [];
      console.log(today + 6000000);
      today.setHours(0, 0, 0, 0);

      appointments.forEach((appointment) => {
        const appointmentDate = new Date(appointment.date);
        console.log(appointment.date, appointmentDate);
        if (appointmentDate < today) {
          pastAppointmentsArray.push(appointment);
        } else {
          // const currentDate = today;
          // currentDate.setHours(0, 0, 0, 0);
          if (appointmentDate.toDateString() === today.toDateString()) {
            todayAppointmentsArray.push(appointment);
          } else {
            upcomingAppointmentsArray.push(appointment);
          }
        }
      });

      console.log(todayAppointmentsArray);
      console.log(upcomingAppointmentsArray);
      console.log(pastAppointmentsArray);
      setToday(todayAppointmentsArray);
      setUpcoming(upcomingAppointmentsArray);
      setAppointments(pastAppointmentsArray);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(today);

  const handleJoin = (meetingId) => {
    // console.log(meetingId);
    navigate(`/room/${meetingId}`);
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    navigate(`/user/appointment/${appointment?._id}`);
  };

   useEffect(() => {
		const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
		setPatientInfo(patientInfo);
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		setUserInfo(userInfo);
		const isAuthenticated = localStorage.getItem("token");
		if (patientInfo) {
			// getAllAppointments(patientInfo?._id, isAuthenticated);
			const reportsData = getAllLabReports(patientInfo?._id, isAuthenticated);
		}

		if (userInfo.role !== "user") {
			navigate("/");
		}
   }, []);

  console.log(upcoming);
  const [records, setRecords] = useState([]);
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
								<h2 className="breadcrumb-title">Lab Reports</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="container">
						<div className="row">
							<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
								<div className="profile-sidebar">
									<div className="widget-profile pro-widget-content">
									<div className="profile-info-widget">
                      <a href="#" className="booking-doc-img">
                        <img
                          src={
                            patientInfo?.profilePicture ||
                            "/assets/img/banners/defualtImgjpg.jpg"
                          }
                          alt="/assets/img/banners/defualtImgjpg.jpg"
                        />
                      </a>
                      <div className="profile-det-info">
                        <h3>{patientInfo?.userId?.name}</h3>
                        <div className="patient-details">
                          <h5>
                            <i className="fas fa-birthday-cake" />
                            {new Date(patientInfo?.dob).toDateString(
                              patientInfo?.dob
                            )}
                            , {patientInfo?.age} years
                          </h5>
                          <h5 className="mb-0">
                            <i className="fas fa-map-marker-alt" />{" "}
                            {patientInfo?.city}, {patientInfo?.contry}
                          </h5>
                        </div>
                      </div>
                    </div>
									</div>

									<div className="dashboard-widget">
										<nav className="dashboard-menu">
											<ul>
												<li>
													<Link to="/user/dashboard">
														<i className="fas fa-columns" />
														<span>Dashboard</span>
													</Link>
												</li>

												<li className="active">
													<Link to="/user/labreports">
														<i className="fas fa-list-alt" />
														<span>Lab Reports</span>
													</Link>
												</li>
												<li>
													<Link to="/user/prescriptions">
														<i className="fas fa-file-invoice" />
														<span>Prescriptions</span>
													</Link>
												</li>
												<li>
													<Link to="/user/medical-records">
														<i className="fas fa-clipboard" />
														<span> Medical Records</span>
													</Link>
												</li>

												<li>
													<Link to="/user/profile-settings">
														<i className="fas fa-user-cog" />
														<span>Profile Settings</span>
													</Link>
												</li>
												<li>
													<Link to="/user/change-password">
														<i className="fas fa-lock" />
														<span>Change Password</span>
													</Link>
												</li>
												<li>
													<Link to="/login" onClick={handleLogout}>
														<i className="fas fa-sign-out-alt" />
														<span>Logout</span>
													</Link>
												</li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-8 col-xl-9">
								<div className="row">
									<div className="col-sm-12">
										<div className="card">
											<div className="card-body">
												<div className="card card-table mb-0">
													<div className="card-body">
														<div className="table-responsive">
															<table className="table table-hover table-center mb-0">
																<thead>
																	<tr>
																		<th>ID</th>
																		<th>Date</th>
																		<th>Description</th>
																		<th>Attachment</th>
																		{/* <th>Created</th> */}
																		<th>Action</th>
																	</tr>
																</thead>
																<tbody>
																	{records.map(
																		(record, index) => (
																			<tr key={index}>
																				<td>
																					<a href="javascript:void(0);">
																						{index}
																					</a>
																				</td>
																				<td>
																					{record.date}
																				</td>
																				<td>
																					{
																						record.description
																					}
																				</td>
																				<td>
																					<a href="#">
																						{
																							record.attachment
																						}
																					</a>
																				</td>
																				{/* <td>
																					<h2 className="table-avatar">
																						<a
																							href={
																								record
																									.doctor
																									.profileLink
																							}
																							className="avatar avatar-sm me-2"
																						>
																							<img
																								className="avatar-img rounded-circle"
																								src={
																									record
																										.doctor
																										.avatar
																								}
																								alt="User Image"
																							/>
																						</a>
																						<a
																							href={
																								record
																									.doctor
																									.profileLink
																							}
																						>
																							{
																								record
																									.doctor
																									.name
																							}{" "}
																							<span>
																								{
																									record
																										.doctor
																										.specialty
																								}
																							</span>
																						</a>
																					</h2>
																				</td> */}
																				<td>
																					<div className="table-action">
																						<button
																							className="btn btn-sm bg-info-light me-2"
																							onClick={() =>
																								openPdf(
																									record.path,
																								)
																							}
																						>
																							<i className="far fa-eye" />{" "}
																							View
																						</button>
																						<a
																							href="javascript:void(0);"
																							className="btn btn-sm bg-danger-light"
																						>
																							<i className="far fa-trash-alt" />
																						</a>
																					</div>
																				</td>
																			</tr>
																		),
																	)}
																</tbody>
															</table>
														</div>
														{isPdfOpen && (
															<div className="pdf-container w-full h-500 ">
																<iframe
																	style={{
																		width: "100%",
																		height: "600px",
																	}}
																	id="pdf-iframe"
																	className="w-full h-500"
																	frameBorder="0"
																	src={pdfPath}
																></iframe>
																<button
																	onClick={closePdf}
																	className="btn btn-sm bg-danger-light m-3"
																>
																	Close
																</button>
															</div>
														)}
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
};

export default LabReports;
