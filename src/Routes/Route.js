import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "../Pages/Home";
import StartPage from "../Pages/StartPage/StartPage";
import Loaction from "../Pages/Location/Loaction";
import AcedemyStartPage from "../Pages/AcedemyStartPage/AcedemyStartPage";
import AcedemyLoaction from "../Pages/AcedemyLocation/AcedemyLoaction";
import AcedemyInfo from "../Pages/AcedemyInfo/AcedemyInfo";
import AuthPage from "../Pages/Auth/Auth";
import FindUmpire from "../Pages/UmpireData/UmpireData";
import Profile from "../Pages/Profile/Profile";
import MyBooking from "../Pages/MyBooking/Mybooking";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Messages from "../Pages/Messages/Messages";
import ContactUs from "../Pages/ContactUs/ContactUs";


// Turf Owner Pages
import OwnerAuthPage from "../Pages/TrufOwner/Auth/OwnerAuth";
import SportsTurfRegistration from "../Pages/TrufOwner/TrufRegistration/TrufRegistration";
import ClientDashboard from "../Pages/TrufOwner/DashBoard/DashBoard";

// Admin Pages
import AdminLogin from "../Pages/Admin/Auth/AdminLogin";
import AdminDashboard from "../Pages/Admin/Dashboard/AdminDashboard";

// 🔐 Admin Route Protection Wrapper
const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" />;
};

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/start/:id" element={<Loaction />} />
        <Route path="/startAcedemy" element={<AcedemyStartPage />} />
        <Route path="/startAcedemy/:id" element={<AcedemyLoaction />} />
        <Route path="/startAcedemy/:id/info" element={<AcedemyInfo />} />
        <Route path="/umpire" element={<FindUmpire />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myBooking" element={<MyBooking />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/contact" element={<ContactUs />} />
        
      
        {/* Turf Owner Routes */}
        <Route path="/owner/auth" element={<OwnerAuthPage />} />
        <Route path="/owner/dashboard" element={<ClientDashboard />} />
        <Route path="/owner/register" element={<SportsTurfRegistration />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routers;
