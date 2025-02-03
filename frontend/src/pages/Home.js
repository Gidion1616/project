import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import hero1 from "../img/hero/hero-1.jpg";
import hero2 from "../img/hero/hero-2.jpg";
import hero3 from "../img/hero/hero-3.jpg";
import hall1 from "../img/hall/hall-b1.jpg";
import hall2 from "../img/hall/hall-b2.jpg";
import hall3 from "../img/hall/hall-b3.jpg";
import hall4 from "../img/hall/hall-b4.jpg";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import BACKEND_URL from "../components/BackendURL";

const Home = () => {
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

      {/* <!-- Hero Section Begin --> */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero-text">
                <h1>Zanzibar Hall Booking System</h1>
                <p>
                  Here are the best hotel booking sites, including
                  recommendations for local needs and for finding
                  low-priced hall.
                </p>
                <a href="#" className="primary-btn">
                  Discover Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-slider">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="hs-item">
                <img src={hero1} alt="Hero Slide 1" className="img-fluid" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hs-item">
                <img src={hero2} alt="Hero Slide 2" className="img-fluid" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hs-item">
                <img src={hero3} alt="Hero Slide 3" className="img-fluid" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* <!-- Hero Section End --> */}

      {/* <!-- Home Room Section Begin --> */}
      <section className="hp-room-section mt-5 mb-3">
        <div className="container-fluid">
          <div className="hp-room-items">
          <div className="row">
            {halls.map((hall, index) => (
            
                <div key={index} className="col-lg-3 col-md-6">
                  <div
                    className="hp-room-item"
                    style={{
                      backgroundImage: `url(${BACKEND_URL}${hall.hallimage})`,
                    }}
                  >
                    <div className="hr-text">
                      <h3>{hall.hallname}</h3>
                      <h2>
                        {hall.price}$<span>/Pernight</span>
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
              </div>
          </div>
        </div>
      </section>
      {/* <!-- Home Room Section End --> */}

      <Footer />
    </>
  );
};

export default Home;
