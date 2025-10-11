import NavbarCustom from "../components/ui/Navbar-custom";
import FilterCustom from "../components/ui/Filter-custom";
import RestaurantCard from "../components/ui/RestaurantCard";
import MiniFooter from "../components/ui/miniFooter";
import { Button } from "../components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CustomerRestaurant() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [isLoadingTopRestaurants, setIsLoadingTopRestaurants] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [isLoadingAllRestaurants, setIsLoadingAllRestaurants] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [initialFilterStates, setInitialFilterStates] = useState(null);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);

  // Get base URL from environment
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Check if we came from the compare page or with search results
  useEffect(() => {
    if (location.state?.fromCompare) {
      setIsCompareMode(true);
      // Initialize with existing selected restaurants
      if (location.state?.existingSelected) {
        setSelectedRestaurants(location.state.existingSelected);
      }
    }

    // Check if we came from homepage with search results
    if (location.state?.searchResults && location.state?.isSearchActive) {
      const results = location.state.searchResults?.data || [];
      setFilteredRestaurants(results);
      setIsSearchActive(true);

      // Set initial filter states if they exist
      if (location.state?.filterStates) {
        setInitialFilterStates(location.state.filterStates);
      }
    }

    // Check if we came from navbar search with initial filter states
    if (location.state?.initialFilterStates) {
      setInitialFilterStates(location.state.initialFilterStates);
    }

    // Check if we came from navbar dropdown with selected filter
    if (location.state?.selectedFilter) {
      const selectedCategory = location.state.selectedFilter;

      // Set a flag that we need to apply this filter once categories are loaded
      const filterState = {
        selectedCategoryName: selectedCategory, // Pass the name, let FilterCustom find the ID
        searchTerm: "",
        pendingNavbarFilter: true, // Flag to indicate this came from navbar
      };
      setInitialFilterStates(filterState);

      // Also trigger automatic search for this category
      setIsSearchActive(true);

      // Filter restaurants that match the selected category
      const filteredByCategory = allRestaurants.filter((restaurant) => {
        const mainCategories =
          restaurant.main_categories || restaurant.mainCategories || [];
        return mainCategories.some(
          (category) =>
            category.name === selectedCategory || category === selectedCategory
        );
      });

      setFilteredRestaurants(filteredByCategory);
    }
  }, [location.state, allRestaurants]);

  // Load restaurant data when component mounts
  useEffect(() => {
    const loadRestaurantData = async () => {
      // Load top 5 restaurants
      setIsLoadingTopRestaurants(true);
      try {
        const topResponse = await axios.get(
          `${baseUrl}/api/restaurants/top?limit=5`
        );
        setTopRestaurants(topResponse.data);
      } catch (error) {
        console.error("Error fetching top restaurants:", error);
      } finally {
        setIsLoadingTopRestaurants(false);
      }

      // Load recommended restaurants (top favorite restaurants)
      setIsLoadingRecommended(true);
      try {
        const recommendedResponse = await axios.get(
          `${baseUrl}/api/restaurants/top/favorite`,
          {
            params: {
              limit: 5,
            },
          }
        );
        setRecommendedRestaurants(recommendedResponse.data);
      } catch (error) {
        console.error("Error fetching recommended restaurants:", error);
        setRecommendedRestaurants([]);
      } finally {
        setIsLoadingRecommended(false);
      }

      // Load all restaurants
      setIsLoadingAllRestaurants(true);
      try {
        const allResponse = await axios.get(`${baseUrl}/api/restaurants`);
        setAllRestaurants(allResponse.data);
      } catch (error) {
        console.error("Error fetching all restaurants:", error);
      } finally {
        setIsLoadingAllRestaurants(false);
      }
    };

    loadRestaurantData();
  }, [baseUrl]);

  const goToReservation = (restaurantId) => {
    if (restaurantId) {
      navigate(`/customerreservation/${restaurantId}`);
    } else {
      console.error("Restaurant ID is required for navigation");
    }
  };

  const handleRestaurantSelect = (restaurantData) => {
    if (isCompareMode) {
      // Toggle selection for compare mode
      const isSelected = selectedRestaurants.some(
        (r) => r.id === restaurantData.id
      );
      if (isSelected) {
        setSelectedRestaurants(
          selectedRestaurants.filter((r) => r.id !== restaurantData.id)
        );
      } else {
        setSelectedRestaurants([...selectedRestaurants, restaurantData]);
      }
    } else {
      // Normal mode - go to reservation with restaurant ID
      goToReservation(restaurantData.id);
    }
  };

  const handleCompareSelected = () => {
    navigate("/compare", {
      state: { selectedRestaurants },
    });
  };

  // Helper function to format restaurant data for RestaurantCard
  const formatRestaurantData = (restaurant) => {
    const formatted = {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      rating: restaurant.avgRating
        ? Number(restaurant.avgRating.toFixed(2))
        : 0,
      reviewCount: Math.floor(restaurant.totalReview || 0),
      pricePerPerson: 300, // Default price since not provided in API
      image:
        restaurant.images && restaurant.images.length > 0
          ? restaurant.images[0].url
          : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=224&h=220&fit=crop",
      // Handle both formats: snake_case (from search API) and camelCase (from regular API)
      foodCategories:
        restaurant.food_categories || restaurant.foodCategories || [],
      eventCategories:
        restaurant.event_categories || restaurant.eventCategories || [],
      mainCategories:
        restaurant.main_categories || restaurant.mainCategories || [],
    };

    return formatted;
  };

  // Handle search results from FilterCustom component
  const handleSearchResults = (searchResults) => {
    // The API returns { data: [...], pagination: {...} }
    // We need to access the data property
    const results = searchResults?.data || [];

    if (results && results.length > 0) {
      setFilteredRestaurants(results);
      setIsSearchActive(true);
    } else {
      // If no results or empty search, show all restaurants
      setFilteredRestaurants([]);
      setIsSearchActive(false);
    }
  };

  // Reset search when component mounts or when needed
  const resetSearch = () => {
    setFilteredRestaurants([]);
    setIsSearchActive(false);
  };

  return (
    <>
      <NavbarCustom />
      <FilterCustom
        onSearchResults={handleSearchResults}
        initialFilterStates={initialFilterStates}
      />

      {/* Compare Mode Header */}
      {isCompareMode && (
        <div className="bg-orange-50 border-b border-orange-200 p-4">
          <div className="flex justify-center items-center gap-4">
            <p className="text-orange-800">
              โหมดเปรียบเทียบ: เลือกร้านที่ต้องการเปรียบเทียบ (
              {selectedRestaurants.length} ร้านที่เลือก)
            </p>
            {selectedRestaurants.length > 0 && (
              <Button
                className="bg-gradient text-white font-semibold"
                onClick={handleCompareSelected}
              >
                เปรียบเทียบร้านที่เลือก
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Reccommand Restaurant - Hide when search is active */}
      {!isSearchActive && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-4 py-10">
            <h3>ร้านแนะนำจาก CaterLink</h3>
            <div className="flex gap-4">
              {isLoadingRecommended ? (
                // Loading state - show 5 skeleton cards
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-2 w-[224px]">
                    <div className="w-[224px] h-[220px] bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex flex-col gap-2 p-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : recommendedRestaurants.length > 0 ? (
                // Render actual recommended restaurant data
                recommendedRestaurants.map((restaurant) => {
                  const formattedData = formatRestaurantData(restaurant);
                  return (
                    <RestaurantCard
                      key={restaurant.id}
                      onSelect={isCompareMode ? handleRestaurantSelect : null}
                      onClick={
                        !isCompareMode
                          ? () => goToReservation(restaurant.id)
                          : null
                      }
                      isSelected={selectedRestaurants.some(
                        (r) => r.id === restaurant.id
                      )}
                      restaurantData={formattedData}
                    />
                  );
                })
              ) : (
                // No recommended restaurants found
                <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                  <p>ไม่พบร้านแนะนำในขณะนี้</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top 5 Restaurants - Hide when search is active */}
      {!isSearchActive && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-4 px-32 py-10">
            <h3>Top 5 ร้านขายดี</h3>
            <div className="flex gap-4">
              {isLoadingTopRestaurants ? (
                // Loading state - show 5 skeleton cards
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-2 w-[224px]">
                    <div className="w-[224px] h-[220px] bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex flex-col gap-2 p-3">
                      <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : topRestaurants.length > 0 ? (
                // Render actual top restaurant data
                topRestaurants.map((restaurant) => {
                  const formattedData = formatRestaurantData(restaurant);
                  return (
                    <RestaurantCard
                      key={restaurant.id}
                      onSelect={isCompareMode ? handleRestaurantSelect : null}
                      onClick={
                        !isCompareMode
                          ? () => goToReservation(restaurant.id)
                          : null
                      }
                      isSelected={selectedRestaurants.some(
                        (r) => r.id === restaurant.id
                      )}
                      restaurantData={formattedData}
                    />
                  );
                })
              ) : (
                // No top restaurants found
                <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                  <p>ไม่พบร้านแนะนำในขณะนี้</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ร้านจัดเลี้ยง */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 py-10 max-w-[1184px]">
          <div className="flex justify-between items-center">
            <h3>{isSearchActive ? "ผลการค้นหา" : "ร้านจัดเลี้ยง"}</h3>
            {isSearchActive && (
              <button
                onClick={resetSearch}
                className="text-sm text-[#FF8A00] hover:text-[#E9580A] cursor-pointer"
              >
                ล้างการค้นหา
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-y-8 gap-x-4">
            {isLoadingAllRestaurants ? (
              // Loading state - show 12 skeleton cards
              Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2 w-[224px]">
                  <div className="w-[224px] h-[220px] bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex flex-col gap-2 p-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : isSearchActive ? (
              // Show filtered search results
              filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => {
                  const formattedData = formatRestaurantData(restaurant);
                  return (
                    <RestaurantCard
                      key={restaurant.id}
                      onSelect={isCompareMode ? handleRestaurantSelect : null}
                      onClick={
                        !isCompareMode
                          ? () => goToReservation(restaurant.id)
                          : null
                      }
                      isSelected={selectedRestaurants.some(
                        (r) => r.id === restaurant.id
                      )}
                      restaurantData={formattedData}
                    />
                  );
                })
              ) : (
                // No search results found
                <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                  <p>ไม่พบร้านที่ตรงกับการค้นหา</p>
                </div>
              )
            ) : allRestaurants.length > 0 ? (
              // Render all restaurant data (default view)
              allRestaurants.map((restaurant) => {
                const formattedData = formatRestaurantData(restaurant);
                return (
                  <RestaurantCard
                    key={restaurant.id}
                    onSelect={isCompareMode ? handleRestaurantSelect : null}
                    onClick={
                      !isCompareMode
                        ? () => goToReservation(restaurant.id)
                        : null
                    }
                    isSelected={selectedRestaurants.some(
                      (r) => r.id === restaurant.id
                    )}
                    restaurantData={formattedData}
                  />
                );
              })
            ) : (
              // No restaurants found
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ไม่พบร้านจัดเลี้ยงในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <MiniFooter />
    </>
  );
}

export default CustomerRestaurant;
