import React, { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`${theme === "Light" ? "bg-white/50" : "bg-slate-900"} text-center py-4 shadow-inner text-sm text-gray-500`}
    >
      © {new Date().getFullYear()} NoteFlow. All rights reserved.
    </footer>
  );
}
