import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "./Constants";
import { useDispatch } from "react-redux";
import { addUser } from "./UserSlice";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const fetch_user = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/profile`, {
        withCredentials: true,
      });
      console.log(res?.data?.user);
      dispatch(addUser(res?.data?.user));
      setLoading(false);
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
      console.log(err.response);
    }
  };

  useEffect(() => {
    fetch_user();
  }, []);
  if (loading)
    return (
      <div className="h-screen text-3xl font-semibold justify-center items-center">
        Loading...
      </div>
    );
  return children;
};

export default ProtectedRoute;
