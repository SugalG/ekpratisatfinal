"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; 
import { SearchComponent } from "./SearchComponent";
import AvatarDropdown from "./AvatarDropDown";
import { LoginButton } from "./LoginButton";
import Link from "next/link";
import ServiceComponent from "./ServiceComponent";

const Header = ({ className }: any) => {
  const { data: session, status } = useSession();
  const [isClient, setClient] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const toolsRef = useRef(null);
  const servicesRef = useRef(null);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    setClient(true);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (toolsRef.current && !(toolsRef.current as any).contains(event.target)) &&
      (servicesRef.current && !(servicesRef.current as any).contains(event.target))
    ) {
      setIsToolsOpen(false);
      setIsServicesOpen(false);
    }
  };

  useEffect(() => {
    if (isToolsOpen || isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToolsOpen, isServicesOpen]);

  const handleToolsClick = () => {
    setIsToolsOpen(!isToolsOpen);
    if (isServicesOpen) setIsServicesOpen(false);
  };

  const handleServicesClick = () => {
    setIsServicesOpen(!isServicesOpen);
    if (isToolsOpen) setIsToolsOpen(false);
  };

  const isHomePage = pathname === "/"; // Check if the pathname is the homepage

  if (!isClient) {
    return null;
  }

  return (
    <div className={`w-full ${className} ${isHomePage ? 'bg-transparent' : 'bg-black'} py-6`}>
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-12 py-3">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/">
            <img
              src="/logofinal.png"
              alt="Logo"
              className="h-20 w-36 sm:h-24 sm:w-40 md:h-28 md:w-40 transition-all duration-300"
            />
          </a>
        </div>

        {/* Navigation + Authentication */}
        <div className="flex flex-wrap items-center space-x-4 sm:space-x-6 md:space-x-10">
          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white text-2xl"
          >
            &#9776; {/* Hamburger icon */}
          </button>

          {/* Menu Items */}
          <div className={`lg:flex items-center space-x-4 sm:space-x-6 md:space-x-10 ${isMenuOpen ? 'flex' : 'hidden'} lg:block`}>
            {/* About Us */}
            <Link
              href="/about"
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] transition-all font-semibold text-lg tracking-wide hover:scale-105 transform-gpu"
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                className={`text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] transition-all font-semibold text-lg tracking-wide hover:scale-105 transform-gpu cursor-pointer ${isHomePage ? 'bg-transparent' : 'bg-black'}`}
                onClick={handleServicesClick}
              >
                Services
              </button>
              {isServicesOpen && (
                <ServiceComponent className={isHomePage ? 'bg-transparent' : 'bg-black'} />
              )}
            </div>

            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                className={`text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] transition-all font-semibold text-lg tracking-wide hover:scale-105 transform-gpu cursor-pointer ${isHomePage ? 'bg-transparent' : 'bg-black'}`}
                onClick={handleToolsClick}
              >
                Tools
              </button>
              {isToolsOpen && (
                <div className={`absolute top-full left-0 mt-2 rounded-md w-40 z-10 border border-gray-800 ${isHomePage ? 'bg-transparent' : 'bg-black'}`}>
                  {["Unit Converter", "Calendar", "EMI"].map((tool) => (
                    <Link
                      key={tool}
                      href={`/${tool.toLowerCase().replace(" ", "-")}`}
                      className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] font-medium text-sm tracking-normal hover:scale-105 transform-gpu"
                    >
                      {tool}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Authentication */}
            {status === "loading" ? (
              <div></div>
            ) : !session ? (
              <LoginButton />
            ) : (
              <div className="flex items-center space-x-4 sm:space-x-6">
                <AvatarDropdown
                  avatarUrl={session.user.image || undefined}
                  userName={session.user.name || undefined}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Centered Search Component */}
      {/* <div className="flex justify-center w-full px-4 sm:px-6 md:px-12">
        <SearchComponent />
      </div> */}
    </div>
  );
};

export default Header;
