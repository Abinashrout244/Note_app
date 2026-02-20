import Navbar from "./Navbar";
import Footer from "./Footer";
import Auth from "./Auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      {/* <Dashboard notes={notes} setNotes={setNotes} /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
