import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar.tsx';
import Sidebar from './Sidebar/sidebar.tsx';
import ProfileButton from './ProfileButton/ProfileButton.tsx';
import LandingPage from './LandingPage/LandingPage.tsx';
import AboutUs from './AboutUs/AboutUs.tsx';
import Login from './Login/Login.tsx';
import Dashboard from './Dashboard/Volunteer_dashboard.tsx';
import Settings from './Settings/Settings.tsx';


const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar isOpen={isSidebarOpen} />
            <div style={{ marginLeft: isSidebarOpen ? '220px' : '20px', flex: 1 }}>
                <ProfileButton onClick={toggleSidebar} />
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
                {location.pathname === '/' && <AboutUs />}
            </div>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;