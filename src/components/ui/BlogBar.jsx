import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BlogBar({ onSearch, onAuthorFilter, onCateringFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("ผู้เขียน");
  const [selectedCateringType, setSelectedCateringType] =
    useState("การจัดเลี้ยง");
  const [mainCategories, setMainCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const navigate = useNavigate();

  // Get base URL from environment
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Load main categories when component mounts
  useEffect(() => {
    const loadMainCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await axios.get(`${baseUrl}/api/main-categories`);
        setMainCategories(response.data);
      } catch (error) {
        console.error("Error fetching main categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadMainCategories();
  }, [baseUrl]);

  const goToWriteBlog = () => {
    // Check authentication status
    let isAuthenticated = false;

    // Check for authentication token in cookies
    if (document.cookie) {
      const parts = document.cookie.split(";").map((part) => part.trim());
      const tokenPart = parts.find((p) => p.startsWith("accessToken="));
      if (tokenPart) {
        isAuthenticated = true;
      }
    }

    // Fallback to localStorage if not found in cookies
    if (!isAuthenticated) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        isAuthenticated = true;
      }
    }

    // Navigate based on authentication status
    if (isAuthenticated) {
      navigate("/custwriteblog");
    } else {
      navigate("/custlogin");
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAuthorFilterChange = (e) => {
    const value = e.target.value;
    setSelectedEventType(value);
    if (onAuthorFilter) {
      onAuthorFilter(value);
    }
  };

  const handleCateringFilterChange = (e) => {
    const value = e.target.value;
    setSelectedCateringType(value);
    if (onCateringFilter) {
      onCateringFilter(value);
    }
  };

  return (
    <div className="flex gap-4 items-center max-w-[1184px]">
      <div className="flex rounded-md border relative">
        <input
          type="text"
          placeholder="ค้นหาบทความ"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          className="h-auto min-w-[630px] px-4 py-[10px] rounded-l-md gap-[10px] font-semibold"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient rounded-md p-[10px] gap-[10px]"
        >
          <Search className="text-white" />
        </button>
      </div>

      <div className="relative">
        <select
          value={selectedEventType}
          onChange={handleAuthorFilterChange}
          className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-auto text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
        >
          <option value="ผู้เขียน" disabled>
            ผู้เขียน
          </option>
          <option value="all">ทั้งหมด</option>
          <option value="customer">ลูกค้า</option>
          <option value="restaurant">ร้านค้า</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={selectedCateringType}
          onChange={handleCateringFilterChange}
          className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-auto text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
        >
          <option value="การจัดเลี้ยง" disabled>
            การจัดเลี้ยง
          </option>
          <option value="all">ทั้งหมด</option>
          {isLoadingCategories ? (
            <option disabled>กำลังโหลด...</option>
          ) : (
            mainCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
      </div>

      <Button
        className="bg-gradient text-white py-4 px-auto rounded-lg font-semibold h-fit cursor-pointer"
        onClick={goToWriteBlog}
      >
        เพิ่มบทความของฉัน
      </Button>
    </div>
  );
}

export default BlogBar;
