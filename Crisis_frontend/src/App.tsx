import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar.tsx';
import Sidebar from './Sidebar/sidebar.tsx';
import ProfileButton from './ProfileButton/ProfileButton.tsx';
import LandingPage from './LandingPage/LandingPage.tsx';
import AboutUs from './AboutUs/AboutUs.tsx';
import Login from './Login/Login.tsx';
import ProductList from './ListProduct/ProductList.tsx'
import ForBusiness from './ForBusiness/ForBusiness.tsx';
import ForCustomer from './ForCustomer/ForCustomer.tsx';
import MyProfile from './MyProfile/MyProfile.tsx';
import Cart from './Cart/Cart.tsx';
import FindSeller from './FindSeller/FindSeller.tsx';
import TrackOrders from './TrackOrders/TrackOrders.tsx';
import Chatroom from './Chatroom/Chatroom.tsx';
import ProductPage from './ProductPages/SteelBottle.tsx'
import BambooToothbrush from './ProductPages/BambooToothbrush.tsx';


const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar isOpen={isSidebarOpen} />
                <div style={{ marginLeft: isSidebarOpen ? '220px' : '20px', flex: 1 }}>
                    <ProfileButton onClick={toggleSidebar} />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        {/* <Route path="/about" element={<AboutUs />} /> */}
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="/for-business" element={<ForBusiness />} />
                        <Route path="/product-listing" element={<ProductList />} />
                        <Route path="/for-customer" element={<ForCustomer />} />
                        <Route path="/my-profile" element={<MyProfile />} /> 
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/find-seller" element={<FindSeller />} />
                        <Route path="/track-orders" element={<TrackOrders />} />
                        <Route path="/chatroom" element={<Chatroom />} />
                        <Route path="/product-page" element={<ProductPage />} />
                        <Route path="/product-page" element={<BambooToothbrush />} /> */}
                    </Routes>
                    <AboutUs />
                </div>
            </div>
        </Router>
    );
};

export default App;