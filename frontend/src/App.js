import React, { useState, useEffect } from 'react'
import Header from "./components/supportingComponents/Header";
import Footer from "./components/supportingComponents/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/mainPage/Home";
import EquipmentPage from "./components/equipmentPage/EquipmentPage";
import EventPage from "./components/eventPage/EventPage";
import EnterPage from "./components/loginPage/EnterPage";
import RegisterPage from "./components/registerPage/RegisterPage";
import UserProfile from "./components/userProfilePage/UserProfile"
import AboutEquipment from "./components/aboutEquipmentPage/AboutEquipment"
import PaymentPage from './components/paymentPage/PaymentPage';
import ReccomendationPage from './components/reccomendationPage/RecommendationPage';
import AdminClientMenager from './components/adminClientPage/AdminClientManagerPage';
import AdminAddClient from './components/adminClientPage/AdminAddClient';
import AdminEquipmentManagerPage from './components/adminEquipmentPage/AdminEquipmentManagerPage';
import AdminAddEquipmentPage from './components/adminEquipmentPage/AdminAddEquipmentPage';
import AdminChangeEquipment from './components/adminEquipmentPage/AdminChangeEquipment';
import AdminOrderManagerPage from "./components/adminOrderPage/AdminOrderManagerPage";
import AdminOrderChangePage from "./components/adminOrderPage/AdminOrderChangePage"
import AdminEventManagerPage from './components/adminEventPage/AdminEventManagerPage';
import AdminAddEventPage from './components/adminEventPage/AdminAddEventPage';
import AdminChangeEventPage from './components/adminEventPage/AdminChangeEventPage';
import SplashScreen from './components/supportingComponents/SplashScreen';


const App = () => {

    const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged") === "true");
    const [loading, setLoading] = useState(true)
   
   useEffect(() => {
    document.title = "SportBox"
    const timer = setTimeout(() => {
        setLoading(false)
    }, 3000)

    return () => clearTimeout(timer);
   }, [])

    return (<div>
        {
            loading ?
                <SplashScreen loading={loading}></SplashScreen>
                :
                <Router>
                    <Header isLogged={isLogged} />
                    <Routes>

                        <Route exact path="/" element={<Home></Home>} />

                        <Route path="/equipments" element={<EquipmentPage ></EquipmentPage>} />

                        <Route path="/about" element={<AboutEquipment></AboutEquipment>} />

                        <Route path="/payment" element={<PaymentPage></PaymentPage>} />

                        <Route path="/reccomendation" element={<ReccomendationPage></ReccomendationPage>} />

                        <Route path="/events" element={<EventPage setIsLogged={setIsLogged}></EventPage>} />

                        <Route path="/profile" element={<UserProfile setIsLogged={setIsLogged}></UserProfile>} />

                        <Route path="/enter" element={<EnterPage></EnterPage>} />

                        <Route path="/api/person/add" element={<RegisterPage setIsLogged={setIsLogged}></RegisterPage>} />

                        <Route path="/admin/clients" element={<AdminClientMenager></AdminClientMenager>} />

                        <Route path="/admin/clients/add" element={<AdminAddClient></AdminAddClient>} />

                        <Route path="/admin/equipments" element={<AdminEquipmentManagerPage></AdminEquipmentManagerPage>} />

                        <Route path="/admin/equipments/add" element={<AdminAddEquipmentPage></AdminAddEquipmentPage>} />

                        <Route path="/admin/equipments/change" element={<AdminChangeEquipment></AdminChangeEquipment>} />

                        <Route path="/admin/orders" element={<AdminOrderManagerPage></AdminOrderManagerPage>} />

                        <Route path="/admin/orders/change" element={<AdminOrderChangePage></AdminOrderChangePage>} />

                        <Route path="/admin/events" element={<AdminEventManagerPage></AdminEventManagerPage>} />

                        <Route path="/admin/events/add" element={<AdminAddEventPage></AdminAddEventPage>} />

                        <Route path="/admin/events/change" element={<AdminChangeEventPage></AdminChangeEventPage>} />
                    </Routes>
                    <Footer></Footer>
                </Router>
        }
    </div>)
}

export default App