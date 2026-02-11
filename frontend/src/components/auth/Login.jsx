import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  setError,
  setLoading,
  setUser,
} from "../../redux/slices/authSlice";
import { closeAuthModal, switchAuthMode } from "../../redux/slices/uiSlices";
import validator from "validator";
import axios from "axios";
import "../../css/auth/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // forgot password state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { authMode } = useSelector((state) => state.ui);

  const isForgot = authMode === "forgot";
  const API = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validator.isEmail(email)) {
      dispatch(setError("Please enter a valid email address"));
      return;
    }

    if (!password) {
      dispatch(setError("Please enter your password"));
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      const data = res.data;

      dispatch(
        setUser({
          user: data.user,
          token: data.token,
        })
      );

      localStorage.setItem("token", data.token);
      dispatch(closeAuthModal());
    } catch (e) {
      dispatch(
        setError(e?.response?.data?.message || "Login failed")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleForgotPassword = async () => {
    if (!validator.isEmail(forgotEmail)) {
      setForgotMessage("Please enter a valid email address");
      return;
    }

    try {
      setForgotMessage("Sending reset link...");
      await axios.post(`${API}/api/auth/forgot-password`, {
        email: forgotEmail,
      });
      setForgotMessage("Reset link sent. Please check your email.");
    } catch (e) {
      setForgotMessage(
        e?.response?.data?.message || "Failed to send reset email"
      );
    }
  };

  const switchMode = (mode) => {
    dispatch(clearError());
    setForgotMessage("");
    setForgotEmail("");
    dispatch(switchAuthMode(mode));
  };

  return (
    <div className="login-wrapper">
      <h3 className="login-title">Welcome back</h3>
      <p className="login-subtitle">
        {isForgot
          ? "Enter your registered email to reset password"
          : "Please enter your details to login"}
      </p>

      {!isForgot && (
        <form className="login-form" onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="xyz@email.com"
            type="email"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Minimum 6 characters"
            type="password"
          />

          {error && <div className="login-error">{error}</div>}

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}

      <div className="forgot-wrapper">
        {!isForgot ? (
          <>
            <span
              className="forgot-link"
              onClick={() => switchMode("forgot")}
            >
              Forgot password?
            </span>

            <span
              className="forgot-link"
              onClick={() => switchMode("signup")}
            >
              Don’t have an account? Sign up
            </span>
          </>
        ) : (
          <>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your registered email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />

            {forgotMessage && (
              <p className="forgot-msg">{forgotMessage}</p>
            )}

            <button
              type="button"
              className="forgot-btn"
              onClick={handleForgotPassword}
            >
              Send Reset Link
            </button>

            <span
              className="forgot-link"
              onClick={() => switchMode("login")}
            >
              Back to login
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

