import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.css";
import BACKEND_URL from "../components/BackendURL";

const BookingForm = () => {
  const [halls, setHalls] = useState([]); // State to store fetched halls
  const [selectedHall, setSelectedHall] = useState(""); // State to store the selected hall
  const [checkIn, setCheckIn] = useState(""); // State for check-in date
  const [checkOut, setCheckOut] = useState(""); // State for check-out date
  const [specialRequest, setSpecialRequest] = useState(""); // State for special request

  useEffect(() => {
    // Fetch all halls from the API when the component mounts
    const fetchHalls = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/halls/`); // Replace with your API endpoint
        setHalls(response.data); // Update the state with the fetched data
      } catch (error) {
        toastr.error("Failed to fetch halls. Please try again.");
        console.error("Error fetching halls:", error);
      }
    };

    fetchHalls();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedHall || !checkIn || !checkOut) {
      toastr.error("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/halls/book/`,
        {
          hall: selectedHall,
          check_in: checkIn,
          check_out: checkOut,
          special_request: specialRequest,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`, // Adjust if you store the token differently
          },
        }
      );

      toastr.success("Booking successful!");
    } catch (error) {
      if (error.response && error.response.data.error) {
        toastr.error(error.response.data.error);
      } else {
        toastr.error("An error occurred. Please try again.");
      }
      console.error("Booking error:", error);
    }
  };

  return (
    <>
      <NavBar />
     

      <div className="d-flex justify-content-center">
        <div className="col-xl-4 col-lg-5 shadow my-3">
          <div className="booking-form">
            <h3>Booking Hall</h3>
            <form onSubmit={handleBooking}>
              <div className="check-date">
                <label htmlFor="date-in">Check In:</label>
                <input
                  type="date"
                  className="form-control"
                  id="date-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="check-date">
                <label htmlFor="date-out">Check Out:</label>
                <input
                  type="date"
                  className="form-control"
                  id="date-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="check-date">
                <label htmlFor="special-request">Special Request:</label>
                <textarea
                  className="form-control"
                  id="special-request"
                  placeholder="Add Your Special Request"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                />
              </div>

              <div className="select-option">
                <label htmlFor="hall">Hall:</label>
                <select
                  className="form-control"
                  id="hall"
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)} // Update the selected hall
                >
                  <option value="">
                    {halls.length === 0
                      ? "No halls available"
                      : "Select a Hall"}
                  </option>
                  {halls.length > 0 &&
                    halls.map((hall) => (
                      <option key={hall.id} value={hall.id}>
                        {hall.hallname}
                      </option>
                    ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookingForm;

