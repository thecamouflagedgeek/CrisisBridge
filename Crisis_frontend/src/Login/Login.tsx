import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

type UserType = "User/Victim" | "Volunteer" | "NGO";

interface LoginProps {
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setUserRole }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<UserType>("User/Victim"); // Default to a valid user type

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Login logic for SustainaLink
    const loginData = {
      email,
      password,
      userType,
    };

    console.log("Login data:", loginData);

    // Set user role based on userType
    setUserRole(userType);

    // Clear the fields after login
    setEmail("");
    setPassword("");
    setUserType("User/Victim"); // Reset to default

    // Redirect to home page after login
    navigate("/");

    // Backend API call (example structure)
    // fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(loginData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.glassCard}>
        <div className={styles.loginLeft}>
          <h1>Welcome Back!</h1>
        </div>
        <div className={styles.loginRight}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <h2>Login</h2>
            <p>Welcome back! Please login to your account.</p>
            <div className={styles.formGroup}>
              <label htmlFor="userType">I am a:</label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
              >
                <option value="User/Victim">User/Victim</option>
                <option value="Volunteer">Volunteer</option>
                <option value="NGO">NGO</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="username@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>
                <input className={styles.checkbox} type="checkbox" /> Remember Me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
            <p>
              New User? <a href="/signup">Signup</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
