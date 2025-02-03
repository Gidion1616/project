import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.css";

const PrivateRoute = () => {
  // Check if the auth token exists in localStorage
  const authToken = localStorage.getItem("authToken");

  // If the token doesn't exist, display a Toastr message and redirect to the login page
  if (!authToken) {
    toastr.error("You must log in first to make a booking.");
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  // Render the protected route
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
