import React, { useState } from "react";

const cache = new Map();

const setOTPInCache = (otp, email) => {
  // Set the OTP in the cache with an expiration time of 5 minutes
  setTimeout(() => {
    cache.delete(email);
  }, 300000);
  cache.set(email, otp);
};

const getOTPFromCache = (email) => {
  return cache.get(email);
};

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = () => {
    // Generate a random OTP
    const otp = Math.floor(Math.random() * 1000000);
    setOTPInCache(otp, email);
    setOTP(otp);
  };

  const handleVerifyOTP = () => {
    const cachedOTP = getOTPFromCache(email);
    if (cachedOTP === otp) {
      setSuccess("OTP verified");
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="button" onClick={handleSendOTP}>
        Send OTP
      </button>
      <br />
      <label htmlFor="otp">OTP:</label>
      <input
        type="text"
        id="otp"
        value={otp}
        onChange={(event) => setOTP(event.target.value)}
      />
      <button type="button" onClick={handleVerifyOTP}>
        Verify OTP
      </button>
    </div>
  );
}
