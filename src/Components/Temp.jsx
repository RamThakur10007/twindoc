import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorProfile() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [doctorInfo, setDoctorInfo] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [fees, setFees] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [yearOfExperience, setYearOfExperience] = useState("");
  const [pic, setPic] = useState("assets/img/doctors/doctor-thumb-02.jpg");
  const [preview, setPreview] = useState();
  const [education, setEducation] = useState([
    { qualification: "", collegeName: "", yearOfCompletion: "" },
  ]);
  const [awardsNAchievements, setAwardsNAchievements] = useState([
    { awards: "", year: "" },
  ]);
  const [licence, setLicence] = useState([
    { licenseNumber: "", yearOfIssued: "" },
  ]);

  const [licenceNumber, setLicenceNumber] = useState("");
  const [yearLicenceNumber, setYearLicenceNumber] = useState("");

  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [staticFilePreview, setStaticFilePreview] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    yearOfExperience: "",
    gender: "",
    dob: "",
    fees: "",
    address1: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    specialization: "",
    education: "",
    yearOfExperience: "",
    licenceNumber: "",
    yearLicenceNumber: "",
  });

  const openFile = () => {
    const url = `https://healthbackend-3xh2.onrender.com/files/${uploadedFileName}`;
    const windowFeatures =
      "width=800,height=600,top=100,left=100,resizable,scrollbars,menubar=no,toolbar=no,location=no,status=no";

    window.open(url, "_blank", windowFeatures);
  };

  const countWords = (text) => {
    const wordArray = text.trim().split(/\s+/);
    return wordArray.length;
  };

  const handleAwardChange = (index, event) => {
    const { name, value } = event.target;
    // Update awards
    const updatedAwards = [...awards];
    if (!updatedAwards[index]) {
      updatedAwards[index] = {}; // Initialize if undefined
    }
    updatedAwards[index][name] = value;
    setAwards(updatedAwards);
  };
  const handleAboutRemainingChange = (e) => {
    const inputValue = e.target.value;
    if (countWords(inputValue) <= 250) {
      setAboutMe(inputValue); // Update the input if within limit
    }
  };

  // Calculate the remaining words
  const remainingWords = 250 - countWords(aboutMe);

  const handleFileChange = async (event) => {
    try {
      const isAuthenticated = localStorage.getItem("token");
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);

        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("title", fileName);
        formData.append("file", file);
        console.log(fileName, file);

        const result = await axios.post(
          "https://healthbackend-3xh2.onrender.com/service/uploadPdf",
          formData,
          {
            headers: {
              authorization: isAuthenticated,
            },
          }
        );

        console.log(result);
        setUploadedFileName(result.data.result);

        toast(result.data.message);
      } else {
        setFileName("");
        setFilePreview("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducation = [...education];

    // Update the specific field of the education object at the given index
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    };

    // Update the education state with the modified array
    setEducation(updatedEducation);

    // Update experiences
    const newExperiences = [...experiences];
    if (!newExperiences[index]) {
      newExperiences[index] = {}; // Initialize if undefined
    }
    newExperiences[index][name] = value;
    setExperiences(newExperiences);

    // Update memberships
    const updatedMemberships = [...memberships];
    if (!updatedMemberships[index]) {
      updatedMemberships[index] = {}; // Initialize if undefined
    }
    updatedMemberships[index][name] = value;
    setMemberships(updatedMemberships);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { qualification: "", collegeName: "", yearOfCompletion: "" },
    ]);

    // Add placeholders to experiences, awards, and memberships
    setExperiences([...experiences, {}]);
    // setAwards([...awards, {}]);
    // setMemberships([...memberships, {}]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);

    // Remove corresponding entries from experiences, awards, and memberships
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);

    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1);
    setAwards(updatedAwards);

    const updatedMemberships = [...memberships];
    updatedMemberships.splice(index, 1);
    setMemberships(updatedMemberships);
  };
  // State to manage multiple experience entries
  const [experiences, setExperiences] = useState([
    { id: 1, hospitalName: "", from: "", to: "", designation: "" },
  ]);

  // Function to add a new experience entry
  const handleAddExperience = () => {
    const newId =
      experiences.length > 0 ? experiences[experiences.length - 1].id + 1 : 1;
    setExperiences([
      ...experiences,
      { id: newId, hospitalName: "", from: "", to: "", designation: "" },
    ]);
  };

  // Function to remove an experience entry
  const handleRemoveExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const [awards, setAwards] = useState([{ name: "", year: "" }]);

  const handleAddAward = () => {
    setAwards([...awards, { name: "", year: "" }]);
  };

  const handleRemoveAward = (index) => {
    const updatedAwards = awards.filter((award, i) => i !== index);
    setAwards(updatedAwards);
  };

  const [memberships, setMemberships] = useState([{ name: "" }]);

  const handleAddMembership = () => {
    setMemberships([...memberships, { name: "" }]);
  };

  const handleRemoveMembership = (index) => {
    if (index !== 0) {
      const updatedMemberships = [...memberships];
      updatedMemberships.splice(index, 1);
      setMemberships(updatedMemberships);
    }
  };

  const getDocInfo = async () => {
    const isAuthenticated = localStorage.getItem("token");
    const docInfo = JSON.parse(localStorage.getItem("docInfo"));

    if (docInfo) {
      const userId = docInfo.userId._id;
      setUserName(docInfo.userId?.name || "");
      setPic(
        docInfo?.profilePicture || "assets/img/doctors/doctor-thumb-02.jpg"
      );
      setUploadedFileName(docInfo?.certificate || "");
      setEmail(docInfo.userId?.email || "");
      setPhone(docInfo.userId?.mobileNumber || "");
      setGender(docInfo?.gender || "");
      setEducation(docInfo?.educationDetails || "");
      setAwardsNAchievements(docInfo?.achievement);
      setAwards(docInfo?.achievement);
      setLicenceNumber(docInfo?.licenseNumber);
      setYearLicenceNumber(docInfo?.yearOfIssued);
      const dobDate = new Date(docInfo?.dob);
      const day = dobDate.getDate().toString().padStart(2, "0");
      const month = (dobDate.getMonth() + 1).toString().padStart(2, "0");
      const year = dobDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      setDOB(formattedDate);
      setFees(docInfo?.fees || "");
      setAboutMe(docInfo?.about || "");
      setClinicName(docInfo?.clinicName || "");
      setClinicAddress(docInfo?.clinicAddress || "");
      setAddress1(docInfo?.addressLine1 || "");
      setAddress2(docInfo?.addressLine2 || "");
      setState(docInfo?.state);
      setCity(docInfo?.city || "");
      setCountry(docInfo?.contry || "");
      setPostalCode(docInfo?.zip || "");
      setSpecialization(docInfo?.specialization || "");
      setYearOfExperience(docInfo?.yearOfExperience || "");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserName(userInfo?.name);
      setPhone(userInfo?.mobileNumber);
      setEmail(userInfo?.email);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    let errorsObj = {};

    if (!gender || gender === "Select") {
      errorsObj.gender = "Gender is required";
    }

    if (!dob.trim()) {
      errorsObj.dob = "Date Of Birth is required";
    }

    if (!fees) {
      errorsObj.fees = "Fees is required";
    }
    if (!address1 || !address1.trim()) {
      errorsObj.address1 = "Address is required";
    }
    if (!city || !city.trim()) {
      errorsObj.city = "City is required";
    }
    if (!state || !state.trim()) {
      errorsObj.state = "State is required";
    }
    if (!country || !country.trim()) {
      errorsObj.country = "Country is required";
    }
    if (!postalCode) {
      errorsObj.postalCode = "Postal Code is required";
    }
    if (!specialization || !specialization.trim()) {
      errorsObj.specialization = "Specialization is required";
    }
    const isEducationValid = education.some(
      (edu) =>
        edu.qualification.trim() !== "" ||
        edu.collegeName.trim() !== "" ||
        edu.yearOfCompletion.trim() !== ""
    );
    if (!isEducationValid) {
      errorsObj.education = "Education is required";
    }
    if (!yearOfExperience || isNaN(yearOfExperience)) {
      errorsObj.yearOfExperience = "Experience is required";
    }
    if (!licenceNumber || isNaN(yearLicenceNumber)) {
      errorsObj.licenceNumber = "Licence  is required";
    }
    if (!yearLicenceNumber || isNaN(yearLicenceNumber)) {
      errorsObj.yearLicenceNumber = "Year Of Issued is required";
    }

    // Add other validation rules

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return; // Prevent form submission if there are errors
    }

    // If validation passes, submit the form
    const isAuthenticated = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const docInfo = JSON.parse(localStorage.getItem("docInfo"));

    console.log(
      // docInfo.userId._id,
      userName,
      yearOfExperience,
      fees,
      dob,
      aboutMe,
      specialization,
      state,
      awardsNAchievements,
      licenceNumber,
      yearLicenceNumber,
      address1,
      address2,
      city,
      postalCode,
      country,
      education,
      clinicName,
      clinicAddress,
      gender
    );

    try {
      const parts = dob.split("-");

      // Rearrange the parts to form the "YYYY-MM-DD" format
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

      console.log(formattedDate);
      if (docInfo) {
        console.log("1");
        const updatedDoctor = await axios.put(
          `https://healthbackend-3xh2.onrender.com/doctor/${docInfo.userId._id}/update`,
          {
            userId: docInfo.userId._id,
            name: userName,
            profilePicture: pic,
            certificate: uploadedFileName,
            yearOfExperience: yearOfExperience,
            fees: fees,
            dob: formattedDate,
            about: aboutMe,
            specialization: specialization,
            state: state,
            achievement: awards,
            licenseNumber: licenceNumber,
            yearOfIssued: yearLicenceNumber,
            addressLine1: address1,
            addressLine2: address2,
            city: city,
            zip: postalCode,
            contry: country,
            educationDetails: education,
            clinicName: clinicName,
            clinicAddress: clinicAddress,
            gender: gender,
          },
          {
            headers: {
              authorization: isAuthenticated,
            },
          }
        );
        console.log(updatedDoctor);
        localStorage.setItem(
          "docInfo",
          JSON.stringify(updatedDoctor.data.result)
        );
        // setDoctorInfo(updatedDoctor.data.result);
        // console.log(doctorInfo);
        console.log("doctor updated success navigatingto docprofile");

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
          `https://healthbackend-3xh2.onrender.com/doctor/create`,
          {
            userId: userInfo._id,
            name: userName,
            profilePicture: pic,
            certificate: uploadedFileName,
            yearOfExperience: yearOfExperience,
            fees: fees,
            dob: dob,
            about: aboutMe,
            specialization: specialization,
            state: state,
            achievement: awards,
            licenseNumber: licenceNumber,
            yearOfIssued: yearLicenceNumber,
            addressLine1: address1,
            addressLine2: address2,
            city: city,
            zip: postalCode,
            contry: country,
            educationDetails: education,
            clinicName: clinicName,
            clinicAddress: clinicAddress,
            gender: gender,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: isAuthenticated,
            },
          }
        );

        console.log(user);
        localStorage.setItem(
          "docInfo",
          JSON.stringify(user.data.result.doctor)
        );
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
    const docInfo = localStorage.getItem("docInfo");
    if (docInfo) {
      localStorage.removeItem("docInfo");
    }
  };

  const getPdf = async () => {
    const pdf =
      "https://healthbackend-3xh2.onrender.com/files/1715146045722-149767159Project Management (1).pdf";

    setFilePreview(pdf);
  };

  useEffect(() => {
    getDocInfo();
    getPdf();
  }, []);

  useEffect(() => {
    const doctorInfo = JSON.parse(localStorage.getItem("docInfo"));
    // Error in _id
    if (doctorInfo) {
      setDoctorInfo(doctorInfo);
    }
  }, []);

  // useState (()=>{

  //   console.log(doctorInfo);
  // },[doctorInfo])

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-bar-two">
        <div className="container">
          <div className="row align-items-center inner-banner">
            <div className="col-md-12 col-12 text-center">
              <h2 className="breadcrumb-title">Profile Settings</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Profile Settings
                  </li>
                </ol>
              </nav>
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
                          doctorInfo?.profilePicture ||
                          "assets/img/doctors/doctor-thumb-02.jpg"
                        }
                        alt="assets/img/doctors/doctor-thumb-02.jpg"
                      />
                    </a>
                    <div className="profile-det-info">
                      <h3>Dr. {doctorInfo?.userId?.name}</h3>
                      <div className="patient-details ">
                        <h5 className="mb-0 ">
                          {doctorInfo &&
                            doctorInfo?.educationDetails &&
                            doctorInfo?.educationDetails.map((edu, index) => (
                              <p key={index}>{edu.qualification}</p>
                            ))}
                          {/* &amp; {doctorInfo?.specialization} */}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-widget">
                  <nav className="dashboard-menu">
                    <ul>
                      <li>
                        <Link to="/doctor">
                          <i className="fas fa-columns" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/appointments">
                          <i className="fas fa-calendar-check" />
                          <span>Appointments</span>
                        </Link>
                      </li> */}
                      <li>
                        <Link to="/schedule">
                          <i className="fas fa-hourglass-start" />
                          <span>Schedule Timings</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/accounts">
                          <i className="fas fa-file-invoice-dollar" />
                          <span>Accounts</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/reviews">
                          <i className="fas fa-star" />
                          <span>Reviews</span>
                        </Link>
                      </li>
                      <li className="active">
                        <Link to="/profile">
                          <i className="fas fa-user-cog" />
                          <span>Profile Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/changepassword">
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
              <form onSubmit={handleFormSubmit}>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Basic Information</h4>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="change-avatar">
                            <div className="profile-img">
                              <img
                                src={preview ? preview : pic}
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
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="mb-2">
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            className="form-control"
                            readOnly=""
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="mb-2">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            readOnly=""
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="mb-2">
                            Phone Number<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="mb-2">
                            Gender<span className="text-danger"> *</span>
                          </label>
                          <select
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            className="form-select form-control">
                            <option>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                          {errors.gender && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.gender}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="mb-2">
                            Date of Birth<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="date"
                            onChange={(e) => setDOB(e.target.value)}
                            value={dob}
                            className="form-control"
                          />
                          {errors.dob && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.dob}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-0">
                          <label className="mb-2">
                            Fees<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="number"
                            onChange={(e) => setFees(e.target.value)}
                            value={fees}
                            className="form-control"
                          />
                          {errors.fees && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.fees}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">About Me</h4>
                    <div className="mb-0">
                      <label className="mb-2">Biography</label>
                      <textarea
                        className="form-control"
                        onChange={handleAboutRemainingChange}
                        value={aboutMe}
                        rows={5}
                      />
                      <p
                        className=" "
                        style={{ color: "red", fontSize: "13px" }}>
                        Words remaining: {remainingWords}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Clinic Info</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="mb-2">Clinic Name</label>
                          <input
                            type="text"
                            onChange={(e) => setClinicName(e.target.value)}
                            value={clinicName}
                            className="form-control"
                          />
                          {errors.clinicName && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.clinicName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="mb-2">Clinic Address</label>
                          <input
                            type="text"
                            onChange={(e) => setClinicAddress(e.target.value)}
                            value={clinicAddress}
                            className="form-control"
                          />
                          {errors.clinicAddress && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.clinicAddress}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card ">
                  <div className="card-body">
                    <h4 className="card-title">Address</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="mb-2">
                            Address Line 1
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setAddress1(e.target.value)}
                            value={address1}
                            className="form-control"
                          />
                          {errors.address1 && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.address1}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="control-label">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setAddress2(e.target.value)}
                            value={address2}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="control-label">
                            City<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            className="form-control"
                          />
                          {errors.city && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.city}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="control-label">
                            State / Province
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            className="form-control"
                          />
                          {errors.state && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.state}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="control-label">
                            Country<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            className="form-control"
                          />
                          {errors.country && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.country}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="control-label">
                            Postal Code<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="number"
                            onChange={(e) => setPostalCode(e.target.value)}
                            value={postalCode}
                            className="form-control"
                          />
                          {errors.postalCode && (
                            <span style={{ color: "red", fontSize: "13px" }}>
                              {errors.postalCode}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card services-card">
                  <div className="card-body">
                    <h4 className="card-title">
                      Specialization<span className="text-danger"> *</span>
                    </h4>

                    <div className="mb-0">
                      <input
                        className="input-tags form-control"
                        type="text"
                        data-role="tagsinput"
                        placeholder="Enter Specialization"
                        name="specialist"
                        id="specialist"
                        onChange={(e) => setSpecialization(e.target.value)}
                        value={specialization}
                      />
                      {errors.specialization && (
                        <span style={{ color: "red", fontSize: "13px" }}>
                          {errors.specialization}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Education</h4>
                    {education.map((edu, index) => (
                      <div className="education-info" key={index}>
                        <div className="row education-cont">
                          <div className="col-12 col-md-10 col-lg-11">
                            <div className="row">
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="mb-3">
                                  <label className="mb-2">
                                    Qualification
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="qualification"
                                    value={edu.qualification}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                  {errors.education && (
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                      }}>
                                      {errors.education}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="mb-3">
                                  <label className="mb-2">
                                    College/Institute
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="collegeName"
                                    value={edu.collegeName}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6 col-lg-4">
                                <div className="mb-3">
                                  <label className="mb-2">
                                    Year of Completion
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="yearOfCompletion"
                                    value={edu.yearOfCompletion}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index !== 0 && ( // Condition to render the Remove button only for slots after the first one
                          <div className="remove-education">
                            <a onClick={() => handleRemoveEducation(index)}>
                              <i className="fa fa-minus-circle" /> Remove
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="add-more mt-2">
                      <a className="add-education" onClick={handleAddEducation}>
                        <i className="fa fa-plus-circle" /> Add More
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Experience</h4>
                    {/* {experiences.map((experience, index) => ( */}
                    <div className="experience-info">
                      <div className="row experience-cont">
                        <div className="col-12 col-md-10 col-lg-11">
                          <div className="row">
                            <div className="col-12 col-md-6 col-lg-4">
                              <div className="mb-3">
                                <label className="mb-2">
                                  Years of Experience
                                  <span className="text-danger"> *</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="hospitalName"
                                  value={yearOfExperience}
                                  onChange={(e) =>
                                    setYearOfExperience(e.target.value)
                                  }
                                  // onChange={(event) =>
                                  //   handleInputChange(index, event)
                                  // }
                                />
                                {errors.yearOfExperience && (
                                  <span
                                    style={{ color: "red", fontSize: "13px" }}>
                                    {errors.yearOfExperience}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Awards & Achievements</h4>
                    {awards.map((award, index) => (
                      <div key={index} className="awards-info">
                        <div className="row awards-cont">
                          <div className="col-12 col-md-5">
                            <div className="mb-3">
                              <label className="mb-2">Awards</label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={award.name}
                                onChange={(event) =>
                                  handleAwardChange(index, event)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-5">
                            <div className="mb-3">
                              <label className="mb-2">Year</label>
                              <input
                                type="text"
                                className="form-control"
                                name="year"
                                value={award.year}
                                onChange={(event) =>
                                  handleAwardChange(index, event)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {index !== 0 && (
                          <div className="row">
                            <div className="col-12">
                              <div className="mb-3">
                                <a onClick={() => handleRemoveAward(index)}>
                                  <i className="fa fa-minus-circle" /> Remove
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="add-more">
                      <a
                        href="javascript:void(0);"
                        className="add-experience"
                        onClick={handleAddAward}>
                        <i className="fa fa-plus-circle" /> Add More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Licence </h4>
                    <div className="registrations-info">
                      <div className="row reg-cont">
                        <div className="col-12 col-md-5">
                          <div className="mb-3">
                            <label className="mb-2">
                              Licence number
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setLicenceNumber(e.target.value)}
                              value={licenceNumber}
                              className="form-control"
                            />
                            {errors.licenceNumber && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.licenceNumber}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-md-5">
                          <div className="mb-3">
                            <label className="mb-2">
                              Year of issue
                              <span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              onChange={(e) =>
                                setYearLicenceNumber(e.target.value)
                              }
                              value={yearLicenceNumber}
                              className="form-control"
                            />
                            {errors.yearOfIssued && (
                              <span style={{ color: "red", fontSize: "13px" }}>
                                {errors.yearOfIssued}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <a onClick={openFile}> see uploaded file</a>
                    <h4 className="card-title">
                      Certificate<span className="text-danger"> *</span>
                    </h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <div className="relative-form">
                            <label htmlFor="certificateUpload">
                              Upload Certificate Here
                            </label>
                            <div className="relative-file-upload">
                              <input
                                type="file"
                                id="certificateUpload"
                                onChange={handleFileChange}
                                accept=".pdf"
                              />
                              <span>
                                {fileName
                                  ? `Selected File: ${fileName}`
                                  : "Choose File"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* {filePreview && (
                      <div>
                        <h5>Preview</h5>
                        {fileName.toLowerCase().endsWith(".pdf") ? (
                          <embed
                            src={filePreview}
                            type="application/pdf"
                            width="100%"
                            height="500px"
                          />
                        ) : (
                          <img
                            src={filePreview}
                            alt="Preview"
                            style={{ maxWidth: "100%" }}
                          />
                        )}
                      </div>
                    )} */}
                    <iframe
                      style={{ width: "100%", height: "600px" }}
                      src={`https://healthbackend-3xh2.onrender.com/files/${uploadedFileName}`}></iframe>
                  </div>
                </div>

                <div className="submit-section submit-btn-bottom">
                  <button
                    type="submit"
                    // onClick={handleSubmit}
                    className="btn btn-primary prime-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
