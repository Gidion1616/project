import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../components/BackendURL";
import toastr from "toastr";
import "toastr/build/toastr.css";

const Login = () => {
  // State to hold the form values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call for login
      const response = await axios.post(`${BACKEND_URL}/api/login/`, {
        username,
        password,
      });

      // Check if the response contains the token
      if (response.data && response.data.token) {
        // Save token to localStorage
        localStorage.setItem("authToken", response.data.token);

        // Display success message
        toastr.success("Login successful! Redirecting to halls page.");

        // Redirect to home page
        navigate("/halls");
      } else {
        // Display error message if token is not in response
        toastr.error("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle API errors
      if (error.response && error.response.data) {
        toastr.error(
          error.response.data.error || "An error occurred during login."
        );
      } else {
        toastr.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <NavBar />

      <div className="d-flex justify-content-center">
        <div className="col-xl-4 col-lg-5">
          <div className="booking-form shadow mb-3 mt-3">
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="check-date">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="check-date">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Login</button>
              <p className="mt-2">
                Don't Have an account?{" "}
                <Link to="/register">
                  <span className="text-blue">register</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
