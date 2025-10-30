import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import axios from "axios";

function FilterCustom({ onSearchResults, initialFilterStates }) {
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
  const [hasTriggeredNavbarSearch, setHasTriggeredNavbarSearch] =
    useState(false); // Prevent multiple navbar searches

  //Integrate with API
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Effect to handle initial filter states from navigation
  useEffect(() => {
    if (initialFilterStates) {
      // Reset the navbar search flag when new initial states come in
      setHasTriggeredNavbarSearch(false);

      setSearchQuery(initialFilterStates.searchQuery || "");
      setSelectedMainCategoryId(
        initialFilterStates.selectedMainCategoryId || ""
      );
      setSelectedEventCategoryId(
        initialFilterStates.selectedEventCategoryId || ""
      );
      setSelectedFoodCategoryId(
        initialFilterStates.selectedFoodCategoryId || ""
      );
      setSelectedEventTypeLabel(
        initialFilterStates.selectedEventTypeLabel || "ประเภทจัดเลี้ยง"
      );
      setSelectedCateringTypeLabel(
        initialFilterStates.selectedCateringTypeLabel || "ประเภทงานอีเวนต์"
      );
      setSelectedCuisineLabel(
        initialFilterStates.selectedCuisineLabel || "ประเภทอาหาร"
      );
    }
  }, [initialFilterStates]);

  // Effect to automatically perform search when initial filter states are set
  useEffect(() => {
    if (
      initialFilterStates &&
      !initialFilterStates.pendingNavbarFilter && // Don't auto-search if it's from navbar (handled separately)
      (initialFilterStates.searchQuery ||
        initialFilterStates.selectedMainCategoryId ||
        initialFilterStates.selectedFoodCategoryId ||
        initialFilterStates.selectedEventCategoryId)
    ) {
      // Small delay to ensure states are set
      const timer = setTimeout(() => {
        handleSearch({
          searchQuery: initialFilterStates.searchQuery || "",
          selectedMainCategoryId:
            initialFilterStates.selectedMainCategoryId || "",
          selectedFoodCategoryId:
            initialFilterStates.selectedFoodCategoryId || "",
          selectedEventCategoryId:
            initialFilterStates.selectedEventCategoryId || "",
          selectedEventTypeLabel:
            initialFilterStates.selectedEventTypeLabel || "ประเภทจัดเลี้ยง",
          selectedCateringTypeLabel:
            initialFilterStates.selectedCateringTypeLabel || "ประเภทงานอีเวนต์",
          selectedCuisineLabel:
            initialFilterStates.selectedCuisineLabel || "ประเภทอาหาร",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilterStates]);

  // Search function
  const handleSearch = async (overrideParams = {}) => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams();

      // Use override params if provided, otherwise use current state
      const currentSearchQuery =
        overrideParams.searchQuery !== undefined
          ? overrideParams.searchQuery
          : searchQuery;
      const currentMainCategoryId =
        overrideParams.selectedMainCategoryId !== undefined
          ? overrideParams.selectedMainCategoryId
          : selectedMainCategoryId;
      const currentFoodCategoryId =
        overrideParams.selectedFoodCategoryId !== undefined
          ? overrideParams.selectedFoodCategoryId
          : selectedFoodCategoryId;
      const currentEventCategoryId =
        overrideParams.selectedEventCategoryId !== undefined
          ? overrideParams.selectedEventCategoryId
          : selectedEventCategoryId;

      if (currentSearchQuery.trim())
        params.append("query", currentSearchQuery.trim());
      if (currentMainCategoryId)
        params.append("main_category_id", currentMainCategoryId);
      if (currentFoodCategoryId)
        params.append("food_category_id", currentFoodCategoryId);
      if (currentEventCategoryId)
        params.append("event_category_id", currentEventCategoryId);

      params.append("page", "1");
      params.append("limit", "10");

      // Only make API call if there are search parameters (query or any filter)
      const hasSearchParams =
        currentSearchQuery.trim() ||
        currentMainCategoryId ||
        currentFoodCategoryId ||
        currentEventCategoryId;

      if (hasSearchParams) {
        const response = await axios.get(
          `${baseUrl}/api/restaurants/search?${params.toString()}`
        );

        if (onSearchResults) {
          // Pass the search results along with current filter states
          onSearchResults(response.data, {
            searchQuery: currentSearchQuery.trim(),
            selectedMainCategoryId: currentMainCategoryId,
            selectedFoodCategoryId: currentFoodCategoryId,
            selectedEventCategoryId: currentEventCategoryId,
            selectedEventTypeLabel:
              overrideParams.selectedEventTypeLabel || selectedEventTypeLabel,
            selectedCateringTypeLabel:
              overrideParams.selectedCateringTypeLabel ||
              selectedCateringTypeLabel,
            selectedCuisineLabel:
              overrideParams.selectedCuisineLabel || selectedCuisineLabel,
          });
        }
      }
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

    // Auto-search when filter changes - pass new values directly
    setTimeout(() => {
      handleSearch({
        selectedMainCategoryId: categoryId,
        selectedEventTypeLabel: categoryName,
      });
    }, 100);
  };

  const handleEventCategoryChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const categoryId = selectedOption.value;
    const categoryName = selectedOption.text;

    setSelectedEventCategoryId(categoryId);
    setSelectedCateringTypeLabel(categoryName);

    // Auto-search when filter changes - pass new values directly
    setTimeout(() => {
      handleSearch({
        selectedEventCategoryId: categoryId,
        selectedCateringTypeLabel: categoryName,
      });
    }, 100);
  };

  const handleFoodCategoryChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const categoryId = selectedOption.value;
    const categoryName = selectedOption.text;

    setSelectedFoodCategoryId(categoryId);
    setSelectedCuisineLabel(categoryName);

    // Auto-search when filter changes - pass new values directly
    setTimeout(() => {
      handleSearch({
        selectedFoodCategoryId: categoryId,
        selectedCuisineLabel: categoryName,
      });
    }, 100);
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

  // Clear all filters and search
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedMainCategoryId("");
    setSelectedEventCategoryId("");
    setSelectedFoodCategoryId("");
    setSelectedEventTypeLabel("ประเภทจัดเลี้ยง");
    setSelectedCateringTypeLabel("ประเภทงานอีเวนต์");
    setSelectedCuisineLabel("ประเภทอาหาร");

    // Clear search results
    if (onSearchResults) {
      onSearchResults({ data: [], pagination: {} });
    }
  };

  // Main Categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/main-categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching main categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [baseUrl]);

  // Handle navbar filter after categories are loaded
  useEffect(() => {
    if (
      initialFilterStates?.selectedCategoryName &&
      initialFilterStates?.pendingNavbarFilter &&
      categories.length > 0 &&
      !hasTriggeredNavbarSearch // Prevent multiple triggers
    ) {
      // Find the category ID based on the category name
      const matchingCategory = categories.find(
        (category) => category.name === initialFilterStates.selectedCategoryName
      );

      if (matchingCategory) {
        setSelectedMainCategoryId(matchingCategory.id);
        setHasTriggeredNavbarSearch(true); // Mark as triggered

        // Trigger search with the found category ID directly
        setTimeout(async () => {
          setIsSearching(true);
          try {
            const params = new URLSearchParams();
            params.append("main_category_id", matchingCategory.id);

            const response = await axios.get(
              `${baseUrl}/api/restaurants/search?${params.toString()}`
            );

            if (onSearchResults) {
              onSearchResults(response.data);
            }
          } catch (error) {
            console.error("Error searching restaurants:", error);
          } finally {
            setIsSearching(false);
          }
        }, 100);
      }
    }
  }, [
    categories,
    initialFilterStates,
    baseUrl,
    onSearchResults,
    hasTriggeredNavbarSearch,
  ]);

  // Event categories
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/event-categories`);
        setEventCategories(response.data);
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
              className="bg-gradient rounded-md p-[10px] gap-[10px] cursor-pointer"
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

          {/* Clear filters button */}
          {(searchQuery ||
            selectedMainCategoryId ||
            selectedEventCategoryId ||
            selectedFoodCategoryId) && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-3 text-sm text-[#FF8A00] hover:text-[#E9580A] hover:bg-[#FF8A00]/10 rounded-lg border-2 border-transparent hover:border-[#FF8A00]/20 transition-all duration-200"
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterCustom;
