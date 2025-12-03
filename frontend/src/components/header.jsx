import { Link } from "react-router-dom";
import { Authcontext } from "../authContext";
import { useContext } from "react";
import Dropdownmenu from "./dropdown.jsx";

export default function Navbar() {
  const { auth, setAuth } = useContext(Authcontext);
  if (auth.loading) return null;
  function toggleNav() {
    document.body.classList.toggle("nav-open");
  }

  return (
    <header>
      <nav>
        <h1>Storyscape</h1>
        <ul className="page-links">
          <li>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" className="nav-link">
              Books
            </Link>
          </li>
          <li>
            <Link to="/topbooks" className="nav-link">
              Top
            </Link>
          </li>
          <li>
            <Link to="/ostoskori" className="nav-link">
              Cart
            </Link>
          </li>
        </ul>

        <ul className="auth-links">
          {!auth.loggedin && (
            <>
              <Link to="/login">
                <button className="navbtn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="navbtn">Sign up</button>
              </Link>
            </>
          )}
          {auth.loggedin && <Dropdownmenu />}
        </ul>
      </nav>
    </header>
  );
}
