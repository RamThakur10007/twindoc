import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Data from "./Components/patientfolder/data";
import { OrderState } from "./Contexts";
import { Country, City } from "country-state-city";

export default function Homepage() {
  const [generatedText, setGeneratedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isResultVisibleOrderState, setResultVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [topDoctors, setTopDoctors]=useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const promptInput = document.getElementById("prompt").value.trim();
    setErrorMessage("");

    if (!promptInput) {
      setErrorMessage("Please enter a prompt.");
    } else {
      try {
        // Display processing message
        setLoading(true);

        setResultVisible(true);
        const response = await generateText(promptInput);
        setGeneratedText(response);
        setSelectedSpecialisthome(response)
        console.log(response);
        navigate("/user/docsearch", {
          state: { prompt: promptInput, generatedText: response },
        });
      } catch (error) {
        setErrorMessage(
          "Error: Failed to generate content. Please try again later."
        );
      } finally {
        // Reset loading state after processing
        setLoading(false);
      }
    }
  };

  const generateText = async (prompt) => {
    const url =
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyAOw_9JeI-xld7WL3pEtFotq9HyuC9pBiw"; // Replace with your API key
    const data = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                prompt +
                "I want the name of the specialist doctor from this symptoms i want only one word response and choose the specialist from this list of specialist: Cardiologist, Dermatologist, Heart specialists, Gastroenterologist, Hematologist, Neurologist, Oncologist, Ophthalmologist, Orthopedic Surgeon, Pediatrician, Plastic Surgeon, Psychiatrist, Radiologist, Rheumatologist, Cancer Specialist, Anesthesiologist, Gynecologist, Otolaryngologist (ENT Specialist), Pathologist, Pulmonologist, Dentist. If user enters any wrong input or random text which is not even a symptom or word then give suggestion to please enter correct symptoms. This is must.",
            },
          ],
        },
      ],
    };

    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to generate content.");
    }

    const result = await response.json();
    let generatedText = result["candidates"][0]["content"]["parts"][0]["text"];
    // Remove or trim stars from the generated text
    generatedText = generatedText.replace(/\*/g, "").trim();
    return generatedText;
  };

  const {
    homeDocFilter,
    setHomeDocFilter,
    selectedSpecialist,
    setSelectedSpecialist,
    selectedLocation,
    setSelectedLocation,
    setSelectedSpecialisthome,
  } = OrderState();

  const handleSpecialistChange = (e) => {
    setSelectedSpecialist(e.target.value);
    setSelectedSpecialisthome(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const data = {
    specialists: [
      { id: 1, name: "Cardiologist" },
      { id: 2, name: "Dermatologist" },
      { id: 3, name: "Heart specialists" },
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
      { id: 23, name: "Pediatrician Specialist" },
      { id: 24, name: "Aurvadic Specialist" },
      { id: 25, name: "Trichologist Specialist" },
    ],
  };

  const handleSearchFilter = (e) => {
    navigate("/user/docsearch");
  };

  const [docFilter, setDocFilter] = useState("");

  const getAllDoctors = async () => {
    const isAuthenticated = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://healthbackend-3xh2.onrender.com/patient/search",
        {
          headers: {
            isvalidrequest: "twinsistech",
            authorization: isAuthenticated,
          },
        }
      );

      console.log(response);
      setHomeDocFilter(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopDoctors = async () =>{
    try {
      const response = await axios.get(
        "https://healthbackend-3xh2.onrender.com/patient/top",
        {
          headers:{
            isvalidrequest:"twinsistech",
            
          },
        }
      );
      console.log(response)

      setTopDoctors(response?.data?.result);
    } catch (error) {
      console(error)
    }
  }

  const handleSearch = () => {
    navigate("/user/docsearch", { state: { docFilters: docFilter } });
  };


  const handleDocProfile =(id)=>{

    // console.log("click");

    navigate(`/user/physician/${id}`);
  }

  useEffect(() => {
    getAllDoctors();
    getTopDoctors();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const defaultCountryISO = "IN"; // ISO code for India
  const [city, setCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [citiesInCountry, setCitiesInCountry] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCurosalBaby = () =>{

    // pediatrician , Aurvadic, trichologist
    setSelectedSpecialisthome('Pediatrician Specialist');
    navigate('/user/docsearch');
    
  }

  const handleCurosalAyurveda = () =>{

    // Aurvadic,
    setSelectedSpecialisthome('Aurvadic Specialist');
    navigate('/user/docsearch');
    
  }
  const handleCurosalSkinHair = () =>{

    //  trichologist
    setSelectedSpecialisthome('Trichologist Specialist');
    navigate('/user/docsearch');
    
  }

  useEffect(() => {
    const cities = City.getAllCities()
      .filter((city) => city.countryCode === defaultCountryISO)
      .map((city) => ({
        value: city.name,
        displayValue: city.name,
      }));
    setCitiesInCountry(cities);
  }, [defaultCountryISO]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = citiesInCountry.filter((city) =>
        city.displayValue.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm, citiesInCountry]);

  const handleCityChange = (val) => {
    setCity(val);
    setSearchTerm(val);
    setShowDropdown(false);
    setSelectedLocation(val)
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleBlur = () => {
    // Hide dropdown after a delay to allow click event to register
    setTimeout(() => setShowDropdown(false), 100);
  };

  useEffect (()=>{
    window.scrollTo(0, 0);
  },[]);
  return (
    <>
      <title>TwinsDoc</title>

      <div className="main-wrapper">
        {/* This header is temperary just for demonstration */}

        <section className="banner-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="banner-content " style={{marginBottom:'-60px'}}>
                  <h1>
                    <span>Your Wellbeing</span>, Our Priority
                  </h1>
                  <img
                    src="/assets/img/icons/header-icon.svg"
                    className="header-icon"
                    alt="header-icon"
                  />
                  <p>
                    Empowering Health Journeys by Connecting Patients and Physicians on TwinsDoc.
                  </p>
                  {/* <a className="btn">Search Physician</a> */}
                  {/* <div className="banner-arrow-img ">
                    <img
                      src="/assets/img/down-arrow-img.png"
                      className="img-fluid"
                      alt="down-arrow"
                    />
                  </div> */}
                </div>

                {/* search specialist */}
                <div className="search-box-one">
                  <form>
                    {/* Specialist Dropdown */}
                    <div className="search-input search-line">
                      <i className="feather-search bficon" />
                      <div>
                        <select
                          className="form-control mx-2 border-0"
                          value={selectedSpecialist}
                          onChange={handleSpecialistChange}>
                          <option value="">Search Physicians, specialists</option>
                          {data.specialists.map((specialist) => (
                            <option key={specialist.id} value={specialist.name}>
                              {specialist.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Location Dropdown */}
                    <div className="search-input search-map-line">
                      <i className="feather-map-pin" />
                      <div>
                        {/* <select
                          className="form-control mx-3 border-0"
                          value={selectedLocation}
                          onChange={handleLocationChange}>
                          <option value="">Location</option>
                          {cities.names.map((city) => (
                            <option key={city.id} value={city.city}>
                              {city.city}
                            </option>
                          ))}
                        </select> */}
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          onBlur={handleBlur}
                          onFocus={() => setShowDropdown(true)}
                          className="form-control mx-3 border-0"
                          placeholder="Location"
                        />
                        {showDropdown && filteredCities.length > 0 && (
                          <ul
                            className="list-group position-absolute w-100"
                            style={{ zIndex: 1 }}>
                            {filteredCities.map((city, index) => (
                              <li
                                key={index}
                                className="list-group-item list-group-item-action"
                                onMouseDown={() =>
                                  handleCityChange(city.displayValue)
                                }>
                                {city.displayValue}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="form-search-btn">
                      <button
                        className="btn"
                        type="submit"
                        onClick={handleSearchFilter}>
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                <div className="find-doctor-wrapper my-3">
                  <form className="find-doctor-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-15">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search for Physicians by your symptoms, powered by AI"
                            id="prompt"
                            maxLength="100"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-auto form-search-btn">
                        <button
                          className="btn"
                          type="submit"
                          disabled={loading}>
                          {loading ? "Processing..." : "Search"}
                        </button>
                      </div>
                    </div>
                  </form>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-img ">
                  <img
                    src="/assets/img/file5.png"
                    className="img-fluid"
                    alt="patient-image"
                  />
                  {/* <div className="banner-img1">
                    <img
                      src="/assets/img/banner-img1.png"
                      className="img-fluid"
                      alt="checkup-image"
                    />
                  </div> */}
                  {/* <div className="banner-img2">
                    <img
                      src="/assets/img/banner-img2.png"
                      className="img-fluid"
                      alt="doctor-slide"
                    />
                  </div> */}
                  <div className="banner-img3">
                    <img
                      src="/assets/img/banner-img3.png"
                      className="img-fluid"
                      alt="doctors-list"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slidder */}
        <section className="way-section mt-5">
  <div className="container">
    <div className="row">
      <OwlCarousel
        className="owl-carousel specialities-slider-one owl-theme"
        loop
        margin={10}
        nav
        autoplay={true} // Enable autoplay
        autoplayTimeout={6000} // Set autoplay interval to 6 seconds (6000 ms)
        responsive={{
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 },
        }}
      >
        <div className="way-bg" onClick={handleCurosalBaby}>
          <div className="way-shapes-img">
            <div className="way-shapes-left">
              <img src="/assets/img/shape-06.png" alt="shape-image" />
            </div>
            <div className="way-shapes-right">
              <img src="/assets/img/shape-07.png" alt="shape-image" />
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-7 col-md-12">
              <div className="section-inner-header way-inner-header mb-0">
                <h2>Start Your Baby Planning Journey with Us. </h2>
                <p>
                  Embark on the journey to parenthood with confidence. Our expert team provides comprehensive guidance on family planning, prenatal care, fertility treatments, and lifestyle adjustments. We ensure personalized care and support every step of the way to help you achieve your dream of starting a family.
                </p>
                <Link onClick={handleCurosalBaby} className="btn btn-primary">
                  Search Physician
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="way-img">
                <img
                  src="/assets/img/banners/8SyIAErv3ukGdyzWQZKyB-transformed.png"
                  className="img-fluid"
                  alt="doctor-way-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="way-bg" onClick={handleCurosalAyurveda}>
          <div className="way-shapes-img">
            <div className="way-shapes-left">
              <img src="/assets/img/ban-sixteen-img2.png" alt="shape-image" />
            </div>
            <div className="way-shapes-right">
              <img src="/assets/img/shape-07.png" alt="shape-image" />
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-7 col-md-12">
              <div className="section-inner-header way-inner-header mb-0">
                <h2>Ayurveda: Pathway to Natural Wellness</h2>
                <p>
        Discover the pathway to natural wellness with our Ayurveda experts. We provide comprehensive care plans rooted in ancient practices to promote your overall health and well-being. Our holistic approach addresses physical, mental, and spiritual health, ensuring that you receive a balanced and thorough treatment. 
      </p>
                <Link onClick={handleCurosalAyurveda} className="btn btn-primary">
                  Search Physician
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="way-img">
                <img
                  src="/assets/img/banners/ayur2.png"
                  className="img-fluid"
                  alt="doctor-way-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="way-bg" onClick={handleCurosalSkinHair}>
          <div className="way-shapes-img">
            <div className="way-shapes-left"></div>
            <div className="way-shapes-right">
              <img src="/assets/img/shape-07.png" alt="shape-image" />
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-7 col-md-12">
              <div className="section-inner-header way-inner-header mb-0">
                <h2>Hair & Skin Harmony</h2>
                <p>
                  Say goodbye to skin and hair woes and embrace a radiant, confident you. Our platform connects you with top physicians in dermatology and trichology. From personalized skincare routines to advanced hair treatments, we offer expert solutions tailored to your needs. Experience the journey to flawless skin and lustrous hair with our unparalleled support and guidance.
                </p>
                <Link onClick={handleCurosalSkinHair} className="btn btn-primary">
                  Find Your Specialist
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="way-img">
                <img
                  src="/assets/img/banners/file (3).png"
                  className="img-fluid"
                  alt="doctor-way-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="way-bg" >
          <div className="way-shapes-img">
            <div className="way-shapes-left">
              <img src="/assets/img/ban-sixteen-img2.png" alt="shape-image" />
            </div>
            <div className="way-shapes-right">
              <img src="/assets/img/shape-07.png" alt="shape-image" />
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-7 col-md-12">
              <div className="section-inner-header way-inner-header mb-0">
                <h2>Complete Heart Treatment</h2>
                <p>
          Our expert cardiologists provide Complete heart care, from diagnosis to treatment and prevention. We use the latest technology and personalized care plans to ensure your heart health is in the best hands. With a focus on early detection and continuous monitoring, our dedicated team works with you to create a proactive approach to maintaining your heart health and improving your quality of life.
        </p>
                <Link  className="btn btn-primary">
                  Find Your Cardiologist
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="way-img">
                <img
                  src="/assets/img/banners/Designer__12_-removebg-preview.png"
                  className="img-fluid"
                  alt="heart-treatment-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="way-bg" >
          <div className="way-shapes-img">
            <div className="way-shapes-left">
              <img src="/assets/img/ban-sixteen-img2.png" alt="shape-image" />
            </div>
            <div className="way-shapes-right">
              <img src="/assets/img/shape-07.png" alt="shape-image" />
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-7 col-md-12">
              <div className="section-inner-header way-inner-header mb-0">
                <h2>Diabetes Wellness Hub</h2>
                <p>
          Manage your diabetes effectively with our expert team. We offer personalized treatment plans, dietary guidance, and continuous support to help you maintain optimal health. Our holistic approach ensures comprehensive care, empowering you to lead a healthier, more fulfilling life. With regular monitoring and tailored advice, we help you stay on track and achieve your health goals.
        </p>
                <Link  className="btn btn-primary">
                  Find Your Specialist
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="way-img">
                <img
                  src="/assets/img/banners/Designer__19_-removebg-preview.png"
                  className="img-fluid"
                  alt="diabetes-care-image"
                />
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </div>
  </div>
</section>


        {/* Spcialists */}
        <section className="specialities-section-one">
          <div className="container" style={{marginTop:"-50px"}}>
            <div className="row">
              <div className="col-md-6">
                <div className="section-header-one section-header-slider">
                  <h2 className="section-title">Our Specialities</h2>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <div className="owl-nav slide-nav-1 nav-control"></div>
              </div>
            </div>
            <OwlCarousel
              className="owl-carousel specialities-slider-one owl-theme"
              loop
              margin={10}
              nav
              autoplay={true} // Enable autoplay
              autoplayTimeout={3000} // Set autoplay interval to 3 seconds (3000 ms)
              responsive={{
                0: { items: 1 },
                600: { items: 3 },
                1000: { items: 5 },
              }}>
              <div className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img
                        src="/assets/img/specialities/specialities-01.svg"
                        alt="heart-image"
                      />
                    </span>
                  </div>
                  <p>Cardiology</p>
                </div>
              </div>
              <div className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img
                        src="/assets/img/specialities/specialities-02.svg"
                        alt="brain-image"
                      />
                    </span>
                  </div>
                  <p>Neurology</p>
                </div>
              </div>
              <div className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img
                        src="/assets/img/specialities/specialities-03.svg"
                        alt="kidney-image"
                      />
                    </span>
                  </div>
                  <p>Urology</p>
                </div>
              </div>
              <div className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img
                        src="/assets/img/specialities/specialities-04.svg"
                        alt="bone-image"
                      />
                    </span>
                  </div>
                  <p>Orthopedic</p>
                </div>
              </div>
              <div className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img
                        src="/assets/img/specialities/specialities-05.svg"
                        alt="dentist"
                      />
                    </span>
                  </div>
                  <p>Dentist</p>
                </div>
              </div>
              <div className="item">
                <div className="specialities-item">
                  <div className="specialities-img">
                    <span>
                      <img
                        src="/assets/img/specialities/specialities-06.svg"
                        alt="eye-image"
                      />
                    </span>
                  </div>
                  <p>Ophthalmology</p>
                </div>
              </div>
            </OwlCarousel>
            {/* <div className="specialities-btn">
              <a href="search.html" className="btn">
                See All Specialities
              </a>
            </div> */}
          </div>
        </section>


 {/* Top 10 Physicians */}
        <section className="doctors-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="section-header-one section-header-slider">
                  <h2 className="section-title">Physicians</h2>
                  <h5 style={{marginTop:'15px'}}>Meet Our Physicians</h5>
                  <p>Our team of experienced physicians is dedicated to providing top quality healthcare. <br/>We ensure personalized care and treatment plans tailored to each patient's needs.</p>
                </div>
                
              </div>
              <div className="col-md-6 text-end">
                <div className="owl-nav slide-nav-2 nav-control"></div>
              </div>
            </div>
            <OwlCarousel
              className="owl-carousel doctor-slider-one owl-theme"
              loop
              margin={10}
              nav
              autoplay={true} // Enable autoplay
              autoplayTimeout={3000} 
              responsive={{
                0: { items: 1 },
                600: { items: 3 },
                1000: { items: 5 },
              }}>

                {topDoctors?.map((doctor, index)=>(
                  <div key={index} className="item" onClick={()=>handleDocProfile(doctor?.userId)}>
                  {console.log(doctor)}
                <div className="doctor-profile-widget">
                  <div className="doc-pro-img">
                    <a >
                      <div className="doctor-profile-img">
                        <img
                          src={doctor?.profilePicture||
                            "/assets/img/doctors/doctor-thumb-02.jpg"}
                          className="img-fluid"
                          alt={doctor.userId}
                        />
                      </div>
                    </a>
                    <div className="doctor-amount"></div>
                  </div>
                  <div className="doc-content">
                    <div className="doc-pro-info">
                      <div className="doc-pro-name">
                        <a >{`Dr. ${doctor?.name}`}</a>
                        <p>{doctor?.specialization.join(', ')}</p>
                      </div>
                      <div className="reviews-ratings">
                        <p>
                          <span>
                            <i className="fas fa-star" /> {doctor?.avgRating}
                          </span>{" "}
                          ({doctor?.reviewCount || 0})
                        </p>
                      </div>
                    </div>
                    <div className="doc-pro-location">
                      <p>
                        <i className="feather-map-pin" /> {doctor?.city}
                      </p>
                    </div>
                  </div>
                </div>
                </div>
                )
              )

                }
             

              {/* Add similar item blocks for other doctors */}
            </OwlCarousel>
          </div>
        </section>

        <section className="work-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 work-img-info ">
                <div className="work-img">
                  <img
                    src="/assets/img/work-img.png"
                    className="img-fluid"
                    alt="doctor-image"
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-12 work-details">
                <div className="section-header-one ">
                  <h5>How it Works</h5>
                  <h2 className="section-title">
                    4 easy steps to get your solution
                  </h2>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 ">
                    <div className="work-info">
                      <div className="work-icon">
                        <span>
                          <img
                            src="/assets/img/icons/work-01.svg"
                            alt="search-doctor-icon"
                          />
                        </span>
                      </div>
                      <div className="work-content">
                        <h5>Search Physician</h5>
                        <p>Find the Right Healthcare Professional for You.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 ">
                    <div className="work-info">
                      <div className="work-icon">
                        <span>
                          <img
                            src="/assets/img/icons/work-02.svg"
                            alt="doctor-profile-icon"
                          />
                        </span>
                      </div>
                      <div className="work-content">
                        <h5>Check Physician Profile</h5>
                        <p>
                          Discover Specialties, Experience, and Reviews. Start
                          Your Health Journey Today!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 ">
                    <div className="work-info">
                      <div className="work-icon">
                        <span>
                          <img
                            src="/assets/img/icons/work-03.svg"
                            alt="calendar-icon"
                          />
                        </span>
                      </div>
                      <div className="work-content">
                        <h5>Schedule Appointment</h5>
                        <p>
                          Choose your time, pick a provider, and confirm in
                          seconds. Prioritize your well-being effortlessly!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 ">
                    <div className="work-info">
                      <div className="work-icon">
                        <span>
                          <img
                            src="/assets/img/icons/work-04.svg"
                            alt="solution-icon"
                          />
                        </span>
                      </div>
                      <div className="work-content">
                        <h5>Get Your Solution</h5>
                        <p>
                          Tailored Solutions for Your Health Needs. Thrive with
                          Us!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="app-section">
          <div className="container">
            <div className="app-bg">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                  <div className="app-content">
                    <div className="app-header ">
                      <h5>Working for Your Better Health.</h5>
                      <h2>Download the TwinsDoc App today!</h2>
                    </div>
                    <div className="app-scan ">
                      <p>Scan the QR code to get the app now</p>
                      <img src="/assets/img/scan-img.png" alt="scan-image" />
                    </div>
                    <div className="google-imgs ">
                      <a href="javascript:void(0);">
                        <img src="/assets/img/google-play.png" alt="img" />
                      </a>
                      <a href="javascript:void(0);">
                        <img src="/assets/img/app-store.png" alt="img" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 ">
                  <div className="mobile-img">
                    <img
                      src="/assets/img/mobile-img.png"
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header-one text-center ">
                  <h5>Get Your Answer</h5>
                  <h2 className="section-title">Frequently Asked Questions</h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 ">
                <div className="faq-img">
                  <img
                    src="/assets/img/faq-img.png"
                    className="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="faq-info ">
                  <div className="accordion" id="faq-details">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne">
                          How do I schedule an appointment with a physician through
                          the portal?
                        </a>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Scheduling an appointment is easy, just log in,
                              pick your time, and confirm.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo">
                          What types of medical professionals are available for
                          consultations?
                        </a>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              We provide consultations with diverse medical
                              experts, from general practitioners to specialized
                              professionals.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree">
                          Can I get prescriptions through the online portal?
                        </a>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Yes, prescriptions can be obtained through our
                              online platform for your convenience.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFour">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour">
                          Are there options for video consultations, or is it
                          strictly text-based communication?
                        </a>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Choose video consultations for personalized
                              communication with our physicians.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFive">
                        <a
                          href="javascript:void(0);"
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive">
                          Can I request a specific physician for my consultation?
                        </a>
                      </h2>
                      <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFive"
                        data-bs-parent="#faq-details">
                        <div className="accordion-body">
                          <div className="accordion-content">
                            <p>
                              Absolutely, you can request a specific physician for
                              your consultation based on availability.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mouse-cursor cursor-outer" />
        <div className="mouse-cursor cursor-inner" />
      </div>
      <div
        className="progress-wrap active-progress"
        onClick={scrollToTop}
        style={{ cursor: "pointer" }}>
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102">
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              transition: "stroke-dashoffset 10ms linear 0s",
              strokeDasharray: "307.919px, 307.919px",
              strokeDashoffset: "228.265px",
            }}></path>
        </svg>
      </div>
    </>
  );
}
