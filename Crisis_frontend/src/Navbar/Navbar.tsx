// src/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav style={navbarStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/about" style={linkStyle}>Contact</Link>
            {/* <Link to="/for-business" style={linkStyle}>For Business</Link>
            <Link to="/for-customer" style={linkStyle}>For Customer</Link> */}
            <Link to="/login" style={linkStyle}>Login</Link>
        </nav>
    );
};

const navbarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#282c34',
    padding: '10px',
};

const linkStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
};

export default Navbar;