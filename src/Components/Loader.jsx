import React from "react";
import logo from "../assets/logo-icon.png";
import blackLogo from "../assets/logo-black.png";
import "./loader.css";

const Loader = ({ bg = "white" }) => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen  ${
        bg == "white" ? "bg-white" : "bg-black"
      }`}>
      <img
        src={bg == "white" ? blackLogo : logo}
        alt="Logo"
        className="w-20 logo-zoom animate-pulse"
      />
    </div>
  );
};

export default Loader;