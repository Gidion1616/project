import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import toastr from "toastr";
import 'toastr/build/toastr.css';
import BACKEND_URL from "../components/BackendURL";

const Register = () => {
  // State to hold the form values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toastr.error("Passwords do not match!", "Error");
      return;
    }

    try {
      // Make API call to register the user;
      const response = await axios.post(`${BACKEND_URL}/api/register/`, {
        username,
        email,
        first_name,
        last_name,
        password,
        confirm_password: confirmPassword,
      });

      // Show success message and navigate to the home page
      toastr.success(response.data.message, "Success");
      navigate("/login");
    } catch (error) {
      // Show error message from the server
      if (error.response && error.response.data.error) {
        toastr.error(error.response.data.error, "Error");
      } else {
        toastr.error(
          "An unexpected error occurred. Please try again.",
          "Error"
        );
      }
    }
  };

  return (
    <>
      <NavBar />

      <div className="d-flex justify-content-center">
        <div className="col-xl-4 col-lg-5">
          <div className="booking-form shadow mb-3 mt-3">
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="check-date">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="check-date">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="check-date">
                <label htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  id="first_name"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={first_name}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="check-date">
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  placeholder="Enter your last name"
                  value={last_name}
                  required
                  onChange={(e) => setLastName(e.target.value)}
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
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="check-date">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit">Register</button>
              <p className="mt-2">
                Already Have an account?{" "}
                <Link to="/login">
                  <span className="text-blue">login</span>
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

export default Register;
