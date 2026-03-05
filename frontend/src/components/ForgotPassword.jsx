import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft } from "lucide-react";

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        { emailId },
        { withCredentials: true },
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/reset-password", { state: { emailId } });
      }, 1500);
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-100 flex justify-center items-center px-4 py-8">
      <button
        onClick={() => (window.location.href = "/")} // Navigate to home page
        className="absolute top-6 left-6 flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
      >
        <ChevronLeft />
        Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] space-y-6 transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          required
          className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
        />

        <button
          type="submit"
          className="w-full py-3 sm:py-4 bg-linear-to-r from-indigo-500 via-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        >
          Send OTP
        </button>

        {message && (
          <p className="mt-3 text-sm text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
