import { Button } from "./button";
import { Star } from "lucide-react";
import FoodTag from "./FoodTag";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

// Constants
const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_PRICE = 290;
const FALLBACK_IMAGES = {
  restaurant: "https://picsum.photos/284/226?random=compare",
  package: "https://picsum.photos/88/88?random=promo",
};

// Helper functions
const getValidPrice = (price, oldPrice, fallback = DEFAULT_PRICE) => {
  if (price && price > 0) return price;
  if (oldPrice && oldPrice > 0) return oldPrice;
  return fallback;
};

const hasValidDiscount = (packageDetail) => {
  return (
    packageDetail?.has_discount &&
    packageDetail?.old_price != null &&
    packageDetail?.old_price > 0
  );
};

function CompareCard({ onRemove, restaurantData }) {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurant data and packages when component mounts or restaurantData changes
  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!restaurantData?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch restaurant details
        const restaurantResponse = await axios.get(
          `${BASE_URL}/api/restaurants/${restaurantData.id}`
        );
        setRestaurant(restaurantResponse.data);

        // Fetch packages for this restaurant
        // Note: If backend provides /api/restaurants/{id}/packages endpoint, use that instead
        const packagesResponse = await axios.get(`${BASE_URL}/api/packages`);
        const restaurantPackages = packagesResponse.data.filter(
          (pkg) => pkg.restaurant_id === restaurantData.id
        );
        setPackages(restaurantPackages);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError("Failed to load restaurant data");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantData?.id]);

  // Default restaurant data if none provided (for backward compatibility)
  const defaultRestaurant = {
    id: 1,
    name: "นิวเยียร์เคทเทอริ่ง",
    images: [{ url: FALLBACK_IMAGES.restaurant }],
    avgRating: 4.2,
    totalReview: 18,
    food_categories: [],
    event_categories: [],
    main_categories: [],
  };

  // Use fetched data or fallback to passed data or default
  const displayRestaurant = restaurant || restaurantData || defaultRestaurant;

  // Get first package for promotion display
  const firstPackage = packages.length > 0 ? packages[0] : null;
  const firstPackageDetail = firstPackage?.package_details?.[0] || null;

  const handleViewRestaurant = () => {
    navigate("/customerreservation");
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  // Show loading state
  if (loading && restaurantData?.id) {
    return (
      <div className="flex flex-col max-w-[284px] border border-[#D0D5DD] pb-4 gap-8 rounded-tl-lg rounded-tr-lg rounded-br-2xl rounded-bl-2xl">
        <div className="animate-pulse">
          <div className="bg-gray-300 rounded-lg w-[284px] h-[226px]"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col max-w-[284px] border border-red-300 pb-4 gap-8 rounded-tl-lg rounded-tr-lg rounded-br-2xl rounded-bl-2xl">
        <div className="p-4 text-center text-red-600">
          <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-[284px] border border-[#D0D5DD] pb-4 gap-8 rounded-tl-lg rounded-tr-lg rounded-br-2xl rounded-bl-2xl">
      <div className="flex flex-col gap-4">
        <img
          src={displayRestaurant.images?.[0]?.url || FALLBACK_IMAGES.restaurant}
          alt={displayRestaurant.name}
          className="border rounded-lg max-w-[284px] h-[226px] object-cover"
        />

        <div className="flex flex-col gap-1 px-4">
          <p className="text-[#344054]">{displayRestaurant.name}</p>
          <div className="flex gap-5">
            <div className="flex gap-1 justify-center items-center">
              <Star size={20} className="text-yellow-400 fill-current"></Star>
              <p className="text-[#667085]">
                {displayRestaurant.avgRating
                  ? Number(displayRestaurant.avgRating.toFixed(2))
                  : 0}
              </p>
            </div>
            <p className="text-[#98A2B3]">
              ({Math.floor(displayRestaurant.totalReview || 0)})
            </p>
          </div>
          <div className="flex gap-[6px]">
            <FoodTag
              categories={(displayRestaurant.main_categories || []).filter(
                (category, index, array) =>
                  array.findIndex((c) => c.id === category.id) === index
              )}
            />
          </div>
        </div>

        <div className="px-4">
          <p>
            เริ่มต้น{" "}
            {getValidPrice(
              firstPackageDetail?.price,
              firstPackageDetail?.old_price
            )}{" "}
            บาท/ท่าน
          </p>
        </div>

        {/* Package promotion section */}
        {firstPackage ? (
          <div className="flex flex-col gap-2 px-4">
            <p>โปรโมชันที่มีตอนนี้</p>

            <div className="flex gap-2 max-w-[252px]">
              <img
                src={
                  firstPackage.package_images?.[0]?.url ||
                  displayRestaurant.images?.[0]?.url ||
                  FALLBACK_IMAGES.package
                }
                alt="Package promotion"
                className="w-[88px] h-[88px] rounded-lg object-cover"
              />

              <div className="flex flex-col gap-1 max-w-[156px]">
                <p className="text-[#101828] truncate overflow-hidden whitespace-nowrap">
                  {firstPackageDetail?.name ||
                    firstPackage.name ||
                    "บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand"}
                </p>
                {hasValidDiscount(firstPackageDetail) ? (
                  <p className="line-through text-xs">
                    เริ่ม {firstPackageDetail.old_price} บาท/ท่าน
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs">ไม่มีส่วนลด</p>
                )}
                <p className="text-gradient font-bold">
                  เริ่ม{" "}
                  {getValidPrice(
                    firstPackageDetail?.price,
                    firstPackageDetail?.old_price
                  )}{" "}
                  บาท/ท่าน
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-4">
            <p>โปรโมชันที่มีตอนนี้</p>
            <p className="text-gray-500 text-sm">ไม่มีโปรโมชันในขณะนี้</p>
          </div>
        )}
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
