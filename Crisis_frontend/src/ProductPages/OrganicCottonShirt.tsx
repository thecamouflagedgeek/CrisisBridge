import React from 'react';

const OrganicCottonShirt: React.FC = () => 
{
    return (
        <div style={productPageStyle}>
            <header style={headerStyle}>
                <h1 style={headerTitleStyle}>Steel Water Bottle</h1>
            </header>
            <div style={productContentStyle}>
                <section style={productImageSectionStyle}>
                    <img
                        src="https://via.placeholder.com/300"
                        alt="Steel Water Bottle"
                        style={productImageStyle}
                    />
                </section>
                <section style={productDetailsSectionStyle}>
                    <h2 style={productTitleStyle}>Eco-friendly toothbrush made of bamboo.</h2>
                    <p style={priceStyle}>₹399</p>
                    <p style={ratingStyle}>4.5 ⭐⭐⭐⭐⭐ (200 ratings)</p>
                    <p style={descriptionStyle}>
                        Eco-friendly toothbrush made of bamboo.
                    </p>
                    <p style={stockStyle}>In Stock</p>
                    <div style={quantityStyle}>
                        <label htmlFor="quantity">Quantity: </label>
                        <select id="quantity" style={dropdownStyle}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <button style={addToCartButtonStyle}>Add to Cart</button>
                </section>
            </div>
        </div>
    );
};

const productPageStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh'
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

const productContentStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
};

const productImageSectionStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'center'
};

const productImageStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px'
};

const productDetailsSectionStyle: React.CSSProperties = {
    flex: 2,
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const productTitleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px'
};

const priceStyle: React.CSSProperties = {
    fontSize: '20px',
    color: '#0b4826',
    fontWeight: 'bold',
    marginBottom: '10px'
};

const ratingStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px'
};

const descriptionStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px'
};

const stockStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#0b4826',
    marginBottom: '20px'
};

const quantityStyle: React.CSSProperties = {
    marginBottom: '20px'
};

const dropdownStyle: React.CSSProperties = {
    padding: '5px',
    fontSize: '16px'
};

const addToCartButtonStyle: React.CSSProperties = {
    backgroundColor: '#0b4826',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default OrganicCottonShirt;
