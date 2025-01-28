// src/ProfileButton.tsx
import React from 'react';

interface ProfileButtonProps {
    onClick: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} style={buttonStyle}>
            Profile
        </button>
    );
};

const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    // top: '10px',
    left: '10px',
    padding: '10px',
    backgroundColor: '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default ProfileButton;