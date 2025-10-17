import { useState, useEffect, useCallback, useRef } from "react";
import { Star, Heart } from "lucide-react";
import FoodTag from "./FoodTag";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

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
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // Track if user has manually toggled
  const currentStateRef = useRef({
    isLiked: isFavorite,
    favoriteId: initialFavoriteId,
  }); // Track current state
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  // Update ref whenever state changes
  useEffect(() => {
    currentStateRef.current = { isLiked, favoriteId };
  }, [isLiked, favoriteId]);

  // Helper function to check authentication
  const isUserAuthenticated = () => {
    // Check for authentication token in cookies
    if (document.cookie) {
      const parts = document.cookie.split(";").map((part) => part.trim());
      const tokenPart = parts.find((p) => p.startsWith("accessToken="));
      if (tokenPart) {
        return true;
      }
    }

    // Fallback to localStorage
    const token = localStorage.getItem("accessToken");
    return !!token;
  };

  // Helper function to get authentication token
  const getAuthToken = () => {
    // Try to get token from cookies first
    if (document.cookie) {
      const parts = document.cookie.split(";").map((part) => part.trim());
      const tokenPart = parts.find((p) => p.startsWith("accessToken="));
      if (tokenPart) {
        return tokenPart.slice("accessToken=".length);
      }
    }

    // Fallback to localStorage
    return localStorage.getItem("accessToken") || null;
  };

  // Function to fetch current favorite status from backend
  const fetchFavoriteStatus = useCallback(async () => {
    if (!isUserAuthenticated() || !restaurantData?.id) {
      return;
    }

    // Don't override state if user has just interacted with the heart
    if (hasUserInteracted) {
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        return;
      }

      const response = await axios.get(`${baseUrl}/api/favorites/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const favorites = response.data || [];

      // Find if this restaurant is in the user's favorites
      const favorite = favorites.find(
        (fav) => String(fav.restaurant_id) === String(restaurantData.id)
      );

      if (favorite) {
        setIsLiked(true);
        setFavoriteId(favorite.id);
      } else {
        setIsLiked(false);
        setFavoriteId(null);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // Silently fail - keep default state
    }
  }, [restaurantData?.id, baseUrl, hasUserInteracted]);

  // Check favorite status when component mounts or when authentication changes
  useEffect(() => {
    fetchFavoriteStatus();
  }, [fetchFavoriteStatus]);

  // Also check when authentication status might have changed (e.g., user logs in)
  useEffect(() => {
    const handleStorageChange = () => {
      fetchFavoriteStatus();
    };

    const handleVisibilityChange = () => {
      // Refresh favorites when page becomes visible again (user switches back to tab)
      if (!document.hidden) {
        fetchFavoriteStatus();
      }
    };

    // Listen for localStorage changes (like when user logs in/out)
    window.addEventListener("storage", handleStorageChange);

    // Listen for visibility changes (when user switches tabs and comes back)
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Also listen for custom events that might indicate auth status change
    window.addEventListener("authStatusChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("authStatusChanged", handleStorageChange);
    };
  }, [fetchFavoriteStatus]);

  // Initialize state from props only once on mount, don't override user interactions
  useEffect(() => {
    // Only update from props if we don't have a favoriteId (meaning no user interaction yet)
    if (isFavorite && initialFavoriteId && !favoriteId) {
      setIsLiked(isFavorite);
      setFavoriteId(initialFavoriteId);
    }
  }, [isFavorite, initialFavoriteId, favoriteId]);

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

    // Check authentication first
    if (!isUserAuthenticated()) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการเพิ่มรายการโปรด");

      // Set return URL to come back to this page after login
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem("loginReturnUrl", currentPath);

      // Redirect to login page
      navigate("/custlogin");
      return;
    }

    try {
      setIsLoading(true);
      setHasUserInteracted(true); // Mark that user has interacted

      const token = getAuthToken();

      if (!token) {
        toast.error("กรุณาเข้าสู่ระบบก่อนทำการเพิ่มรายการโปรด");
        navigate("/custlogin");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Use the ref to make decisions to avoid stale state
      const currentIsLiked = currentStateRef.current.isLiked;
      const currentFavoriteId = currentStateRef.current.favoriteId;

      if (!currentIsLiked) {
        // Add to favorites using POST /api/favorites
        const response = await axios.post(
          `${baseUrl}/api/favorites`,
          {
            restaurant_id: restaurantData.id,
          },
          { headers }
        );

        if (response.status === 200 || response.status === 201) {
          // Immediately update UI state
          const newFavoriteId = response.data.id;
          setIsLiked(true);
          setFavoriteId(newFavoriteId);
          toast.success("เพิ่มในรายการโปรดแล้ว");
        }
      } else {
        // Remove from favorites using DELETE /api/favorites/{favorite_id}
        if (currentFavoriteId) {
          const response = await axios.delete(
            `${baseUrl}/api/favorites/${currentFavoriteId}`,
            { headers }
          );

          if (response.status === 200 || response.status === 204) {
            // Immediately update UI state
            setIsLiked(false);
            setFavoriteId(null);
            toast.success("ลบออกจากรายการโปรดแล้ว");
          }
        } else {
          // Fallback: if we don't have favoriteId, fetch it from API first
          try {
            const favoritesResponse = await axios.get(
              `${baseUrl}/api/favorites/me`,
              {
                headers,
              }
            );

            const favorites = favoritesResponse.data || [];
            const favorite = favorites.find(
              (fav) => String(fav.restaurant_id) === String(restaurantData.id)
            );

            if (favorite) {
              // Now we have the favorite ID, delete it
              const deleteResponse = await axios.delete(
                `${baseUrl}/api/favorites/${favorite.id}`,
                { headers }
              );

              if (deleteResponse.status === 200) {
                setIsLiked(false);
                setFavoriteId(null);
                toast.success("ลบออกจากรายการโปรดแล้ว");
                setTimeout(() => fetchFavoriteStatus(), 100);
              }
            } else {
              // Restaurant is not in favorites, just update state
              setIsLiked(false);
              setFavoriteId(null);
              toast.success("ลบออกจากรายการโปรดแล้ว");
            }
          } catch (fallbackError) {
            console.error("Error in fallback favorite removal:", fallbackError);
            // Just update the UI state as fallback
            setIsLiked(false);
            setFavoriteId(null);
            toast.success("ลบออกจากรายการโปรดแล้ว");
          }
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);

      if (error.response) {
        // Handle specific error cases
        if (error.response.status === 401) {
          toast.error("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          // Clear invalid tokens
          localStorage.removeItem("accessToken");
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          navigate("/custlogin");
        } else if (error.response.status === 403) {
          toast.error("ไม่มีสิทธิ์ในการเข้าถึง");
        } else if (error.response.status === 404) {
          toast.error("ไม่พบข้อมูลร้านอาหาร");
        } else {
          toast.error("เกิดข้อผิดพลาดในการดำเนินการ");
        }
      } else if (error.request) {
        toast.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      } else {
        toast.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
      }
    } finally {
      setIsLoading(false);
      // Reset interaction flag after 2 seconds to allow background fetching again
      setTimeout(() => {
        setHasUserInteracted(false);
      }, 2000);
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
