import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForCustomer: React.FC = () => 
{
    const [searchTerm, setSearchTerm] = useState('');

    const items = 
    [
        { id: 1, name: 'Organic Cotton Shirt', description: '100% organic cotton, breathable and sustainable.', rating: 4.5, quantity: 10, price: '$25' },
        { id: 2, name: 'Bamboo Toothbrush', description: 'Eco-friendly toothbrush made of bamboo.', rating: 4.7, quantity: 30, price: '$5' },
        { id: 3, name: 'Aluminium Battery Pack', description: 'Lightweight and recyclable battery pack.', rating: 4.2, quantity: 15, price: '$40' },
        { id: 4, name: 'Steel Water Bottle', description: 'Durable and reusable water bottle.', rating: 4.8, quantity: 20, price: '$15' }
    ];

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={pageStyle}>
            <header style={headerStyle}>
                <h1 style={headerTitleStyle}>For Customers</h1>
            </header>
            <section style={contentSectionStyle}>
                <div style={searchBarStyle}>
                    <input 
                        type="text" 
                        placeholder="Search items..." 
                        style={inputStyle} 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
                <div style={gridStyle}>
                    {filteredItems.map(item => (
                        <Link to='/product-page' key={item.id} style={cardStyle}> {/* Wrap card in Link */}
                        <h3 style={cardTitleStyle}>{item.name}</h3>
                        <p style={cardDescriptionStyle}>{item.description}</p>
                        <p style={cardDetailStyle}>Rating: {item.rating} ⭐</p>
                        <p style={cardDetailStyle}>Quantity: {item.quantity}</p>
                        <p style={cardDetailStyle}>Price: {item.price}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

const pageStyle: React.CSSProperties = {
    backgroundImage: "url('./assets/green.jpg')",
    backgroundSize: "cover",
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    // backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    minWidth: '100vw'
};

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#0b4826',
    color: 'white',
    padding: '20px 0',
    marginBottom: '20px'
};

const headerTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    margin: 0
};

const contentSectionStyle: React.CSSProperties = {
    textAlign: 'center'
};

const searchBarStyle: React.CSSProperties = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white'
};

const inputStyle: React.CSSProperties = {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px'
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    justifyContent: 'center',
    padding: '20px'
};

const cardStyle: React.CSSProperties = {
    width: '200px',
    padding: '10px',
    backgroundColor: '#eaeaea',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left'
};

const cardTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px'
};

const cardDescriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#555'
};

const cardDetailStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#777',
    marginBottom: '5px'
};

export default ForCustomer;
