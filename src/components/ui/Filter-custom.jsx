import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import axios from "axios";

function FilterCustom() {
  const [selectedEventType, setSelectedEventType] = useState("ประเภทจัดเลี้ยง");
  const [selectedCateringType, setSelectedCateringType] =
    useState("ประเภทงานอีเวนต์");
  const [selectedCuisine, setSelectedCuisine] = useState("ประเภทอาหาร");

  // New state for API data
  const [categories, setCategories] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Integrate with API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/categories`);
        setCategories(response.data);
        console.log("Categories loaded:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [baseUrl]);

  // Event categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/event-categories`);
        setEventCategories(response.data);
        console.log("Event categories loaded:", response.data);
      } catch (error) {
        console.error("Error fetching event categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [baseUrl]);

  // Food categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/food-categories`);
        setFoodCategories(response.data);
        console.log("Food categories loaded:", response.data);
      } catch (error) {
        console.error("Error fetching food categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [baseUrl]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center py-8">
      <h1>ค้นหาร้านจัดเลี้ยงที่ตรงใจคุณ</h1>

      <div className="flex flex-col gap-4">
        <div className="flex rounded-md border relative">
          <input
            type="text"
            placeholder="ค้นหาร้านจัดเลี้ยงด้วยชื่อ"
            className="h-auto w-[647px] px-4 py-[10px] rounded-l-md gap-[10px] font-semibold"
          />
          <button className="bg-gradient rounded-md p-[10px] gap-[10px]">
            <Search className="text-white" />
          </button>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-[#7D7B7B]">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FF8A00]"></div>
              <span>กำลังโหลดข้อมูล...</span>
            </div>
          )}

          {/* ประเภทการจัดเลี้ยง */}
          <div className="relative">
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              disabled={isLoading}
            >
              <option disabled>ประเภทจัดเลี้ยง</option>
              {isLoading ? (
                <option disabled>กำลังโหลด...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
          </div>

          {/* ประเภทงานอีเวนต์ */}
          <div className="relative">
            <select
              value={selectedCateringType}
              onChange={(e) => setSelectedCateringType(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              disabled={isLoading}
            >
              <option disabled>ประเภทงานอีเวนต์</option>
              {isLoading ? (
                <option disabled>กำลังโหลด...</option>
              ) : (
                eventCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
          </div>

          {/* ประเภทอาหาร */}
          <div className="relative">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              disabled={isLoading}
            >
              <option disabled>ประเภทอาหาร</option>
              {isLoading ? (
                <option disabled>กำลังโหลด...</option>
              ) : (
                foodCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterCustom;
