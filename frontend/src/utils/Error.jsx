import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 text-center px-4">
      <img
        src="https://tse3.mm.bing.net/th/id/OIP.-TUFvAO1JPv-TUBNUcmeRwHaHa?pid=Api&P=0&h=180"
        alt="404 illustration"
        className="w-64 mt-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
      />
      <p className="text-xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
