import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

import "./App.css";

import Signup from "./components/auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { clearError, logout, setError, setLoading, setUser } from "./redux/slices/authSlice";
import axios from "axios";
import ResetPassword from "./components/auth/ResetPassword";



function App() {

  const dispatch=useDispatch()
  const {token,user}=useSelector((state)=>state.auth);

  useEffect(() => {
  const storedToken = token || localStorage.getItem("token");

  if (!storedToken) return;

  const fetchUser = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      dispatch(setUser({ user: res.data, token: storedToken }));
    } catch (e) {
      console.error("getme failed", e);
      dispatch(logout());
      dispatch(
        setError(
          e?.response?.data?.message ||
            "Session expired. Please login again"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

    fetchUser();
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/reset-password/:token" element={<ResetPassword></ResetPassword>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
