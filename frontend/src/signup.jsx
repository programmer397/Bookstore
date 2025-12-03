import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCreateAccount } from "./api/apiAuth";

export default function Signup() {
  const [errors, setError] = useState({
    username: "",
    email: "",
    errorfield: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const result = await apiCreateAccount(data);
      console.log(result);
      if (!result.success) {
        switch (result.type) {
          case "username_taken":
            setError((prev) => ({ ...prev, username: result.message }));
            break;
          case "email_taken":
            setError((prev) => ({ ...prev, email: result.message }));
            break;
          default:
            setError((prev) => ({ ...prev, errorfield: result.message }));
            break;
        }
      } else {
        navigate("/home");
        console.log(result);
      }
    } catch (err) {
      console.error(err);
      console.log(errors);
    }
  };

  return (
    <form id="formcreateaccount" onSubmit={handleSubmit}>
      <div className="container">
        <h2>Sign up</h2>

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input type="text" name="email" id="email" placeholder="Enter Email" required />
        {errors.email && <p>{errors.email}</p>}

        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input type="text" id="username" name="username" placeholder="Enter Username" required />
        {errors.username && <p>{errors.username}</p>}

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input type="password" id="password" name="password" placeholder="Enter Password" required />

        {errors.errorfield && <p id="errorfield">{errors.errorfield}</p>}

        <button id="createaccountbtn" type="submit">
          Create account
        </button>
      </div>

      <div className="container">
        <button type="button" className="button2" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </form>
  );
}
