import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderContext = createContext();

const Context = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState()
  const [selectedPatient, setselectedPatient] = useState(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [doctorInfo, setDoctorInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [height, setHeight] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [homeDocFilter, setHomeDocFilter] = useState([]);


  
  const [prescriptions, setPrescriptions] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      route: "",
      quantity: "",
      refills: "",
      instructions: "",
    },
  ]);
  const [updatedObservations, setUpdatedObservations] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const [selectedSlotDay, setSelectedSlotDay] = useState('');
  const [selectedSlotTime, setSelectedSlotTime] = useState('');

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Get the current date and format it
  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);

  // Use the formatted date as the initial state
  const [selectedDate, setSelectedDate] = useState(formattedCurrentDate);

//appointmentDetails
const [patientName, setPatientName] = useState("");
  

  const [symptoms, setSymptoms] = useState([]);
  const [temperature, setTemperature] = useState('');
  const [bloodpresure, setBloodpresure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [reportFiles, setReportFiles] = useState([]);
  const [pdfRefs, setPdfRefs] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notification, setNotification] = useState([]);
  const [ inProcess, setInProcess] = useState(false);
  
  const [ selectedSpecialisthome, setSelectedSpecialisthome] = useState('');


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUserInfo(userInfo);
  }, [navigate]);

  return (
    <OrderContext.Provider
      value={{
        selectedDoctor,
        setSelectedDoctor,
        sideOpen,
        setSideOpen,
        role,
        setRole,
        selectedPatient,
        setselectedPatient,
        userInfo,
        setUserInfo,
        prescriptions,
        setPrescriptions,
        appointments,
        setAppointments,
        height,
        setHeight,
        updatedObservations,
        setUpdatedObservations,
        isLoggedIn,
        setIsLoggedIn,
        doctorInfo,
        setDoctorInfo,
        homeDocFilter,
         setHomeDocFilter,
         selectedSpecialist, 
         setSelectedSpecialist,
         selectedLocation, 
         setSelectedLocation,
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
           selectedSlotDay, 
           setSelectedSlotDay,
           selectedSlotTime,
            setSelectedSlotTime,
            selectedDate, 
            setSelectedDate,
            selectedAppointment,
            setSelectedAppointment,
            notification,
            setNotification,
            inProcess,
            setInProcess,
            selectedSpecialisthome, 
            setSelectedSpecialisthome,
            patientName,
            setPatientName

      }}>
      {children}
    </OrderContext.Provider>
  );
};

export const OrderState = () => {
  return useContext(OrderContext);
};

export default Context;
