import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-4 shadow-inner text-sm text-gray-500">
      © {new Date().getFullYear()} NoteFlow. All rights reserved.
    </footer>
  );
}
