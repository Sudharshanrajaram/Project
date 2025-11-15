import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaHouseUser,
  FaUserPlus,
  FaPlaneDeparture,
  FaTicketAlt,
  FaHistory,
  FaSearch,
  FaFileAlt,
  FaUserAlt,
  FaPowerOff,
} from "react-icons/fa";
import logo1 from "../assets/images/logo1.png";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState("");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // load user from localStorage (initial)
  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) setUser(storedUser);
  }, []);

  // close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);
  const toggleDropdown = () => setIsDropdownOpen((s) => !s);

  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser("");
    setIsDropdownOpen(false);
    // prefer history push or set state; reload only if necessary
    window.location.href = "/"; // navigate to home after logout
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo / Brand */}
          <div className="flex items-center gap-3">
            <FaPlaneDeparture className="text-white w-7 h-7" />
            <Link
              to="/"
              className="flex items-center gap-2 text-lg sm:text-2xl font-extrabold text-indigo-600 bg-white px-3 py-1 rounded-md hover:opacity-95 transition"
              aria-label="REN AIRLINE Home"
            >
              <em>REN AIRLINE</em>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <Link
              to="/flightSearch"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-yellow-300 hover:text-black transition ${isActive(
                "/flightSearch"
              )
                ? "bg-yellow-300 text-black"
                : ""}`}
            >
              <FaSearch />
              <span className="hidden md:inline">Search</span>
            </Link>

            <Link
              to="/booking"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-yellow-300 hover:text-black transition ${isActive(
                "/booking"
              )
                ? "bg-yellow-300 text-black"
                : ""}`}
            >
              <FaTicketAlt />
              <span className="hidden md:inline">Booking</span>
            </Link>

            <Link
              to="/getBooking"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-yellow-300 hover:text-black transition ${isActive(
                "/getBooking"
              )
                ? "bg-yellow-300 text-black"
                : ""}`}
            >
              <FaHistory />
              <span className="hidden md:inline">History</span>
            </Link>

            <Link
              to="/report"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-yellow-300 hover:text-black transition ${isActive(
                "/report"
              )
                ? "bg-yellow-300 text-black"
                : ""}`}
            >
              <FaFileAlt />
              <span className="hidden md:inline">Reports</span>
            </Link>

            {/* Auth area */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-white/10 transition"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <FaUserAlt />
                  <span className="hidden md:inline">{user}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-indigo-800 rounded-md shadow-lg overflow-hidden z-30">
                    <Link
                      to="/"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaHouseUser />
                      Home
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      <FaPowerOff />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-yellow-300 hover:text-black transition ${isActive(
                    "/login"
                  )
                    ? "bg-yellow-300 text-black"
                    : ""}`}
                >
                  <FaSignInAlt />
                  <span className="hidden md:inline">Login</span>
                </Link>

                <Link
                  to="/register"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-yellow-300 hover:text-black transition ${isActive(
                    "/register"
                  )
                    ? "bg-yellow-300 text-black"
                    : ""}`}
                >
                  <FaUserPlus />
                  <span className="hidden md:inline">Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (collapsible) */}
      <div
        ref={mobileMenuRef}
        className={`sm:hidden bg-indigo-800 border-t border-indigo-700 transition-all ${
          isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-4 space-y-2">
          {/* top area: show user or auth links */}
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <FaUserAlt />
                <span className="font-medium">{user}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-yellow-300 text-black rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center px-3 py-2 bg-white text-blue-700 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center px-3 py-2 border border-white text-white rounded-md"
              >
                Register
              </Link>
            </div>
          )}

          {/* links */}
          <div className="mt-2 border-t border-indigo-700 pt-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-white hover:bg-white/10 ${isActive("/") ? "bg-white/10" : ""}`}
            >
              <div className="flex items-center gap-2">
                <FaHouseUser />
                Home
              </div>
            </Link>

            <Link
              to="/flightSearch"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-white hover:bg-white/10 ${isActive("/flightSearch") ? "bg-white/10" : ""}`}
            >
              <div className="flex items-center gap-2">
                <FaSearch />
                Search Flights
              </div>
            </Link>

            <Link
              to="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-white hover:bg-white/10 ${isActive("/booking") ? "bg-white/10" : ""}`}
            >
              <div className="flex items-center gap-2">
                <FaTicketAlt />
                Booking
              </div>
            </Link>

            <Link
              to="/getBooking"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-white hover:bg-white/10 ${isActive("/getBooking") ? "bg-white/10" : ""}`}
            >
              <div className="flex items-center gap-2">
                <FaHistory />
                History
              </div>
            </Link>

            <Link
              to="/report"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-white hover:bg-white/10 ${isActive("/report") ? "bg-white/10" : ""}`}
            >
              <div className="flex items-center gap-2">
                <FaFileAlt />
                Reports
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
