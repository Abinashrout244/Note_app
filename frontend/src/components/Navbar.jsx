import React, { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/UserSlice";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.response);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          {" "}
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-wide">
            NoteFlow
          </h1>
        </Link>

        {/* Right Side Profile */}
        <div className="relative" ref={dropdownRef}>
          {/* Avatar */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md hover:scale-105 transition">
              {(
                <img
                  src={user?.photoURL}
                  className="object-cover rounded-full size-full"
                />
              ) || <User size={18} />}
            </div>

            {/* Show name only on desktop */}
            <span className="hidden md:block font-medium text-gray-700">
              {user?.firstName}
            </span>
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 animate-fadeIn">
              <div className="px-4 py-2 border-b">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="font-semibold text-gray-800 truncate">
                  {user?.firstName}
                </p>
              </div>

              <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-gray-700">
                <Link className="flex items-center gap-2" to="/profile">
                  <User size={16} />
                  Profile
                </Link>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-500 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
