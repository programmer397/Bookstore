import Navbar from "./header.jsx";
export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="page-container">{children}</div>
    </>
  );
}
