import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import SearchPlayer from "./pages/SearchPlayer";
import { ServerStatusProvider } from "./context/ServerStatusContext";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <ServerStatusProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-white">
          {/* Sidebar */}
          <div
            className={`relative border-r border-gray-200 bg-white transition-all duration-300
              ${open ? "w-56" : "w-12"} flex flex-col`}
          >
            {/* Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="absolute right-3 top-6 flex h-6 w-6 items-center justify-center border rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-100 z-10"
            >
              <img
              src="/server/assets/icons/arrow.png"
              alt="Toggle sidebar"
              className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            {/* Sidebar Content */}
            {open && (
              <div className="p-4 flex-1 flex flex-col">
                <h1 className="mb-8 text-xl font-bold text-gray-800">
                  Krazy Server
                </h1>

                <nav className="flex flex-col space-y-2 flex-1">
                  <SidebarItem to="/server" label="Home" open={open} />
                  <SidebarItem to="/server/search" label="Search" open={open} />
                  <SidebarItem to="/server/players" label="Players" open={open} />
                </nav>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 overflow-auto bg-white">
            <Routes>
              <Route path="/server" element={<Home />} />
              <Route path="/server/search" element={<SearchPlayer />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ServerStatusProvider>
  );
};

interface SidebarItemProps {
  label: string;
  to: string;
  open: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, to, open }) => {
  return (
    <NavLink
      to={to}
      end={to === "/server"}
      className={({ isActive }) =>
        `flex items-center rounded-md px-3 py-2 text-gray-700 transition-colors
         ${isActive ? "font-semibold text-green-600" : "hover:text-gray-900"}
         ${open ? "justify-start" : "hidden"}`
      }
    >
      {open && <span>{label}</span>}
    </NavLink>
  );
};

export default App;
