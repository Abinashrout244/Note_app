import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage("New passwords do not match");
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/api/auth/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/");
      toast.success("Password Change Sucessfully.");

      setMessage(res.data.message);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-100 flex justify-center items-center px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => (window.location.href = "/")} // Navigate to home page
        className="absolute top-6 left-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
      >
        <ChevronLeft />
        Back
      </button>

      {/* Form */}
      <form
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] space-y-6 transition-all duration-500"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
          Change Password
        </h2>

        <input
          type="text"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
        />

        <button
          type="submit"
          className="w-full py-3 sm:py-4 bg-linear-to-r from-green-400 via-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        >
          Update Password
        </button>

        {message && (
          <p className="mt-3 text-sm text-center text-red-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
