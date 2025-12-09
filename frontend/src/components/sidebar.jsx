import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
export default function Sidebar({ isOpen, toggleSidebar, isClosing }) {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="closeBtn" onClick={toggleSidebar}>
          ✕
        </button>
        <ul className="menu">
          <li>
            <NavLink
              to="/home"
              onClick={toggleSidebar}
              className={({ isActive }) => {
                const shouldBeActive = isActive && (isOpen || isClosing);
                return `sidebar-link ${shouldBeActive ? "active-sidebar-link" : "unactive-sidebar-link"}`;
              }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              onClick={toggleSidebar}
              className={({ isActive }) => {
                const shouldBeActive = isActive && (isOpen || isClosing);
                return `sidebar-link ${shouldBeActive ? "active-sidebar-link" : "unactive-sidebar-link"}`;
              }}>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/topbooks"
              onClick={toggleSidebar}
              className={({ isActive }) => {
                const shouldBeActive = isActive && (isOpen || isClosing);
                return `sidebar-link ${shouldBeActive ? "active-sidebar-link" : "unactive-sidebar-link"}`;
              }}>
              Top
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ostoskori"
              onClick={toggleSidebar}
              className={({ isActive }) => {
                const shouldBeActive = isActive && (isOpen || isClosing);
                return `sidebar-link ${shouldBeActive ? "active-sidebar-link" : "unactive-sidebar-link"}`;
              }}>
              Cart
            </NavLink>
          </li>
        </ul>
        <div id="sidebar-text">
          <p>More to come!</p>
        </div>
      </div>
    </>
  );
}
