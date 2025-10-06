import { useState } from "react";
import { Star, BadgeCheck, HandPlatter, Heart } from "lucide-react";
import { Badge } from "./badge";
import FoodTag from "./FoodTag";
import { useNavigate } from "react-router-dom";

function RestaurantCard({
  onClick,
  onSelect,
  isSelected = false,
  restaurantData = {
    id: 1,
    name: "นิวเยียร์เคทเทอริ่ง",
    image: "https://picsum.photos/224/220?random=default",
    rating: 4.2,
    reviewCount: 18,
    pricePerPerson: 290,
  },
}) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(restaurantData);
    } else if (onClick) {
      onClick();
    } else {
      navigate(`/customerreservation/${restaurantData.id}`);
    }
  };

  const toggleHeart = (e) => {
    e.stopPropagation(); // Prevent card click when heart is clicked
    setIsLiked(!isLiked);
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
          className="absolute top-2 right-2 p-2 bg-white backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={16}
            className={`transition-colors duration-200 ${
              isLiked
                ? "text-red-500 fill-red-500"
                : "text-gray-600 hover:text-red-400"
            }`}
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
