import { useState, useEffect, useRef } from "react";
import "../styles/dropdown.css";
import { Link } from "react-router-dom";
import { apiLogout } from "../api/apiAuth.js";

export default function Dropdownmenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <img id="profileimg" src="/kuvat/user.svg" alt="Profiili" onClick={() => setOpen(!open)} />
      {open && (
        <div id="dropDownMenu">
          <div>
            <img src="/kuvat/user.svg" alt="user" width={40} />
          </div>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={apiLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
