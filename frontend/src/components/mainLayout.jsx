import Navbar from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import { useState } from "react";

export default function MainLayout({ children }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (isOpen) {
      setIsClosing(true);
      setSidebarOpen(false);

      setTimeout(() => {
        setIsClosing(false);
      }, 300);
    } else {
      setSidebarOpen(true);
    }
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} isClosing={isClosing} toggleSidebar={toggleSidebar} />
      <div className="page-container">{children}</div>
    </>
  );
}
