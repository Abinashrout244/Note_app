import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import toast from "react-hot-toast";

export default function Auth({ setUser }) {
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setEmailId] = useState("test2.mail@gmail.com");
  const [password, setPassword] = useState("Test2@1234_");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      // e.preventDefault();
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.findUser));
      toast.success("Login Successfully ");
      //console.log(res?.data?.findUser);
      navigate("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/api/auth/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      //console.log(res);
      dispatch(addUser(res?.data?.data));
      toast.success("User Register Successfully ");
      navigate("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-2xl border border-white/40 p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] space-y-6 transition-all duration-500">
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <div className="space-y-5">
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
                required
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
            required
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white/70 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300 shadow-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isSignup ? (
            <button
              onClick={handleSignup}
              className="w-full py-3 sm:py-4 bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full py-3 sm:py-4 bg-linear-to-r from-indigo-600 via-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>

        <p className="text-sm text-center text-gray-600">
          {isSignup ? "Already have account?" : "Don't have account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-2 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
