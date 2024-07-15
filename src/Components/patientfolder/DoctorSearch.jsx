import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import FilterDisplay from "../patientfolder/FilterDisplay";
import { OrderState } from "../../Contexts";
import moment from "moment";

export default function Search2() {
  const { generatedText, selectedSpecialisthome, selectedLocation } =
    OrderState();
  console.log(selectedSpecialisthome, selectedLocation);
  const [feeRange, setFeeRange] = useState([0, 5000]); // Initial fee range

  const [allDoctor, setAllDoctor] = useState([]);
  const [filterDoctor, setFilterDoctor] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState("");

  // Soring logic

  const [filters, setFilters] = useState({
    sortOrder: "",
    gender: "",
    specialization: "",
    experience: [],
    ratings: [],
    availability: "",
    feeRange: [0, 5000],
    specialist: "",
    location:"",
  });
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  const handleAvailabilityChange = (event) => {
    const { name } = event.target;
    setAvailabilityFilter((prevFilter) => (prevFilter === name ? "" : name));
    handleFilterChange("availability", name);
  };

  const handleFilterChange = (name, value) => {
    if (name === "experience") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        experience: prevFilters.experience.includes(value) ? [] : [value],
      }));
    } else if (name === "ratings") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ratings: prevFilters.ratings.includes(value) ? [] : [value],
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name] === value ? "" : value,
      }));
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const applyFilters = (doctors, filters) => {
    let filteredDoctors = [...doctors];

    console.log(doctors)

    if (filters.availability) {
      const todayIndex = new Date().getDay();
      const today = new Date().getDay();
      const todayss = daysOfWeek[todayIndex - 1];
      const tomorrow = (today + 1) % 7;
      // console.log(daysOfWeek[tomorrow-1])

      filteredDoctors = filteredDoctors.filter((doc) => {
        const schedules = doc.schedules;
        const todaySlots = schedules[todayss?.toLowerCase()] || [];
        const tomorrowSlots = schedules[daysOfWeek[tomorrow - 1]?.toLowerCase()] || []; 
        // console.log(todaySlots,schedules[Object.keys(schedules)[today]].some(
        //   (slot) => !slot.isBooked
        // ),schedules[todayss.toLowerCase()],todayss,doc.userId.name)

        if (filters.availability === "Available Today") {
          return (
            todaySlots.length > 0 && todaySlots.some((slot) => !slot.isBooked)
          );
        } else if (filters.availability === "Available Tomorrow") {
          const today = moment().format("dddd").toLowerCase();
          const tomorrow = moment().add(1, "days").format("dddd").toLowerCase();

          const todaySlots = schedules[today] || [];
          const tomorrowSlots = schedules[tomorrow] || [];

          const todayAvailable = todaySlots.some((slot) => !slot.isBooked);
          const tomorrowAvailable = tomorrowSlots.some(
            (slot) => !slot.isBooked
          );

          return !todayAvailable && tomorrowAvailable;
        } else if (filters.availability === "Available for 7 days") {
          //  It only display doctor available for 7 days excluded today and tommorew
          //     const todayAvailable = todaySlots.length > 0 && todaySlots.some(slot => !slot.isBooked);
          // const tomorrowAvailable = tomorrowSlots.length > 0 && tomorrowSlots.some(slot => !slot.isBooked);
          // return !todayAvailable && !tomorrowAvailable;
          return daysOfWeek.some((day) => {
            const daySlots = schedules[day.toLowerCase()] || [];
            return (
              daySlots.length > 0 && daySlots.some((slot) => !slot.isBooked)
            );
          });
        }
        return false;
      });
    }

    if (filters.sortOrder) {
      filteredDoctors.sort((a, b) => {
        if (filters.sortOrder === "ascending") {
          return a.userId.name.localeCompare(b.userId.name);
        } else if (filters.sortOrder === "descending") {
          return b.userId.name.localeCompare(a.userId.name);
        }
        return 0;
      });
    }

    if (filters.gender) {
      filteredDoctors = filteredDoctors.filter(
        (doc) => doc.gender === filters.gender
      );
    }

    if (filters.ratings.length > 0) {
      filteredDoctors = filteredDoctors.filter((doc) => {
        const avgRating =
          doc.reviews.reduce((acc, review) => acc + review.rating, 0) /
          doc.reviews.length;
        return filters.ratings.some((rating) => {
          if (rating === "5" && avgRating >= 4.5) return true;
          if (rating === "4" && avgRating >= 3.5 && avgRating < 4.5)
            return true;
          if (rating === "3" && avgRating >= 2.5 && avgRating < 3.5)
            return true;
          if (rating === "2" && avgRating >= 1.5 && avgRating < 2.5)
            return true;
          if (rating === "1" && avgRating < 1.5) return true;
          return false;
        });
      });
    }

    if (filters.experience.length > 0) {
      filteredDoctors = filteredDoctors.filter((doc) => {
        return filters.experience.some((exp) => {
          if (
            exp === "1-5" &&
            doc.yearOfExperience >= 1 &&
            doc.yearOfExperience <= 5
          )
            return true;
          if (exp === "5+" && doc.yearOfExperience > 5) return true;
          return false;
        });
      });
    }

    if (filters.feeRange) {
      filteredDoctors = filteredDoctors.filter((doc) => {
        return (
          doc.fees >= filters.feeRange[0] && doc.fees <= filters.feeRange[1]
        );
      });
    }

    // console.log(filters.s)
    if (filters.specialist) {
      console.log("a1");
      filteredDoctors = filteredDoctors.filter((doc) => {
        return doc.specialization.includes(filters.specialist);
      });
    }

    if(filters.location){
      filteredDoctors = filteredDoctors.filter((doc)=>{
        return doc.city === filters.location;
      })
    }

    return filteredDoctors;
  };

  console.log("aksahy",filters);
  let filteredDoctors = applyFilters(allDoctor, filters);
  // setFilterDoctor(filteredDoctors)

  // Function to handle change in fee range
  const handleFeeChange = (event) => {
    const newValue = [Number(event.target.value), filters.feeRange[1]];
    setFilters((prevFilters) => ({
      ...prevFilters,
      feeRange: newValue,
    }));
  };

  const handleMinFeeChange = (event) => {
    const newMinValue = Number(event.target.value);
    setFeeRange([newMinValue, feeRange[1]]);
    handleFilterChange("feeRange", [newMinValue, feeRange[1]]);
  };

  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const data1 = {
    specialists: [
      { id: 1, name: "Cardiologist" },
      { id: 2, name: "Dermatologist" },
      { id: 3, name: "Heart specialists" },
      ,
      { id: 4, name: "Gastroenterologist" },
      { id: 5, name: "Hematologist" },
      { id: 6, name: "Neurologist" },
      { id: 7, name: "Oncologist" },
      { id: 8, name: "Ophthalmologist" },
      { id: 9, name: "Orthopedic Surgeon" },
      { id: 10, name: "Pediatrician" },
      { id: 11, name: "Plastic Surgeon" },
      { id: 12, name: "Psychiatrist" },
      { id: 13, name: "Radiologist" },
      { id: 14, name: "Rheumatologist" },
      { id: 15, name: "Cancer Specialist" },
      { id: 16, name: "Anesthesiologist" },
      { id: 17, name: "Gynecologist" },
      { id: 18, name: "Otolaryngologist (ENT Specialist)" },
      { id: 19, name: "Pathologist" },
      { id: 20, name: "Pulmonologist" },
      { id: 21, name: "Dentist" },
      { id: 22, name: "Cancer Specialist" },
    ],
  };

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr.Suresh Joshi",
      image: "assets/img/doctors/doctor-13.jpg",
      speciality: "MBBS, Dentist",
      location: "Andheri West - Mumbai, India",
      experience: "20 Years of Experience",
      availability: "Available Today",
      rating: 4.5,
      reviews: 35,
      fee: 1500,
    },
    {
      id: 2,
      name: "Dr. Abhijit Dey",
      image: "assets/img/doctors/doctor-14.jpg",
      speciality: "BDS, MDS - Oral & Maxillofacial Surgery",
      location: "Andheri West - Mumbai, India",
      experience: "15 Years of Experience",
      availability: "Available Tomorrow",
      rating: 4.3,
      reviews: 22,
      fee: 2800,
    },
    {
      id: 3,
      name: "Dr. Sofia Brient",
      image: "assets/img/doctors/doctor-15.jpg",
      speciality: "MBBS, Dentist",
      location: "Andheri West - Mumbai, India",
      experience: "20 Years of Experience",
      availability: "Available Today",
      rating: 4.5,
      reviews: 35,
      fee: 3300,
    },
    {
      id: 4,
      name: "Dr. Johny Rita",
      image: "assets/img/doctors/doctor-16.jpg",
      speciality: "MBBS, Dentist",
      location: "Andheri West - Mumbai, India",
      experience: "20 Years of Experience",
      availability: "Available Today",
      rating: 4.5,
      reviews: 35,
      fee: 1000,
    },
    {
      id: 5,
      name: "Dr. Deborah Angel",
      image: "assets/img/doctors/doctor-17.jpg",
      speciality: "MBBS, Dentist",
      location: "Andheri West - Mumbai, India",
      experience: "20 Years of Experience",
      availability: "Available Today",
      rating: 4.5,
      reviews: 35,
      fee: 500,
    },
  ]);
  // const filteredDoctors = doctors.filter(
  //   (doctor) => doctor.fee <= feeRange[0] && doctor.fee <= feeRange[1]
  // );

  const handleSpecialistChange = (e) => {
    const { value } = e.target;
    setSelectedSpecialist(value);
   
    setFilters(prevFilters =>({
      ...prevFilters,
      specialist: value,
    }));
  };

  const getAllDoctors = async () => {
    try {
      const response = await axios.get(
        "https://healthbackend-3xh2.onrender.com/patient/search",
        {
          headers: {
            isvalidrequest: "twinsistech",
          },
        }
      );

      console.log(response);
      // setDocFilter(response.data.result);
      setAllDoctor(response.data.result);

      // console.log(selectedSpecialisthome)
      // if (selectedSpecialisthome || selectedLocation)
      //   handleSearchFilter(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchFilter = (result) => {
    console.log(selectedSpecialisthome, selectedLocation);
    filteredDoctors = result.filter((doctor) => {
      const specialistMatch =
        !selectedSpecialisthome ||
        doctor?.specialization.includes(selectedSpecialisthome);
      const locationMatch =
        !selectedLocation || doctor.city === selectedLocation;
      return specialistMatch && locationMatch;
    });
    console.log(filteredDoctors);
    setFilterDoctor(filteredDoctors);
  };

  //    filteredDoctors = filterDoctor;

  useEffect(() => {
    getAllDoctors();

    

  //   if(selectedSpecialisthome){
  //   setFilters(prevFilters =>({
  //     ...prevFilters,
  //     specialist: selectedSpecialisthome,
  //   }));
  // }
  // else if(selectedLocation){
  //   setFilters(prevFilters =>({
  //     ...prevFilters,
  //     location: selectedLocation,
  //   }));
  // }
  //else{
  //   setFilters(prevFilters =>({
  //     ...prevFilters,
  //     specialist: selectedSpecialisthome,
  //   }));
  //   }

  }, []);

  useEffect(() => {
    if (selectedSpecialisthome || selectedLocation) {
      setFilters(prevFilters => ({
        ...prevFilters,
        ...(selectedSpecialisthome && { specialist: selectedSpecialisthome }),
        ...(selectedLocation && { location: selectedLocation }),
      }));
    }
  }, [selectedSpecialisthome, selectedLocation]);
  
  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
      <title>Twinsdoc</title>
      <div className="main-wrapper search-page">
        <div className="breadcrumb-bar-two">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <h2 className="breadcrumb-title">Search Physicians</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Search Physicians
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="doctor-content content">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 map-view">
                <div className="row">
                  <div className="col-lg-3  theiaStickySidebar">
                    <div className="filter-contents">
                      <div className="filter-header">
                        <h4 className="filter-title">Filter</h4>
                      </div>
                      <div className="filter-details">
                        <div className="filter-grid">
                          <h4>
                            <a href="#collapseone" data-bs-toggle="collapse">
                              Gender
                            </a>
                          </h4>
                          <div id="collapseone" className="collapse show">
                            <div className="filter-collapse">
                              <ul>
                                <li>
                                  <label className="custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="gender"
                                      value="Male"
                                      checked={filters.gender === "Male"}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "gender",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    Male
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="gender"
                                      value="Female"
                                      checked={filters.gender === "Female"}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "gender",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    Female
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="gender"
                                      value="Other"
                                      checked={filters.gender === "Other"}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "gender",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    Other
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {/* <div className="filter-grid">
                          <h4>
                            <a href="#collapsetwo" data-bs-toggle="collapse">
                              Availability
                            </a>
                          </h4>
                          <div id="collapsetwo" className="collapse show">
                            <div className="filter-collapse">
                              <ul>
                                <li>
                                  <label className="custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="Available Today"
                                      checked={
                                        availabilityFilter === "Available Today"
                                      }
                                      onChange={handleAvailabilityChange}
                                    />
                                    <span className="checkmark" />
                                    Available Today
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="Available Tomorrow"
                                      checked={
                                        availabilityFilter ===
                                        "Available Tomorrow"
                                      }
                                      onChange={handleAvailabilityChange}
                                    />
                                    <span className="checkmark" />
                                    Available Tomorrow
                                  </label>
                                </li>
                                
                              </ul>
                            </div>
                          </div>
                        </div> */}
                        <div className="filter-grid">
                          <h4>
                            <a href="#collapsetwo" data-bs-toggle="collapse">
                              Price
                            </a>
                          </h4>
                          <div id="collapsethree" className="collapse show">
                            <div className="filter-collapse">
                              <div className="filter-content filter-content-slider">
                                <div className="slider-wrapper">
                                  <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="100"
                                    value={feeRange[0]}
                                    onChange={handleMinFeeChange}
                                    style={{
                                      width: "100%",
                                      height: "10px",
                                      borderRadius: "5px",
                                      background: "#E9ECF1",
                                      outline: "none",
                                      opacity: "0.7",
                                      transition: "opacity 0.2s",
                                    }}
                                  />
                                </div>
                                <div className="price-wrapper">
                                  <h6>
                                    Price :
                                    <span>
                                     ₹ {feeRange[0]} - ₹ {feeRange[1]}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="filter-grid">
                          <h4>
                            <a href="#collapsefive" data-bs-toggle="collapse">
                              Experience
                            </a>
                          </h4>
                          <div id="collapsefive" className=" collapse show">
                            <div className="filter-collapse">
                              <ul>
                                <li>
                                  <label className="custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="experience"
                                      value="1-5"
                                      checked={filters.experience.includes(
                                        "1-5"
                                      )}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "experience",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    1-5 Years
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="experience"
                                      value="5+"
                                      checked={filters.experience.includes(
                                        "5+"
                                      )}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "experience",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    5+ Years
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="filter-grid">
                          <h4>
                            <a href="#collapseseven" data-bs-toggle="collapse">
                              By Rating
                            </a>
                          </h4>
                          <div id="collapseseven" className="collapse show">
                            <div className="filter-collapse">
                              <ul>
                                <li>
                                  <label className="custom_check rating_custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="rating"
                                      value="5"
                                      checked={filters.ratings.includes("5")}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "ratings",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    <div className="rating">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <span className="rating-count"></span>
                                    </div>
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check rating_custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="online"
                                      value="4"
                                      checked={filters.ratings.includes("4")}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "ratings",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    <div className="rating">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <span className="rating-count"></span>
                                    </div>
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check rating_custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="rating"
                                      value="3"
                                      checked={filters.ratings.includes("3")}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "ratings",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    <div className="rating">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <span className="rating-count"></span>
                                    </div>
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check rating_custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="rating"
                                      value="2"
                                      checked={filters.ratings.includes("2")}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "ratings",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    <div className="rating">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <span className="rating-count"></span>
                                    </div>
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check rating_custom_check d-inline-flex">
                                    <input
                                      type="checkbox"
                                      name="rating"
                                      value="1"
                                      checked={filters.ratings.includes("1")}
                                      onChange={(e) =>
                                        handleFilterChange(
                                          "ratings",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span className="checkmark" />
                                    <div className="rating">
                                      <i className="fas fa-star filled" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <i className="fas fa-star" />
                                      <span className="rating-count"></span>
                                    </div>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  */}

                  <div className="col-lg-9">
                    <div className="doctor-filter-info">
                      <div className="doctor-filter-inner">
                        <div>
                          <div className="doctors-found">
                            <p>
                              <span>{filteredDoctors.length} Physicians found ...</span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="doctor-filter-sort">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: "500px",
                              }}>
                              <div
                                className="doctor-filter-sort"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexGrow: 1,
                                  position: "relative",
                                  marginRight: "60px",
                                }} // Adjust marginRight for gap
                              >
                                <i
                                  className="feather-search bficon"
                                  style={{
                                    position: "absolute",
                                    left: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                  }} // Positioning the icon
                                />

                                <div
                                  className="doctor-filter-select"
                                  style={{ flexGrow: 1, display: "flex" }}>
                                  <select
                                    className="form-control"
                                    value={selectedSpecialist}
                                    onChange={handleSpecialistChange}
                                    style={{
                                      flexGrow: 1,
                                      minWidth: "300px",
                                      paddingLeft: "35px",
                                    }} // Adjust minWidth and paddingLeft to match placeholder length and icon position
                                  >
                                    <option value="" disabled selected={selectedSpecialist === ""}>
              { selectedSpecialist || selectedSpecialisthome || "Search Physicians, specialists" }
            </option>
                                    {data1.specialists.map((specialist) => (
                                      <option
                                        key={specialist.id}
                                        value={specialist.name}>
                                        {specialist.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            {/* <i className="feather-search bficon" />

                            <div className="doctor-filter-select w-100">
                              <select
                                className="form-control  "
                                value={selectedSpecialist}
                                onChange={handleSpecialistChange}
                              >
                                <option
                                  className="doctor-filter-option"
                                  value=""
                                >
                                  Search Physicians, specialists
                                </option>
                                {data1.specialists.map((specialist) => (
                                  <option
                                    key={specialist.id}
                                    value={specialist.name}
                                  >
                                    {specialist.name}
                                  </option>
                                ))}
                              </select>
                            </div> */}
                          </div>
                        </div>

                        <div className="doctor-filter-option">
                          <div className="doctor-filter-sort">
                            <p>Sort</p>
                            <div className="doctor-filter-select w-100">
                              <select
                                className="form-control"
                                value={filters.sortOrder}
                                onChange={(e) =>
                                  handleFilterChange(
                                    "sortOrder",
                                    e.target.value
                                  )
                                }>
                                <option value="">Select</option>
                                <option value="ascending">
                                  Ascending Order
                                </option>
                                <option value="descending">
                                  Descending Order
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Doctor map */}

                    <div>
                      {/* {filteredDoctors.map((doctor, index) => (
        <div className="card doctor-card" key={index}>
          <div className="card-body">
            <div className="doctor-widget-one">
              <div className="doc-info-left">
                <div className="doctor-img">
                  <a href="doctor-profile.html">
                    <img
                      src={doctor.image}
                      className="img-fluid"
                      alt={doctor.name}
                    />
                  </a>
                </div>
                <div className="doc-info-cont">
                  <h4 className="doc-name">
                    <a href="doctor-profile.html">{doctor.name}</a>
                    <i className="fas fa-circle-check" />
                  </h4>
                  <p className="doc-speciality">{doctor.speciality}</p>
                  <div className="clinic-details">
                    <p className="doc-location">
                      <i className="feather-map-pin" />
                      {doctor.location}
                    </p>
                    <p className="doc-location">
                      <i className="feather-award" /> {doctor.experience}
                    </p>
                  </div>
                </div>
              </div>
              <div className="doc-info-right">
                <div className="clini-infos">
                  <ul>
                    <li>
                      <i className="feather-clock available-icon" />
                      <span className="available-date">
                        {doctor.availability}
                      </span>
                    </li>
                    <div className="reviews-ratings">
                      <p>
                        <span>
                          <i className="fas fa-star" /> {doctor.rating}
                        </span>{" "}
                        ({doctor.reviews} Reviews)
                      </p>
                    </div>
                    <li>
                    ₹ {doctor.fee}{' '}
                      <i className="feather-info available-info-icon" />
                    </li>
                  </ul>
                </div>
                <div className="clinic-booking book-appoint">
                  <Link className="btn btn-primary" to="/doctor-profile">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))} */}
                      {/* {selectedSpecialisthome || selectedLocation ? (
                        <FilterDisplay filterData={filterDoctor} />
                      ) : ( */}
                      <FilterDisplay filterData={filteredDoctors} />
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-12 theiaStickySidebar map-right">
                <div id="map" className="map-listing" />
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
