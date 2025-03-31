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
    <div className={`w-full ${className} ${isHomePage ? 'bg-transparent' : 'bg-black pb-5'}`}>
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-3">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <img
            src="/logofinal.png"
            alt="Logo"
            className="h-16 w-32 sm:h-20 sm:w-36 md:h-24 md:w-40 transition-all duration-300"
          />
        </Link>
      </div>

      {!isHomePage && (
          <div className="hidden md:flex w-1/3 justify-center">
            <SearchComponent />
          </div>
        )}

      {/* Navigation, Search, and Authentication */}
      <div className="flex items-center justify-between md:justify-center">
        {/* Search Bar - Centered on Large Screens, Below on Small Screens */}
    
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Hidden on Small Screens, Visible on Large Screens */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/about"
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] transition-all font-serif text-lg tracking-wide hover:scale-105 transform-gpu"
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] transition-all font-serif text-lg tracking-wide hover:scale-105 transform-gpu cursor-pointer"
                onClick={handleServicesClick}
              >
                Services
              </button>
              {isServicesOpen && (
                <ServiceComponent className="bg-black border border-gray-800" />
              )}
            </div>

            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] transition-all font-serif text-lg tracking-wide hover:scale-105 transform-gpu cursor-pointer"
                onClick={handleToolsClick}
              >
                Tools
              </button>
              {isToolsOpen && (
                <div className="absolute top-full left-0 mt-2 rounded-md w-40 z-10 bg-black border border-gray-800">
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
          </div>

          {/* Authentication */}
          <div>
            {status === "loading" ? null : !session ? (
              <LoginButton />
            ) : (
              <AvatarDropdown avatarUrl={session.user.image || undefined} userName={session.user.name || undefined} />
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Search Bar - Shown Below on Small Screens */}
    {!isHomePage && (
      <div className="md:hidden w-full px-4 sm:px-6 md:px-12 mt-2">
        <SearchComponent />
      </div>
    )}
  </div>
  );
};

export default Header;