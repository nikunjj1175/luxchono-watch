import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import EmailVerify from "../pages/EmailVerify";
import OtpVerify from "../pages/Otp";
import Register from "../pages/Register";
import AuthHandler from "./AuthHandler";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <AuthHandler />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/emailverify" element={<EmailVerify />}></Route>
          <Route path="/otpverify" element={<OtpVerify />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
