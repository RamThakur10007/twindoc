import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderState } from "../Contexts";
import Main from "../otpcomponent/Main.tsx"
export default function Profilesettings() {
  const [pic, setPic] = useState("assets/img/doctors/doctor-thumb-02.jpg");
  const [preview, setPreview] = useState();
  const [patientInfo, setPatientInfo] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const { setIsLoggedIn,
    selectedSlotTime
   } = OrderState();

  // const userInfo = JSON.parse( localStorage.getItem("userInfo"));
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    dob: "", //
    age: "",
    bloodType: "",
    gender: "", //
    mobile: "",
    emergencyNumber: "",
    height: "", 
    weight: "", 
    allergies: [""],
    medicalHistory: [{ diseaseName: "", year: "" }],
    addressLine1: "",
    profilePicture: "",
    city: "",
    state: "",
    zip: "",
    contry: "",
  });

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

  const [errors, setErrors] = useState({
    dob: "",
    age: "",
    bloodType: "",
    gender: "",
    email: "",
    mobile: "",
    addressLine1: "",
    city: "",
    state: "",
    zip: "",
    contry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const uploadImage = async (picture) => {
    const isAuthenticated = localStorage.getItem("token");
    try {
      var reader = new FileReader();
      reader.onloadend = async function () {
        setPreview(reader.result); // Set preview image
        try {
          const res = await axios.post(
            "https://healthbackend-3xh2.onrender.com/service/uploadImage",
            {
              imageUrl: reader.result, // Use reader.result directly here
            },
            {
              headers: {
                authorization: isAuthenticated,
              },
            }
          );
          if (res.status === 200) {
            setPic(res.data.result);
            setFormData({
              ...formData,
              profilePicture: res.data.result,
            });
            console.log(res.data.result);
          }

          toast(res.data.message);
        } catch (error) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      };
      reader.readAsDataURL(picture); // Read the file
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleAllergies = () => {
    setFormData((prevState) => ({
      ...prevState,
      allergies: [...prevState.allergies, ""], // Add a new empty allergy field
    }));
  };
  const handleRemoveAllergy = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      allergies: prevState.allergies.filter((_, i) => i !== index), // Remove allergy at specified index
    }));
  };

  const handleChangeAllergies = (index, value) => {
    const updatedAllergies = [...formData.allergies];
    updatedAllergies[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      allergies: updatedAllergies,
    }));
  };

  const handlemedicalHistory = () => {
    setFormData((prevState) => ({
      ...prevState,
      medicalHistory: [
        ...prevState.medicalHistory,
        { diseaseName: "", year: "" },
      ], // Add a new empty allergy field
    }));
  };

  const handleRemovemedicalHistory = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      medicalHistory: prevState.medicalHistory.filter((_, i) => i !== index), // Remove allergy at specified index
    }));
  };

  const handleChangemedicalHistory = (e, index, key) => {
    const { value } = e.target;
    const updatedmedicalHistory = [...formData.medicalHistory];
    updatedmedicalHistory[index][key] = value; // Update the specified property of the object at the specified index
    setFormData((prevState) => ({
      ...prevState,
      medicalHistory: updatedmedicalHistory,
    }));
  };

  const getPatientInfo = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));

    if (patientInfo) {
      setFormData({
        userId: patientInfo?.userId?._id,
        name: patientInfo?.userId?.name || "",
        email: patientInfo?.userId?.email || "",
        profilePicture:
          patientInfo?.profilePicture ||
          "/assets/img/banners/defualtImgjpg.jpg",
        mobile: patientInfo?.userId?.mobileNumber || "",
        emergencyNumber:patientInfo?.emergencyNumber||"",
        dob: patientInfo?.dob || "",
        age: String(patientInfo?.age) || "",
        bloodType: patientInfo?.bloodType || "",
        gender: patientInfo?.gender || "",
        height: String(patientInfo?.height) || "",
        weight: String(patientInfo?.weight) || "",
        allergies: patientInfo?.allergies || [],
        medicalHistory: patientInfo?.medicalHistory || [],
        addressLine1: patientInfo?.addressLine1 || "",
        city: patientInfo?.city || "",
        state: patientInfo?.state || "",
        zip: patientInfo?.zip || "",
        contry: patientInfo?.contry || "",
      });
    } else {
      setFormData({
        userId: userInfo?._id,
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        mobile: userInfo?.mobileNumber || "",
        dob: "",
        age: "",
        bloodType: "",
        gender: "",
        height: "",
        weight: "",
        allergies: [""],
        medicalHistory: [{ diseaseName: "", year: "" }],
        addressLine1: "",
        city: "",
        state: "",
        zip: "",
        contry: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add other validation rules
    let errorsObj = {};

    if (!formData.dob.trim()) {
      errorsObj.dob = "Date of Birth is required";
    }

    if (!formData.age.trim()) {
      errorsObj.age = "Age is required";
    }

    if (!formData.bloodType.trim()) {
      errorsObj.bloodType = "Blood Group is required";
    }

    if (!formData.gender.trim() || formData.gender === "Select") {
      errorsObj.gender = "Gender is required";
    }

    if (!formData.addressLine1.trim()) {
      errorsObj.addressLine1 = "addressLine1 is required";
    }

    if (!formData.city.trim()) {
      errorsObj.city = "City is required";
    }

    if (!formData.state.trim()) {
      errorsObj.state = "State is required";
    }

    if (!formData.zip || !formData.zip.toString().trim()) {
      errorsObj.zip = "Zip Code is required";
    }

    if (!formData.contry.trim()) {
      errorsObj.contry = "contry is required";
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return; // Prevent form submission if there are errors
    }

    setErrors({
      dob: "",
      age: "",
      bloodType: "",
      gender: "",
      addressLine1: "",
      city: "",
      state: "",
      zip: "",
      contry: "",
      // Add other fields as needed
    });

    console.log(formData);

    const isAuthenticated = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));

    setFormData({
      ...formData,
      userId: userInfo._id,
    });
    console.log(patientInfo);

    try {
      if (patientInfo) {
        const updatedPatient = await axios.put(
          `https://healthbackend-3xh2.onrender.com/patient/${patientInfo?.userId?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: isAuthenticated,
            },
          }
        );
        console.log(updatedPatient);
        localStorage.setItem(
          "patientInfo",
          JSON.stringify(updatedPatient.data.result)
        );
        // setDoctorInfo(updatedDoctor.data.result);
        // console.log(doctorInfo);

        toast("Profile Updated Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const user = await axios.post(
          `https://healthbackend-3xh2.onrender.com/patient/create`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: isAuthenticated,
            },
          }
        );

        console.log(user);
        localStorage.setItem("patientInfo", JSON.stringify(user?.data?.result));

        toast("Profile Created Successfully!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        if(selectedSlotTime){
          setTimeout(() => {
            navigate("/user/appointmentdetails")
            
        }, 3000);
        }
        
       
      }
     

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    getPatientInfo();
  }, []);

  useEffect(() => {
    const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
    setPatientInfo(patientInfo);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(userInfo);
    console.log("user Info" , userInfo);

    window.scrollTo(0, 0);
  }, []);
  

  
  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Profile Settings</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              <ToastContainer />
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
                        <li className="">
                          <Link to="/user/dashboard">
                            <i className="fas fa-columns" />
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        <li>
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
                            <span>Medical Records</span>
                          </Link>
                        </li>

                        <li className="active">
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
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <h4 className="card-title">Basic Information</h4>
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div className="mb-3">
                            <div className="change-avatar">
                              <div className="profile-img">
                                <img
                                  src={
                                    preview
                                      ? preview
                                      : patientInfo?.profilePicture ||
                                        "assets/img/doctors/doctor-thumb-02.jpg"
                                  }
                                  alt="User Image"
                                />
                              </div>
                              <div className="upload-img">
                                <div className="change-photo-btn">
                                  <span>
                                    <i className="fa fa-upload" /> Upload Photo
                                  </span>
                                  <input
                                    type="file"
                                    className="upload"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) =>
                                      uploadImage(e.target.files[0])
                                    }
                                  />
                                </div>
                                <small className="form-text text-muted">
                                  Allowed JPG, PNG and JPEG. Max size of 2MB
                                </small>
                              </div>
                            </div>
                            
                          </div>
                          <div className="submit-section">
                         { !userInfo.isMobverified && ( <div>
                              <a
                                title="Edit Profile"
                                className="btn btn-primary btn-sm"
                                href="#account_modal"
                                data-bs-toggle="modal">
                                <i className="fas fa-pencil" /> Verify Mobile No.
                              </a>
                            </div>
                            )}
                            { userInfo.isMobverified && (<div>
          <h3 style={{ marginLeft: 10, color: "#9f9f9f" }}>OTP is Verified</h3>
        </div>
                            )}
                      </div>
                        </div>
                       

                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Name<span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Mobile No. <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">Emergency Mobile No.</label>
                            <input
                              type="text"
                              className="form-control"
                              name="emergencyNumber"
                              value={formData.emergencyNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Date of Birth{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <div>
                              <input
                                type="date"
                                className="form-control datetimepicker"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                              />
                              {errors.dob && (
                                <span
                                  style={{ color: "red", fontSize: "13px" }}>
                                  {errors.dob}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Age <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="age"
                              value={formData?.age}
                              onChange={handleChange}
                            />
                            {errors.age && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors?.age}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Blood Group{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <select
                              className="form-select form-control"
                              name="bloodType"
                              value={formData.bloodType}
                              onChange={handleChange}>
                              <option>A-</option>
                              <option>A+</option>
                              <option>B-</option>
                              <option>B+</option>
                              <option>AB-</option>
                              <option>AB+</option>
                              <option>O-</option>
                              <option>O+</option>
                            </select>
                          </div>
                          {errors.bloodType && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.bloodType}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Gender <span className="text-danger"> *</span>
                            </label>
                            <select
                              className="form-select form-control"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}>
                              <option>Select</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                          {errors.gender && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.gender}
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">Height(ft)</label>
                            <input
                              type="number"
                              className="form-control"
                              name="height"
                              value={formData?.height}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12  col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">Weight(kg)</label>
                            <input
                              type="number"
                              className="form-control"
                              name="weight"
                              value={formData?.weight}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 ">
                          <div className="mb-3">
                            <label className="mb-2">
                              Email ID <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="email"
                              readOnly
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <br />
                        <div className="col-12 col-md-6">
                          {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap:"4px" }}> */}
                          {formData.allergies.map((allergy, index) => (
                            <div className="mb-3" key={index}>
                              <label className="mb-2">
                                Allergies {index + 1}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={allergy}
                                placeholder="Allergy"
                                onChange={(e) =>
                                  handleChangeAllergies(index, e.target.value)
                                }
                              />
                              {index !== 0 && ( // Condition to render the Remove button only for slots after the first one
                                <div className="remove-education">
                                  <a onClick={() => handleRemoveAllergy(index)}>
                                    <i className="fa fa-minus-circle" /> Remove
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                          {/* </div> */}
                          <div className="add-more mt-2">
                            <a
                              className="add-education"
                              onClick={handleAllergies}>
                              <i className="fa fa-plus-circle" /> Add More
                            </a>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          {formData.medicalHistory.map(
                            (diseaseNameItem, index) => (
                              <div className="mb-3 " key={index}>
                                <label className="mb-2">
                                  Previous diseaseName {index + 1}
                                </label>
                                <div className="d-flex gap-3 ">
                                  {" "}
                                  {/* Use d-flex class to display items in a row */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Previous diseaseName"
                                    value={diseaseNameItem.diseaseName}
                                    onChange={(e) =>
                                      handleChangemedicalHistory(
                                        e,
                                        index,
                                        "diseaseName"
                                      )
                                    }
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Year"
                                    value={diseaseNameItem.year}
                                    onChange={(e) =>
                                      handleChangemedicalHistory(
                                        e,
                                        index,
                                        "year"
                                      )
                                    }
                                  />
                                </div>
                                {index !== 0 && (
                                  <div className="remove-education">
                                    <a
                                      onClick={() =>
                                        handleRemovemedicalHistory(index)
                                      }>
                                      <i className="fa fa-minus-circle" />{" "}
                                      Remove
                                    </a>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                          <div className="add-more mt-2">
                            <a
                              className="add-education"
                              onClick={handlemedicalHistory}>
                              <i className="fa fa-plus-circle" /> Add More
                            </a>
                          </div>
                        </div>
                        <br />
                        <br />
                        <br /> <br />
                        <br />
                        <br />
                        <div className="col-12">
                          <div className="mb-3">
                            <h4 className="card-title">Address Line</h4>
                            <label className="mb-2">
                              Address Line{" "}
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="addressLine1"
                              value={formData.addressLine1}
                              onChange={handleChange}
                            />
                            {errors.addressLine1 && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.addressLine1}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              City <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                            />
                            {errors.city && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.city}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              State <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                            />
                            {errors.state && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.state}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Zip Code <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                            />
                            {errors.zip && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.zip}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="mb-3">
                            <label className="mb-2">
                              Country <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="contry"
                              value={formData.contry}
                              onChange={handleChange}
                            />
                            {errors.contry && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.contry}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade custom-modal"
        id="account_modal"
        role="dialog"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Verify Mobile No.</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Main UserInfo={userInfo}/>
              {/* <form id="accounts_form" method="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="control-label mb-2">Account Name</label>
                      <input
                        type="text"
                        name="account_name"
                        className="form-control acc_name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                      <span className="help-block" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="control-label mb-2">Bank Name</label>
                    <input
                      type="text"
                      name="bank_name"
                      className="form-control bank_name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <span className="help-block" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="control-label mb-2">UPI id</label>
                      <input
                        type="text"
                        name="account_no"
                        className="form-control account_no"
                        value={upiId}
                        onChange={handleUpiIdChange}
                        placeholder="example123@okbankname"
                      />
                      {upiIdError && (
                        <span className="help-block">{upiIdError}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer text-center">
                  <button
                    type="submit"
                    id="acc_btn"
                    className="btn btn-primary"
                    data-bs-dismiss="modal">
                    Save
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
      {/* Mirrored from TwinsisTech.dreamstechnologies.com/html/template/profile-settings.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Apr 2024 16:46:25 GMT */}
    </>
  );
}
