import React from "react";
import logo from "../assets/logo-icon.png"
import "./loader.css";

const LogoLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <img
        src={logo}
        alt="Logo"
        className="w-20 logo-zoom animate-pulse opacity-80"
      />
    </div>
  );
};

export default LogoLoader;
