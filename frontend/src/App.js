import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HallDetail from "./pages/HallDetail";
import Halls from "./pages/Halls";
import Contact from "./pages/Contact";

import BookingForm from "./pages/BookingForm";
import PrivateRoute from "./components/PrivateRoutes";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/halldetail/:id" element={<HallDetail />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<PrivateRoute />}>
            <Route path="/booking" element={<BookingForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
