import { createContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    loggedin: false,
    user: null,
    loading: true,
  });
  useEffect(() => {
    fetch("api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setAuth({
          loggedin: data.loggedin,
          user: data.user,
          loading: false,
        });
      }, []);
  });
  return <Authcontext.Provider value={{ auth, setAuth }}>{children}</Authcontext.Provider>;
}
