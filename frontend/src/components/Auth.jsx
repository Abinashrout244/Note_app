import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";

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
      console.log(res);
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-[350px] p-6 rounded-2xl shadow-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {isSignup ? "Create Account" : "Login"}
        </h2>
        <div className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg"
                required
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
            required
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup ? (
            <button
              onClick={handleSignup}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              singnup
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              login
            </button>
          )}
        </div>
        <p className="text-sm text-center">
          {isSignup ? "Already have account?" : "Don't have account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-600 ml-1"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
