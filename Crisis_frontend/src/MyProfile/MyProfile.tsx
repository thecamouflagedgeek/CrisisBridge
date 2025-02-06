import React from "react";
import styles from "./MyProfile.module.css"; // Updated styling
import { FaWallet } from "react-icons/fa";

interface UserProfile {
  displayName: string;
  email: string;
  phoneNumber: string;
  address: string;
  age: number;
  bloodType: string;
  profilePicture: string;
}

interface MyProfileProps {
  user?: UserProfile;
}

const MyProfile: React.FC<MyProfileProps> = ({ user }) => {
  if (!user) {
    return <div className={styles.container}>No user data available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.glassEffect}>
        <h1>My Account</h1>
        <div className={styles.userInfo}>
          <div className={styles.profilePicture}>
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" />
            ) : (
              <div className={styles.placeholder}>Add Picture</div>
            )}
          </div>
          <p><strong>Display Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Blood Type:</strong> {user.bloodType}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
