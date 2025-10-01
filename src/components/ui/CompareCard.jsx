import { Button } from "./button";
import { Star } from "lucide-react";
import { Badge } from "./badge";
import { HandPlatter } from "lucide-react";
import FoodTag from "./FoodTag";
import { useNavigate } from "react-router-dom";

function CompareCard({ onRemove, restaurantData }) {
  const navigate = useNavigate();

  // Default restaurant data if none provided (for backward compatibility)
  const defaultRestaurant = {
    id: 1,
    name: "นิวเยียร์เคทเทอริ่ง",
    image: "https://picsum.photos/284/226?random=compare",
    rating: 4.2,
    reviewCount: 18,
    pricePerPerson: 290,
    promotion: {
      image: "https://picsum.photos/88/88?random=promo",
      name: "บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand",
      originalPrice: 295,
      discountPrice: 290,
    },
  };

  const restaurant = restaurantData || defaultRestaurant;

  const handleViewRestaurant = () => {
    navigate("/customerreservation");
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="flex flex-col max-w-[284px] border border-[#D0D5DD] pb-4 gap-8 rounded-tl-lg rounded-tr-lg rounded-br-2xl rounded-bl-2xl">
      <div className="flex flex-col gap-4">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="border rounded-lg max-w-[284px] max-h-[226px]"
        />

        <div className="flex flex-col gap-1 px-4">
          <p className="text-[#344054]">{restaurant.name}</p>
          <div className="flex gap-5">
            <div className="flex gap-1 justify-center items-center">
              <Star size={20} className="text-yellow-400 fill-current"></Star>
              <p className="text-[#667085]">{restaurant.rating}</p>
            </div>
            <p className="text-[#98A2B3]">({restaurant.reviewCount})</p>
          </div>
          <div className="flex gap-[6px]">
            <FoodTag
              showFoodStall={true}
              showSnackBox={false}
              showCatering={true}
            />
          </div>
        </div>

        <div className="px-4">
          <p>เริ่มต้น {restaurant.pricePerPerson} บาท/ท่าน</p>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <p>โปรโมชันที่มีตอนนี้</p>

          <div className="flex gap-2 max-w-[252px]">
            <img
              src={restaurant.promotion?.image || restaurant.image}
              alt=""
              className="max-w-[88px] h-[88px] rounded-lg object-cover"
            />

            <div className="flex flex-col gap-1 max-w-[156px]">
              <p className="text-[#101828] truncate overflow-hidden whitespace-nowrap">
                {restaurant.promotion?.name ||
                  "บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand"}
              </p>
              <p className="line-through text-xs">
                เริ่ม{" "}
                {restaurant.promotion?.originalPrice ||
                  restaurant.pricePerPerson + 5}{" "}
                บาท/ท่าน{" "}
              </p>
              <p className="text-gradient font-bold">
                เริ่ม{" "}
                {restaurant.promotion?.discountPrice ||
                  restaurant.pricePerPerson}{" "}
                บาท/ท่าน
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-4 w-full">
        <Button
          className="bg-white w-1/2 text-black border border-[#D0D5DD] py-[10px] px-4 rounded-lg font-semibold cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
          onClick={handleRemove}
        >
          นำออก
        </Button>
        <Button
          className="bg-gradient w-1/2 text-white py-[10px] px-4 rounded-lg font-semibold cursor-pointer hover:opacity-90 hover:shadow-md transition-all duration-200"
          onClick={handleViewRestaurant}
        >
          ดูร้าน
        </Button>
      </div>
    </div>
  );
}

export default CompareCard;
