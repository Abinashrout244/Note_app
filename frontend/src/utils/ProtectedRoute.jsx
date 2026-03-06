import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./UserSlice";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/profile`, {
          withCredentials: true,
        });

        if (!mounted) return;
        dispatch(addUser(res?.data?.user));
        setIsAuthorized(true);
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        if (err?.response?.status === 401) {
          localStorage.removeItem("user");
          dispatch(removeUser());
          setIsAuthorized(false);
          navigate("/login", { replace: true });
        }
        console.log(err?.response || err);
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [dispatch, navigate]);

  if (loading)
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-2xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (!isAuthorized) return null;

  return children;
};

export default ProtectedRoute;
