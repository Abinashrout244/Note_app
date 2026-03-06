import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./UserSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/profile`, {
          withCredentials: true,
        });

        dispatch(addUser(res.data.user));
        setLoading(false);
      } catch (err) {
        dispatch(removeUser());
        localStorage.removeItem("user");

        // 🔥 FORCE REDIRECT
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
