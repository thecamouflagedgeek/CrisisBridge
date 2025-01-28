// Import React and required libraries
import { useState, useEffect } from "react";
import styles from "./MyProfile.module.css"; // Updated styling
import { FaWallet } from "react-icons/fa";

const MyProfile = () => {
  // State variables for user information and wallet points
  const [user, setUser] = useState({
    displayName: "Hazel",
    email: "hazelsequeira2003@gmail.com",
    phoneNumber: "",
    address: "",
    profilePicture: ""
  });

  const [wallet, setWallet] = useState({
    totalPoints: 0,
    pointsEarned: 0,
    pointsSpent: 0
  });

  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Fetch wallet data (mocking database fetch here)
    const walletData = {
      totalPoints: 100,
      pointsEarned: 150,
      pointsSpent: 50
    };
    setWallet(walletData);
  }, []);

  // Handle user input for phone, address, and profile picture
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Simulate adding points and notify the user
  const handleAddPoints = () => {
    setWallet((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + 50
    }));
    setNotification("50 Eco Points have been added to your wallet!");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

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
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) =>
                setUser({ ...user, profilePicture: URL.createObjectURL(e.target.files[0]) })
              }
            />
          </div>
          <p><strong>Display Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div className={styles.editableFields}>
            <p>
              <strong>Phone Number:</strong>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                placeholder="Add phone number"
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Address:</strong>
              <input
                type="text"
                name="address"
                value={user.address}
                placeholder="Add address"
                onChange={handleInputChange}
              />
            </p>
          </div>
        </div>

        <div className={styles.walletSection}>
          <h2><FaWallet /> Wallet</h2>
          <p><strong>Total Eco Points:</strong> {wallet.totalPoints}</p>
          <p><strong>Points Earned:</strong> {wallet.pointsEarned}</p>
          <p><strong>Points Spent:</strong> {wallet.pointsSpent}</p>
          <button onClick={handleAddPoints}>Add 50 Eco Points</button>
          {notification && <div className={styles.notification}>{notification}</div>}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
