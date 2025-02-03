import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import BACKEND_URL from "../components/BackendURL";
import { Link } from "react-router-dom";

const Halls = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    // Fetch only four halls from the API
    const fetchHalls = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/halls/limited/`);
        setHalls(response.data);
      } catch (error) {
        console.error("Error fetching halls:", error);
      }
    };

    fetchHalls();
  }, []);
  return (
    <> 
    
      <NavBar />

      {/* <!-- Breadcrumb Section Begin --> */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Our Halls</h2>
                <div className="bt-option">
                  <Link to="/">Home</Link>
                  <span>Halls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Breadcrumb Section End --> */}

      {/* <!-- Rooms Section Begin --> */}
      <section className="rooms-section spad">
        <div className="container">
          <div className="row">
            {halls.map((hall, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="room-item">
                  <img src={`${BACKEND_URL}${hall.hallimage}`} alt="" />
                  <div className="ri-text">
                    <h4>{hall.hallname}</h4>
                    <h3>
                     {hall.price}$<span>/Pernight</span>
                    </h3>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>{hall.size}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>{hall.capacity}</td>
                        </tr>
                        <tr>
                          <td className="r-o">Location:</td>
                          <td>{hall.halllocation}</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link to={`/halldetail/${hall.id}`} className="primary-btn">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-lg-12">
              <div className="room-pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">
                  Next <i className="fa fa-long-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Rooms Section End --> */}

      <Footer />
    </>
  );
};

export default Halls;
