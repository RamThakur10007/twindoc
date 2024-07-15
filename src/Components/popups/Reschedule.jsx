import { useState, useEffect } from "react";
import { FaBusinessTime } from "react-icons/fa";
import { FaCalendarAlt, FaSave, FaTimes } from "react-icons/fa";

const Reschedule = ({ closeModal }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    const handleConfirm = () => {
        // Validate the date and time here if needed
        console.log("Selected Date:", selectedDate);
        console.log("Selected Time:", selectedTime);
        // Close the modal or trigger further actions
        closeModal();
    };

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    zIndex: 50,
                }}
                onClick={closeModal}
            ></div>
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 50,
                    maxWidth: "md",
                    width: "40%",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <FaBusinessTime style={{ color: "#48BB78", fontSize: "2.5rem", marginBottom: "1rem" , marginRight:"1rem"}} />
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Appointment Reschedule</h2>
                    <p style={{ color: "#4A5568", marginBottom: "1rem" }}>
                        Please select a new date and time for your appointment:
                    </p>
                    <div style={{ marginBottom: "1rem" }}>
                        <label htmlFor="date" style={{ display: "block", color: "#4A5568", fontWeight: "bold" }}>
                            Date:
                        </label>
                        <input
                            id="date"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #E2E8F0",
                                borderRadius: "0.25rem",
                                outline: "none",
                                transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                                "&:focus": {
                                    borderColor: "#38A169",
                                },
                            }}
                        />
                    <div style={{ marginBottom: "1rem" }}>
                        <label htmlFor="time" style={{ display: "block", color: "#4A5568", fontWeight: "bold" }}>
                            Time:
                        </label>
                        <input
                            id="time"
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                border: "1px solid #E2E8F0",
                                borderRadius: "0.25rem",
                                outline: "none",
                                transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                                "&:focus": {
                                    borderColor: "#38A169",
                                },
                            }}
                        />
                    </div>
                    </div>
                    <button
                    className="btn bg-info-light"
                        style={{
                            width: "20%",
                            borderRadius: "0.25rem",
                            padding: "0.5rem",
                            margin: "0.5rem",
                            border: "none"
                        }}
                        onClick={handleConfirm}
                    >
                    <FaSave/>    Confirm
                    </button>
                    <button
                     className="btn  bg-danger-light"
                        style={{
                            width: "20%",
                            borderRadius: "0.25rem",
                            padding: "0.5rem",
                            margin: "0.5rem",
                            border: "none"
                        }}
                        onClick={closeModal}
                    >
                     <FaTimes />   Cancel
                    </button>
                    {/* <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-sm bg-danger-light">
                        <i className="fas fa-calendar-alt" /> Reschedule
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default Reschedule;
