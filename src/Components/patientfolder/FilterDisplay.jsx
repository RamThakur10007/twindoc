import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { OrderState } from "../../Contexts";
import Loader from "../Loader";

const FilterDisplay = ({ filterData }) => {
  const { setSelectedDoctor } = OrderState();
  // Pagination Logic
  const [itemsPerPage] = useState(5);
  const [currentPageToday, setCurrentPageToday] = useState(1);

  const todayStartIndex = (currentPageToday - 1) * itemsPerPage;
  const todayEndIndex = currentPageToday * itemsPerPage;
  const pageDoctor = filterData.slice(todayStartIndex, todayEndIndex);

  const paginate = (pageNumber) => setCurrentPageToday(pageNumber);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        pageDoctor.map((doctor, index) => (
          <div className="card doctor-card" key={index}>
            <div className="card-body">
              <div className="doctor-widget-one">
                <Link
                 to={`/user/physician/${doctor?.userId?._id}`}
                >
                <div className="doc-info-left">
                  <div className="doctor-img">
                    <a >
                      <img
                        src={
                          doctor?.profilePicture ||
                          "assets/img/doctors/doctor-thumb-02.jpg"
                        }
                        className="img-fluid"
                        alt={doctor.name}
                      />
                    </a>
                  </div>
                  <div className="doc-info-cont">
                    <h4 className="doc-name">
                      <a >
                        Dr. {doctor.userId?.name}
                      </a>
                      <i className="fas fa-circle-check" />
                    </h4>
                    <br />
                    {doctor?.specialization.map((spec, index) => (
                      <span className="doc-speciality" key={index}>
                        {spec}{" "}
                      </span>
                    ))}
                    <div className="clinic-details">
                      <p className="doc-location">
                        <i className="feather-map-pin" />
                        {doctor.city} {doctor.contry}
                      </p>
                      <p className="doc-location">
                        <i className="feather-award" />{" "}
                        {doctor.yearOfExperience} Years of Experience
                      </p>
                    </div>
                  </div>
                </div>
                
                </Link>
                <div className="doc-info-right">
                  <div className="clini-infos">
                    <ul>
                      {/* <li>
                        <i className="feather-clock available-icon" />
                        <span className="available-date">Avaliable Today</span>
                      </li> */}
                      <li>
                        {/* Display rating and reviews */}
                        <div className="reviews-ratings">
                          <p>
                            <span>
                              {console.log(
                                doctor.reviews.reduce(
                                  (acc, review) => acc + review.rating,
                                  0
                                )
                              )}
                              <i className="fas fa-star" />
                              {Math.round(
                                doctor.reviews.reduce(
                                  (acc, review) => acc + review.rating,
                                  0
                                ) / doctor.reviews.length
                              ) || 0}
                            </span>{" "}
                            ({doctor.reviews.length} Reviews)
                          </p>
                        </div>
                      </li>
                      <li>
                        ₹ {doctor.fees}{" "}
                        <i className="feather-info available-info-icon" />
                      </li>
                    </ul>
                  </div>
                  <div className="clinic-booking book-appoint">
                    <Link
                      className="btn btn-primary"
                      onClick={() => setSelectedDoctor(doctor)}
                      to={`/user/physician/${doctor?.userId?._id}`}>
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filterData.length}
        paginate={paginate}
      />
    </div>
  );
};

export default FilterDisplay;
