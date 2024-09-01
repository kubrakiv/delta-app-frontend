import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import delta from "../../../img/delta-logo.png";

const MainPageHeaderComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCareer = () => {
    window.scrollTo(0, 0);
    navigate("/career");
    // setIsTransitioning(true);
    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    //   navigate("/career");
    // }, 500); // Duration of the fade-out transition
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        const section = document.getElementById(id); // Re-select section after navigation
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setMenuOpen(false); // Close menu after navigation on mobile
        }
      }, 100); // Adjust delay as needed
    } else {
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false); // Close menu after navigation on mobile
      }
    }
  };
  return (
    // <div className={`main-page-wrapper ${isTransitioning ? "fade-out" : ""}`}>
    <header className="header-page">
      <nav className="nav-bar">
        <div className="main-logo">
          <img src={delta} alt="Delta Logistics" />
        </div>
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li onClick={() => scrollToSection("section1")}>Home</li>
          <li onClick={() => scrollToSection("section2")}>About us</li>
          <li onClick={() => scrollToSection("section3")}>Services</li>
          <li onClick={() => handleCareer()}>Career</li>
          <li onClick={() => scrollToSection("section5")}>Gallery</li>
          <li onClick={() => scrollToSection("section6")}>Contact us</li>
          <button className="enter-btn" onClick={handleLogin}>
            <FaRegUser />
            <span style={{ paddingLeft: "5px" }}>Login</span>
          </button>
        </ul>
      </nav>
    </header>
    // </div>
  );
};

export default MainPageHeaderComponent;
