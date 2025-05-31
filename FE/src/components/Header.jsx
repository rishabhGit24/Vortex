// src/components/header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



const Header = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false); // State for login dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "header scrolled" : "header"}>
      <div className="header-content">
        <Link
          to="/"
          className="header-logo"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          VORTEX
        </Link>
        <ul className="nav-links">
          {/* Login Dropdown */}
          <li className="login-dropdown">
            <button
              className="nav-link login-button"
              onClick={() => setLoginDropdown(!loginDropdown)}
            >
              Login
            </button>
            {loginDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/login?type=admin"
                    className="dropdown-item"
                    onClick={() => setLoginDropdown(false)}
                  >
                    Login as Admin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login?type=client"
                    className="dropdown-item"
                    onClick={() => setLoginDropdown(false)}
                  >
                    Login as Client
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="menu-toggle" onClick={() => setToggle(!toggle)}>
          <span className="menu-icon">{toggle ? "✖" : "☰"}</span>
        </div>
        {toggle && (
          <ul className="mobile-nav-links">
            {/* Mobile Login Dropdown */}
            <li className="login-dropdown">
              <button
                className="nav-link login-button"
                onClick={() => setLoginDropdown(!loginDropdown)}
              >
                Login
              </button>
              {loginDropdown && (
                <ul className="mobile-dropdown-menu">
                  <li>
                    <Link
                      to="/login?type=admin"
                      className="dropdown-item"
                      onClick={() => {
                        setLoginDropdown(false);
                        setToggle(false);
                      }}
                    >
                      Login as Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login?type=client"
                      className="dropdown-item"
                      onClick={() => {
                        setLoginDropdown(false);
                        setToggle(false);
                      }}
                    >
                      Login as Client
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;