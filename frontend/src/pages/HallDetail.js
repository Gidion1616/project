import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../components/BackendURL";

const HallDetail = () => {
  const { id } = useParams(); // Get the hall ID from the URL
  const [hall, setHall] = useState(null); // State to store hall details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch hall details by ID
    const fetchHall = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/halls/${id}/`); // Replace with your API URL
        setHall(response.data);
      } catch (err) {
        setError("Failed to fetch hall details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHall();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <NavBar />
      {/* <!-- Breadcrumb Section Begin --> */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>{hall.hallname}</h2>
                <div className="bt-option">
                  <Link to="/">Home</Link>
                  <span>{hall.hallname}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Breadcrumb Section End --> */}

      {/* <!-- Room Details Section Begin --> */}
      <section className="room-details-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="room-details-item">
                <img src={`${BACKEND_URL}${hall.hallimage}`} alt="" />
              </div>
            </div>

            <div className="col-lg-7">
              <div className="room-details-item">
                <div className="rd-text">
                  <div className="rd-title">
                    <h3>{hall.hallname}</h3>
                    <div className="rdt-right">
                      <div className="rating">
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star"></i>
                        <i className="icon_star-half_alt"></i>
                      </div>
                      <Link to="/booking">Booking Now</Link>
                    </div>
                  </div>
                  <h2>
                    {hall.price} $<span>/Pernight</span>
                  </h2>
                  <table>
                    <tbody>
                      <tr>
                        <td className="r-o">Size:</td>
                        <td>{hall.size} ft</td>
                      </tr>
                      <tr>
                        <td className="r-o">Capacity:</td>
                        <td>Max person {hall.capacity}</td>
                      </tr>
                      <tr>
                        <td className="r-o">Phone Number:</td>
                        <td>08876544567</td>
                      </tr>
                      <tr>
                        <td className="r-o">Location:</td>
                        <td>{hall.halllocation}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Room Details Section End --> */}

      <Footer />
    </>
  );
};

export default HallDetail;
