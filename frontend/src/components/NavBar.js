import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import toastr from "toastr";
import 'toastr/build/toastr.css';

const NavBar = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  return (
    <>
      {/* <!-- Page Preloder --> */}
      {/* <div id="preloder">
        <div className="loader"></div>
      </div> */}

      {/* <!-- Offcanvas Menu Section Begin --> */}
      <div className="offcanvas-menu-overlay"></div>
      <div className="canvas-open">
        <i className="icon_menu"></i>
      </div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="icon_close"></i>
        </div>
        <div className="search-icon  search-switch">
          <i className="icon_search"></i>
        </div>
        <div className="header-configure-area">
          <div className="language-option">
            <img src="img/flag.jpg" alt="" />
            <span>
              EN <i className="fa fa-angle-down"></i>
            </span>
            <div className="flag-dropdown">
              <ul>
                <li>
                  <a href="#">Zi</a>
                </li>
                <li>
                  <a href="#">Fr</a>
                </li>
              </ul>
            </div>
          </div>
          <Link to="/booking" className="bk-btn">
            Booking Now
          </Link>
        </div>
        <nav className="mainmenu mobile-menu">
          <ul>
            <li className="active">
              <a href="./index.html">Home</a>
            </li>
            <li>
              <a href="./rooms.html">Rooms</a>
            </li>
            <li>
              <a href="./about-us.html">About Us</a>
            </li>
            <li>
              <a href="./pages.html">Pages</a>
              <ul className="dropdown">
                <li>
                  <a href="./room-details.html">Room Details</a>
                </li>
                <li>
                  <a href="#">Deluxe Room</a>
                </li>
                <li>
                  <a href="#">Family Room</a>
                </li>
                <li>
                  <a href="#">Premium Room</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="./blog.html">News</a>
            </li>
            <li>
              <a href="./contact.html">Contact</a>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="top-social">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-tripadvisor"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
        <ul className="top-widget">
          <li>
            <i className="fa fa-phone"></i> (+255) 773 456 789
          </li>
          <li>
            <i className="fa fa-envelope"></i> ggidion897@gmail.com
          </li>
        </ul>
      </div>
      {/* <!-- Offcanvas Menu Section End --> */}
      {/* <!-- Header Section Begin --> */}
      <header className="header-section">
        <div className="top-nav">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <ul className="tn-left">
                  <li>
                    <i className="fa fa-phone"></i> (+255) 773 456 789
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i> ggidion897@gmail.com
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="tn-right">
                  <div className="top-social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-tripadvisor"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </div>
                  <Link to="/booking" className="bk-btn">
                    Booking Now
                  </Link>
                  <div className="language-option">
                    <img src="img/flag.jpg" alt="" />
                    <span>
                      EN <i className="fa fa-angle-down"></i>
                    </span>
                    <div className="flag-dropdown">
                      <ul>
                        <li>
                          <a href="#">Zi</a>
                        </li>
                        <li>
                          <a href="#">Fr</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="logo512">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-10 d-flex justify-content-center">
                <div className="nav-menu">
                  <nav className="mainmenu">
                    <ul className="list-unstyled d-flex mb-0">
                      <li className="mr-3">
                        <Link to="/" className="text-decoration-none">
                          Home
                        </Link>
                      </li>
                      <li className="mr-3">
                        <Link to="/halls" className="text-decoration-none">
                          Halls
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" className="text-decoration-none">
                          Contact
                        </Link>
                      </li>

                      {token ? (
                        <li>
                          <Link
                            to="/login"
                            className="text-decoration-none"
                            onClick={() => {
                              localStorage.removeItem("authToken");
                              toastr.success("Logout Successfully")
                              navigate("/login"); // Navigate to login page after logout

                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      ) : (
                        <>
                          <li>
                            <Link to="/login" className="text-decoration-none">
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/register"
                              className="text-decoration-none"
                            >
                              Register
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- Header End --> */}
    </>
  );
};

export default NavBar;
