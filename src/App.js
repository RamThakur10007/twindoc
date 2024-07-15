import { Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Dashboard from "./Dashboard";
import Appointments from "./Components/Appointments";
import ChangePassword from "./Components/ChangePassword";
import DoctorProfile from "./Components/DoctorProfile";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Reviews from "./Components/Reviews";
import ScheduleTime from "./Components/ScheduleTimings";
import Accounts from "./Components/Accounts";
import Room from "./Components/meet/Room";
import Appointment from "./Components/Appointment";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Patientdashboard from "./Components/PatientDashboard";
import PatientProfileSetting from "./Components/PatientProfileSetting";
import Orders from "./Components/Orders";
import Home from "./Components/Home";

import Profilesettings from "./Components/PatientProfileSetting";
import DoctorSearch from "./Components/patientfolder/DoctorSearch";
import Dependent from "./Components/patientfolder/Dependent";
import Medicalrecords from "./Components/patientfolder/Medicalrecords";
import ChangePasswordPatient from "./Components/patientfolder/ChangePasswordPatient";
import HomePage from "./HomePage";
import Doctorprofile from "./Components/patientfolder/Doctorprofile";
import Checkout from "./Components/patientfolder/Checkout";
import Bookingsuccess from "./Components/patientfolder/BookingSuccess";
import Invoiceview from "./Components/patientfolder/InvoiceView";
import AppointmentDetails from "./Components/patientfolder/AppointmentDetails";
import SinglePhysicianDisplay from "./Components/patientfolder/PatientAppointment";
import Privacypolicy from "./Components/PrivacyPolicy";
import Termscondition from "./Components/TermsConditions";
import Aboutus from "./Aboutus";
import Contactus from "./Contactus";
import Priscriptions from "./Components/Prescription";
import LabReports from "./Components/patientfolder/LabReports";
import Forgetpass from "./Components/Forgetpass";
import DocPersonalProfile from "./Components/DocPersonalProfile";
import VerifyUser from "./Components/VerifyUser";
import GoToTop from "./Components/GoToTop";
import { ThemeProvider } from "styled-components";

// App changed
function App() {
  const location = useLocation();

  const shouldShowNavbarAndFooter = !location.pathname.includes("/room");

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(29 90 144)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
  };

  return (
<ThemeProvider theme={theme}>
    <div >
      {shouldShowNavbarAndFooter && <Navbar /> }
      {/*  */}
      <Routes>
        
        <Route path="" element={<HomePage />} />
        <Route path="signup" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="users/:id/verify/:token" element={<VerifyUser />} />
        <Route path="forgetpass" element={<Forgetpass />} />
        <Route path="aboutus" element={<Aboutus />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="privacypolicy" element={<Privacypolicy />} />
        <Route path="termscondition" element={<Termscondition />} />
        <Route path="physicianprofile" element={<DocPersonalProfile />} />
        
        <Route path="user">
          <Route path="docsearch" element={<DoctorSearch />} />
          <Route path="physician/:id" element={<Doctorprofile />} />
          <Route path="appointmentdetails" element={<AppointmentDetails />} />
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="booking-success" element={<Bookingsuccess />} />
            <Route path="invoice-view" element={<Invoiceview />} />
            <Route path="dashboard" element={<Patientdashboard />} />
            {/* <Route path="dependent" element={<Dependent />} /> */}
            <Route path="medical-records" element={<Medicalrecords />} />
            {/* <Route path="orders" element={<Orders />} /> */}
            <Route path="profile-settings" element={<Profilesettings />} />
            <Route path="change-password" element={<ChangePasswordPatient />} />
            <Route
              path="appointment/:id"
              element={<SinglePhysicianDisplay />}
            />
            <Route path="prescriptions" element={<Priscriptions />} />
            <Route path="labreports" element={<LabReports />} />
          </Route>
        </Route>

        <Route path="physician">
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="appointment/:id" element={<Appointment />} />
            {/* <Route path="orders" element={<Orders />} /> */}
            <Route path="reviews" element={<Reviews />} />
            <Route path="schedule" element={<ScheduleTime />} />
            <Route path="accounts" element={<Accounts />} />
           

          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="room/:roomID" element={<Room />} />
        </Route>
      </Routes>
      
      
      {shouldShowNavbarAndFooter && <Footer />  }
      <GoToTop />
    </div>
    </ThemeProvider>

  );
}

export default App;
