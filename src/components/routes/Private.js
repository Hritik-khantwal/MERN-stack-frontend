import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `https://mern-stack-back-end.onrender.com/api/v1/auth/user-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token || auth?.user?.role === 0)
      authCheck(); //i have added this - ' || auth?.user?.role', here
    else setOk(false); //i have added this - ' else setOk(false); ' , here
  }, [auth?.token, auth?.user?.role]); //i have added this - ' auth?.user?.role', here

  return ok ? <Outlet /> : <Spinner />;
};
