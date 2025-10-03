import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import axios from "axios";

function FilterCustom({ onSearchResults }) {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState("");
  const [selectedEventCategoryId, setSelectedEventCategoryId] = useState("");
  const [selectedFoodCategoryId, setSelectedFoodCategoryId] = useState("");

  // Display states for dropdown labels
  const [selectedEventTypeLabel, setSelectedEventTypeLabel] =
    useState("ประเภทจัดเลี้ยง");
  const [selectedCateringTypeLabel, setSelectedCateringTypeLabel] =
    useState("ประเภทงานอีเวนต์");
  const [selectedCuisineLabel, setSelectedCuisineLabel] =
    useState("ประเภทอาหาร");

  // API data states
  const [categories, setCategories] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  //Integrate with API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Search function
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams();

      if (searchQuery.trim()) params.append("query", searchQuery.trim());
      if (selectedMainCategoryId)
        params.append("main_category_id", selectedMainCategoryId);
      if (selectedFoodCategoryId)
        params.append("food_category_id", selectedFoodCategoryId);
      if (selectedEventCategoryId)
        params.append("event_category_id", selectedEventCategoryId);

      params.append("page", "1");
      params.append("limit", "10");

      const response = await axios.get(
        `${baseUrl}/api/restaurants/search?${params.toString()}`
      );

      if (onSearchResults) {
        onSearchResults(response.data);
      }

      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Error searching restaurants:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle category selection
  const handleMainCategoryChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const categoryId = selectedOption.value;
    const categoryName = selectedOption.text;

    setSelectedMainCategoryId(categoryId);
    setSelectedEventTypeLabel(categoryName);

    // Auto-search when filter changes
    setTimeout(handleSearch, 100);
  };

  const handleEventCategoryChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const categoryId = selectedOption.value;
    const categoryName = selectedOption.text;

    setSelectedEventCategoryId(categoryId);
    setSelectedCateringTypeLabel(categoryName);

    // Auto-search when filter changes
    setTimeout(handleSearch, 100);
  };

  const handleFoodCategoryChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const categoryId = selectedOption.value;
    const categoryName = selectedOption.text;

    setSelectedFoodCategoryId(categoryId);
    setSelectedCuisineLabel(categoryName);

    // Auto-search when filter changes
    setTimeout(handleSearch, 100);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click or Enter key
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Main Categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/main-categories`);
        setCategories(response.data);
        console.log("Main categories loaded:", response.data);
      } catch (error) {
        console.error("Error fetching main categories:", error);
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
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <input
              type="text"
              placeholder="ค้นหาร้านจัดเลี้ยงด้วยชื่อ"
              className="h-auto w-[647px] px-4 py-[10px] rounded-l-md gap-[10px] font-semibold"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button
              type="submit"
              className="bg-gradient rounded-md p-[10px] gap-[10px]"
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Search className="text-white" />
              )}
            </button>
          </form>
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
              value={selectedMainCategoryId}
              onChange={handleMainCategoryChange}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              disabled={isLoading}
            >
              <option value="" disabled>
                {selectedEventTypeLabel}
              </option>
              {isLoading ? (
                <option disabled>กำลังโหลด...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
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
              value={selectedEventCategoryId}
              onChange={handleEventCategoryChange}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              disabled={isLoading}
            >
              <option value="" disabled>
                {selectedCateringTypeLabel}
              </option>
              {isLoading ? (
                <option disabled>กำลังโหลด...</option>
              ) : (
                eventCategories.map((category) => (
                  <option key={category.id} value={category.id}>
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
              value={selectedFoodCategoryId}
              onChange={handleFoodCategoryChange}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              disabled={isLoading}
            >
              <option value="" disabled>
                {selectedCuisineLabel}
              </option>
              {isLoading ? (
                <option disabled>กำลังโหลด...</option>
              ) : (
                foodCategories.map((category) => (
                  <option key={category.id} value={category.id}>
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
