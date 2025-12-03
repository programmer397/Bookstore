import { useState, useContext } from "react";
import { apiLogin } from "./api/apiAuth.js";
import { useNavigate } from "react-router-dom";
import { apiLogout } from "./api/apiAuth.js";
import { Authcontext } from "./authContext.jsx";

export default function authority() {
  const { auth, setAuth } = useContext(Authcontext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const logindata = await apiLogin(data);
      console.log(logindata);
      if (logindata.success) {
        console.log(logindata.message);
        setAuth({
          loggedin: true,
          user: logindata.user,
          loading: false,
        });
        navigate("/home");
      } else {
        setError(logindata.message);
      }
    } catch (err) {
      setError(err.message);
      console.error("Virhe:", err);
    }
  };

  const guest = async () => {
    try {
      await apiLogout();
      setAuth({
        loggedin: false,
        user: null,
        loading: false,
      });
    } catch (err) {
      console.error("Guest logout error:", err);
    }

    navigate("/home");
  };
  return (
    <div>
      <form id="formlogin" onSubmit={handleSubmit}>
        <div className="container">
          <h2>Login</h2>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input type="text" name="email" id="email" placeholder="Enter Username" required />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input type="password" name="password" id="password" placeholder="Enter Password" required />

          <p id="message"></p>

          <button id="kirjaudu" type="submit">
            Log in
          </button>
        </div>

        <div className="container">
          <button type="button" className="button2" onClick={() => navigate("/signup")}>
            Create account
          </button>

          <button id="quest" type="button" className="button2" onClick={guest}>
            Continue as guest
          </button>
        </div>
      </form>
    </div>
  );
}
