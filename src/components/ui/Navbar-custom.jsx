import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { useNavigate, useLocation } from "react-router-dom";

function NavbarCustom() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check if current path matches the route
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to get navbar item classes
  const getNavItemClasses = (path) => {
    const baseClasses = "font-semibold transition-all duration-200";
    if (isActive(path)) {
      return `${baseClasses} bg-gradient-to-r from-[#FF8A00] to-[#E9580A] bg-clip-text text-transparent`;
    }
    return `${baseClasses} text-[#475467] hover:bg-gradient-to-r hover:from-[#FF8A00] hover:to-[#E9580A] hover:bg-clip-text hover:text-transparent`;
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToRestaurant = () => {
    navigate("/customerrestaurant");
  };

  const goToCompare = () => {
    navigate("/compare");
  };

  const goToBlog = () => {
    navigate("/allblog");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToPlanning = () => {
    navigate("/planning");
  };

  const goToSignup = () => {
    navigate("/custsignup");
  };

  const goToLogin = () => {
    navigate("/custlogin");
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit (Enter key or search button click)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to restaurant page with search query
      navigate("/customerrestaurant", {
        state: {
          initialFilterStates: {
            searchQuery: searchQuery.trim(),
            selectedMainCategoryId: "",
            selectedFoodCategoryId: "",
            selectedEventCategoryId: "",
            selectedEventTypeLabel: "ประเภทจัดเลี้ยง",
            selectedCateringTypeLabel: "ประเภทงานอีเวนต์",
            selectedCuisineLabel: "ประเภทอาหาร",
          },
        },
      });
    }
  };

  return (
    <nav className="w-full h-fit flex flex-col py-5 gap-4 bg-white shadow-[0_2px_8px_0px_#0000001A]">
      {/* Top */}
      <div className="flex justify-between items-center px-32">
        <div className="flex items-center pr-2 gap-4" onClick={goToHome}>
          <div className="w-[32px] h-[32px]">
            <Logo />
          </div>
          <h1 className="logo cursor-pointer">CaterLink</h1>
        </div>

        <div className="flex gap-6">
          <div className="flex rounded-md border relative">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input
                type="text"
                placeholder="ค้นหาร้านจัดเลี้ยง"
                className="h-auto w-[647px] px-4 py-[10px] rounded-l-md gap-[10px] font-semibold"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <button
                type="submit"
                className="bg-gradient rounded-md p-[10px] gap-[10px]"
              >
                <Search className="text-white" />
              </button>
            </form>
          </div>

          <button className="p-2 border-2 rounded-md border-[#FF8A00]">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#E9580A] cursor-pointer"
              onClick={goToCart}
            >
              <path
                d="M6.50014 17H17.3294C18.2793 17 18.7543 17 19.1414 16.8284C19.4827 16.6771 19.7748 16.4333 19.9847 16.1246C20.2228 15.7744 20.3078 15.3071 20.4777 14.3724L21.8285 6.94311C21.8874 6.61918 21.9169 6.45721 21.8714 6.33074C21.8315 6.21979 21.7536 6.12651 21.6516 6.06739C21.5353 6 21.3707 6 21.0414 6H5.00014M2 2H3.3164C3.55909 2 3.68044 2 3.77858 2.04433C3.86507 2.0834 3.93867 2.14628 3.99075 2.22563C4.04984 2.31565 4.06876 2.43551 4.10662 2.67523L6.89338 20.3248C6.93124 20.5645 6.95016 20.6843 7.00925 20.7744C7.06133 20.8537 7.13493 20.9166 7.22142 20.9557C7.31956 21 7.44091 21 7.6836 21H19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          {isLoggedIn ? (
            // User Avatar Profile - user data should come from props or context
            <div className="flex items-center gap-2">
              <Avatar className="w-11 h-11 cursor-pointer hover:ring-2 hover:ring-[#FF8A00] hover:ring-offset-2 transition-all">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-[#FF8A00] text-white font-semibold">
                  U
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            // Login Buttons
            <>
              <button className="py-[10px] px-4">
                <p
                  className="text-[#475467] font-semibold cursor-pointer"
                  onClick={goToSignup}
                >
                  ลงชื่อเข้าใช้
                </p>
              </button>
              <button className="p-3 border-none rounded-md bg-gradient">
                <p
                  className="text-white font-semibold cursor-pointer"
                  onClick={goToLogin}
                >
                  เข้าสู่ระบบ
                </p>
              </button>
            </>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="flex px-32 gap-8 justify-center items-center">
        <button
          onClick={goToHome}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <p className={getNavItemClasses("/")}>หน้าหลัก</p>
        </button>
        <button
          onClick={goToRestaurant}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <p className={getNavItemClasses("/customerrestaurant")}>ร้านค้า</p>
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform duration-200 group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <p className="text-[#475467] font-semibold group-hover:bg-gradient-to-r group-hover:from-[#FF8A00] group-hover:to-[#E9580A] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200">
              หมวดหมู่ร้านค้า
            </p>
            <ChevronDown
              className={`text-[#475467] group-hover:text-[#FF8A00] transition-all duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                <button
                  className="w-full px-4 py-2 text-left text-[#475467] hover:bg-[#FF8A00]/10 hover:text-[#FF8A00] transition-colors duration-200 font-medium"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/customerrestaurant", {
                      state: { selectedFilter: "จัดเลี้ยง" },
                    });
                  }}
                >
                  จัดเลี้ยง
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-[#475467] hover:bg-[#FF8A00]/10 hover:text-[#FF8A00] transition-colors duration-200 font-medium"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/customerrestaurant", {
                      state: { selectedFilter: "ซุ้มอาหาร" },
                    });
                  }}
                >
                  ซุ้มอาหาร
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-[#475467] hover:bg-[#FF8A00]/10 hover:text-[#FF8A00] transition-colors duration-200 font-medium"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/customerrestaurant", {
                      state: { selectedFilter: "Snack box" },
                    });
                  }}
                >
                  Snack box
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={goToCompare}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <p className={getNavItemClasses("/compare")}>เปรียบเทียบ</p>
        </button>
        <button
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={goToPlanning}
        >
          <p className={getNavItemClasses("/planning")}>วางแผนงานเลี้ยง</p>
        </button>
        <button
          onClick={goToBlog}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
        >
          <p className={getNavItemClasses("/allblog")}>บทความ</p>
        </button>
      </div>
    </nav>
  );
}

export default NavbarCustom;
