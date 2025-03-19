import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import OwnerAuthPage from "../Pages/TrufOwner/Auth/OwnerAuth";
import SportsTurfRegistration from "../Pages/TrufOwner/TrufRegistration/TrufRegistration";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/start/:id" element={<Loaction />} />
        <Route path="/startAcedemy" element={<AcedemyStartPage />} />
        <Route path="/startAcedemy/:id" element={<AcedemyLoaction />} />
        <Route path="/startAcedemy/:id/info" element={<AcedemyInfo/>}/>
        <Route path="/umpire" element={<FindUmpire/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/myBooking" element={<MyBooking/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/message" element={<Messages/>}/>


        <Route path="/owner/auth" element={<OwnerAuthPage/>}/>
        <Route path="/owner/register" element={<SportsTurfRegistration/>}/>
      </Routes>
     
     
    </Router>
  );
};

export default Routers;