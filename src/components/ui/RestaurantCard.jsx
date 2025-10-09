import { useState } from "react";
import { Star, BadgeCheck, HandPlatter, Heart } from "lucide-react";
import { Badge } from "./badge";
import FoodTag from "./FoodTag";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RestaurantCard({
  onClick,
  onSelect,
  isSelected = false,
  isFavorite = false, // New prop to set initial favorite state
  favoriteId: initialFavoriteId = null, // New prop to provide existing favorite ID
  restaurantData = {
    id: 1,
    name: "นิวเยียร์เคทเทอริ่ง",
    image: "https://picsum.photos/224/220?random=default",
    rating: 4.2,
    reviewCount: 18,
    pricePerPerson: 290,
  },
}) {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteId, setFavoriteId] = useState(initialFavoriteId); // Store favorite ID for deletion
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(restaurantData);
    } else if (onClick) {
      onClick();
    } else {
      navigate(`/customerreservation/${restaurantData.id}`);
    }
  };

  const toggleHeart = async (e) => {
    e.stopPropagation(); // Prevent card click when heart is clicked

    if (isLoading) return; // Prevent multiple clicks while loading

    try {
      setIsLoading(true);

      // Get auth token from localStorage or wherever it's stored
      const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("token") ||
        sessionStorage.getItem("authToken");

      if (!token) {
        console.error("No authentication token found. User needs to login.");
        // Optionally redirect to login or show login modal
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (!isLiked) {
        // Add to favorites
        const response = await axios.post(
          `${baseUrl}/api/favorites`,
          {
            restaurant_id: restaurantData.id,
          },
          { headers }
        );

        if (response.status === 200 || response.status === 201) {
          setIsLiked(true);
          setFavoriteId(response.data.id); // Store the favorite ID for future deletion
          console.log("Added to favorites:", response.data);
        }
      } else {
        // Remove from favorites using the stored favorite ID
        if (favoriteId) {
          const response = await axios.delete(
            `${baseUrl}/api/favorites/${favoriteId}`,
            { headers }
          );

          if (response.status === 200) {
            setIsLiked(false);
            setFavoriteId(null); // Clear the favorite ID
            console.log("Removed from favorites:", response.data);
          }
        } else {
          // Fallback: if we don't have favoriteId, just toggle state
          // This might happen if the component was initialized as favorite without an ID
          setIsLiked(false);
          console.log("Removed from favorites (no ID available)");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);

      if (error.response) {
        console.error("API Error:", error.response.data);

        // Handle specific error cases
        if (error.response.status === 401) {
          console.error("Authentication failed. User needs to login again.");
          // Optionally clear invalid token and redirect to login
          // localStorage.removeItem('authToken');
          // window.location.href = '/login';
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 relative cursor-pointer hover:opacity-75 transition-all ${
        isSelected ? "ring-2 ring-orange-500 ring-offset-2 rounded-lg" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={restaurantData.image}
          alt={restaurantData.name}
          className="w-[224px] h-[220px] rounded-md object-cover"
        />
        {/* Heart Toggle Button */}
        <button
          onClick={toggleHeart}
          disabled={isLoading}
          className={`absolute top-2 right-2 p-2 bg-white backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-white/90"
          }`}
        >
          <Heart
            size={16}
            className={`transition-colors duration-200 ${
              isLiked
                ? "text-red-500 fill-red-500"
                : "text-gray-600 hover:text-red-400"
            } ${isLoading ? "animate-pulse" : ""}`}
          />
        </button>
      </div>
      <div className="flex flex-col gap-2 w-[224px]">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-[#101828] truncate overflow-hidden whitespace-nowrap">
            {restaurantData.name}
          </p>
          <div className="flex gap-5">
            <div className="flex gap-1 justify-center items-center">
              <Star size={20} className="text-yellow-400 fill-current"></Star>
              <p className="text-[#667085]">{restaurantData.rating}</p>
            </div>
            <p className="text-[#98A2B3]">
              ({Math.floor(restaurantData.reviewCount || 0)})
            </p>
          </div>

          <div className="flex flex-wrap gap-[6px] w-full">
            <FoodTag
              categories={(restaurantData.mainCategories || []).filter(
                (category, index, array) =>
                  array.findIndex((c) => c.id === category.id) === index
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
