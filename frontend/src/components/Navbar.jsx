import React, { useState, useRef, useEffect, useContext } from "react";
import { User, LogOut, SearchIcon, Sun, Moon } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/UserSlice";
import { Link, useNavigate } from "react-router";
import { ThemeContext } from "../utils/ThemeContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { search, setSearch, theme, handleTheme } = useContext(ThemeContext);

  const isDark = theme === "Dark";

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      dispatch(removeUser());
      toast.success("Logout Successfully ");
      navigate("/login");
    } catch (err) {
      console.log(err.response);
    }
  };

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
    <nav
      className={`fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-lg shadow-lg transition ${
        isDark
          ? "bg-slate-900 border-b border-slate-700"
          : "bg-white/70 border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <h1 className="text-xl md:text-2xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-wide">
            NoteFlow
          </h1>
        </Link>

        <div
          className={` md:flex flex-1 max-w-xs mx-6 items-center rounded-xl shadow-sm border px-3 py-2 transition ${
            isDark
              ? "bg-slate-800 border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500"
              : "bg-white border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400"
          }`}
        >
          <SearchIcon
            className="hidden sm:block text-gray-400 mr-2"
            size={18}
          />
          <input
            type="search"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full bg-transparent outline-none text-sm ${
              isDark
                ? "text-gray-200 placeholder-gray-500"
                : "text-gray-700 placeholder-gray-400"
            }`}
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 md:gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md overflow-hidden">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User size={16} />
                )}
              </div>

              <span
                className={`hidden md:block font-medium ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {user?.firstName}
              </span>
            </div>

            {/* Dropdown */}
            {open && (
              <div
                className={`absolute right-0 mt-3 w-52 rounded-2xl shadow-2xl py-3 transition ${
                  isDark
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-white border border-gray-100"
                }`}
              >
                <div
                  className={`px-4 py-3 flex items-center justify-between border-b ${
                    isDark ? "border-slate-700" : "border-gray-200"
                  }`}
                >
                  <div>
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p
                      className={`font-semibold truncate ${
                        isDark ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {user?.firstName}
                    </p>
                  </div>

                  <button
                    onClick={handleTheme}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isDark
                        ? "bg-slate-700 text-yellow-400 hover:bg-slate-600"
                        : "bg-gray-100 text-indigo-600 hover:bg-gray-200"
                    }`}
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>

                <Link
                  to="/profile"
                  className={`w-full flex items-center gap-2 px-4 py-2 transition ${
                    isDark
                      ? "hover:bg-slate-700 text-gray-200"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <User size={16} />
                  Profile
                </Link>

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
      </div>
    </nav>
  );
}
