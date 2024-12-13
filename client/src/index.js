import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <div className="min-h-screen bg-black relative overflow-hidden p-4"> */}
    {/* <div className="fixed top-0 w-full flex justify-center z-50">
        <div className="w-5/6">
          <Navbar />
        </div>
      </div> */}

    <App />
    <Toaster />
    {/* <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="w-5/6">
        </div> */}
    {/* <footer className="mt-8 text-center text-white font-light text-sm md:text-base">
          © 2024 - All rights reserved
        </footer> */}
    {/* </div>
    </div> */}
  </React.StrictMode>
);
