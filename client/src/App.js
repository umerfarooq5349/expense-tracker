import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AddTransactions from "./pages/addTransections";
import Navbar from "./components/navbar";
import Summary from "./pages/summary";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black">
        <div className="fixed top-0 w-full flex justify-center z-50">
          <div className="w-5/6">
            <Navbar />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen pt-20">
          <div className="w-5/6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/addTransactions" element={<AddTransactions />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
