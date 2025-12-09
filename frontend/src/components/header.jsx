import { useNavigate, NavLink } from "react-router-dom";
import { Authcontext } from "../authContext";
import { useContext } from "react";
import "../styles/header.css";
import { useMediaQuery } from "@mui/material";
import { FiAlignLeft } from "react-icons/fi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Dropdownmenu from "./dropdown.jsx";

export default function Navbar({ toggleSidebar }) {
  const isMobile = useMediaQuery("(max-width:1023px)");
  const width440 = useMediaQuery("(min-width:440px)");
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(Authcontext);
  if (auth.loading) return null;

  return (
    <header>
      <nav>
        {isMobile && <FiAlignLeft onClick={toggleSidebar} className="burger-icon" />}
        <img src="/kuvat/logo.svg" alt="Storyscape" />
        <div className="search-wrapper">
          <input type="text" id="search" placeholder="Search books or authors" />
          <button type="button" id="search-btn">
            <HiOutlineMagnifyingGlass />
          </button>
        </div>

        {!isMobile && (
          <ul className="page-links">
            <li>
              <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? "active-nav-link" : "unactive-nav-link"}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" className={({ isActive }) => `nav-link ${isActive ? "active-nav-link" : "unactive-nav-link"}`}>
                Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/topbooks" className={({ isActive }) => `nav-link ${isActive ? "active-nav-link" : "unactive-nav-link"}`}>
                Top
              </NavLink>
            </li>
            <li>
              <NavLink to="/ostoskori" className={({ isActive }) => `nav-link ${isActive ? "active-nav-link" : "unactive-nav-link"}`}>
                Cart
              </NavLink>
            </li>
          </ul>
        )}
        <ul className="auth-links">
          {!auth.loggedin && width440 && (
            <>
              <NavLink to="/signup">
                <button className="nav-btn signup">Sign up</button>
              </NavLink>
              <NavLink to="/login">
                <button className="nav-btn login">Login</button>
              </NavLink>
            </>
          )}
          {!auth.loggedin && !width440 && (
            <div id="profile-img-container">
              <img id="profileimg" src="/kuvat/user.svg" alt="login" onClick={() => navigate("/login")} />
            </div>
          )}
        </ul>
        {auth.loggedin && (
          <div id="profile-img-container">
            <Dropdownmenu />
          </div>
        )}
      </nav>
    </header>
  );
}
