import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ChevronDown, Heart, Star, HandPlatter } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Badge } from "./badge";
import FoodTag from "./FoodTag";
import axios from "axios";

const PlanningCard = forwardRef(function PlanningCard({ id, onRemove }, ref) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // State for form selections
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [selectedMainType, setSelectedMainType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [guestCount, setGuestCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // State for category data from APIs
  const [eventCategories, setEventCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Reset function to clear all states
  const resetCard = () => {
    setSelectedEventType("");
    setSelectedFoodType("");
    setSelectedMainType("");
    setSelectedBudget("");
    setDate(undefined);
    setGuestCount(1);
    setSearchResults([]);
    setSearchPerformed(false);
    setIsSearching(false);
  };

  // Expose filter data and search function to parent component
  useImperativeHandle(ref, () => ({
    getFilterData: () => ({
      eventType: selectedEventType,
      foodType: selectedFoodType,
      mainType: selectedMainType,
      budget: selectedBudget,
      date: date,
      guestCount: guestCount,
    }),
    searchRestaurants: searchRestaurants,
    resetCard: resetCard,
  }));

  // Search restaurants function
  const searchRestaurants = async () => {
    if (!selectedEventType && !selectedFoodType && !selectedMainType) {
      console.log("No filters selected for planning card", id);
      return;
    }

    try {
      setIsSearching(true);
      setSearchPerformed(true);

      const searchParams = new URLSearchParams();
      if (selectedMainType)
        searchParams.append("main_category_id", selectedMainType);
      if (selectedFoodType)
        searchParams.append("food_category_id", selectedFoodType);
      if (selectedEventType)
        searchParams.append("event_category_id", selectedEventType);
      searchParams.append("page", "1");
      searchParams.append("limit", "10");

      console.log(
        `Searching restaurants for planning card ${id} with filters:`,
        {
          eventType: selectedEventType,
          foodType: selectedFoodType,
          mainType: selectedMainType,
        }
      );

      const response = await axios.get(
        `${baseUrl}/api/restaurants/search?${searchParams.toString()}`
      );

      setSearchResults(response.data.data || []);
      console.log(
        `Search results for planning card ${id}:`,
        response.data.data
      );
    } catch (error) {
      console.error(
        `Error searching restaurants for planning card ${id}:`,
        error
      );
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch category data when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);

        // Fetch all category types in parallel
        const [eventResponse, foodResponse, mainResponse] = await Promise.all([
          axios.get(`${baseUrl}/api/event-categories`),
          axios.get(`${baseUrl}/api/food-categories`),
          axios.get(`${baseUrl}/api/main-categories`),
        ]);

        setEventCategories(eventResponse.data);
        setFoodCategories(foodResponse.data);
        setMainCategories(mainResponse.data);

        console.log("Categories loaded:", {
          events: eventResponse.data,
          foods: foodResponse.data,
          mains: mainResponse.data,
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [baseUrl]);

  const toggleHeart = (e) => {
    e.stopPropagation(); // Prevent card click when heart is clicked
    setIsLiked(!isLiked);
  };

  const handleRemove = () => {
    if (onRemove && id) {
      onRemove(id);
    }
  };

  const handleGuestCountChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setGuestCount(Math.max(1, value)); // Ensure minimum value is 1
  };

  return (
    <div className="w-[584px] pb-8 rounded-xl border border-[#D3CFCF]">
      <div className="flex justify-center items-center p-6">
        <div className="flex justify-between items-center w-[536px]">
          <p className="text-lg font-semibold">รายการจัดเลี้ยง {id}</p>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#98A2B3] cursor-pointer hover:text-red-500 transition-colors duration-200"
            onClick={handleRemove}
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-5">
        <div className="flex gap-4 max-w-[536px]">
          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">
              ประเภทงาน<span className="text-red-500">*</span>
            </p>

            <div className="relative">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option value="" disabled>
                  {loadingCategories ? "กำลังโหลด..." : "เลือกประเภทงาน"}
                </option>
                {eventCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">
              ประเภทอาหาร<span className="text-red-500">*</span>
            </p>

            <div className="relative">
              <select
                value={selectedFoodType}
                onChange={(e) => setSelectedFoodType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option value="" disabled>
                  {loadingCategories ? "กำลังโหลด..." : "เลือกประเภทอาหาร"}
                </option>
                {foodCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 max-w-[536px]">
          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">
              ประเภทการจัด<span className="text-red-500">*</span>
            </p>

            <div className="relative">
              <select
                value={selectedMainType}
                onChange={(e) => setSelectedMainType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option value="" disabled>
                  {loadingCategories ? "กำลังโหลด..." : "รูปแบบงาน"}
                </option>
                {mainCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">งบประมาณ*</p>

            <div className="relative">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option value="" disabled>
                  เลือกงบประมาณ
                </option>
                <option value="under-5000">ต่ำกว่า 5,000 บาท</option>
                <option value="5000-10000">5,000 - 10,000 บาท</option>
                <option value="10000-20000">10,000 - 20,000 บาท</option>
                <option value="20000-50000">20,000 - 50,000 บาท</option>
                <option value="50000-100000">50,000 - 100,000 บาท</option>
                <option value="over-100000">มากกว่า 100,000 บาท</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 max-w-[536px]">
          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">จำนวนคน*</p>

            <Input
              type="number"
              placeholder="เพิ่มตัวเลข"
              className="w-full"
              value={guestCount}
              onChange={handleGuestCountChange}
              min="1"
            />
          </div>

          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">วันที่ต้องการนัด*</p>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal border-2 border-gray-200 hover:border-orange-500 focus:ring-2 focus:ring-orange-500"
                >
                  {date
                    ? date.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "เลือกวันที่"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-[536px]">
          <p className="text-sm font-medium text-[#344054]">ระยะเวลานัด</p>

          <div className="flex gap-4 max-w-[536px]">
            <div className="flex flex-col gap-3 w-[260px]">
              <Label
                htmlFor="time-picker"
                className="px-1 text-sm font-medium text-[#7B8493]"
              >
                เวลาเริ่ม
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            <div className="flex flex-col gap-3 w-[260px]">
              <Label
                htmlFor="time-picker"
                className="px-1 text-sm font-medium text-[#7B8493]"
              >
                เวลาจบ
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        </div>

        {/* Search Results Display */}
        {searchPerformed && (
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-[#344054]">
                ผลการค้นหา ({searchResults.length} รายการ)
              </p>
              {isSearching && (
                <p className="text-xs text-[#667085]">กำลังค้นหา...</p>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                {searchResults.map((restaurant) => (
                  <div key={restaurant.id} className="flex gap-3 pr-6">
                    <div className="relative">
                      <img
                        src={
                          restaurant.images?.[0]?.url ||
                          "https://github.com/shadcn.png"
                        }
                        alt={restaurant.name}
                        className="w-[147px] h-[144px] rounded-lg object-cover"
                      />
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

                    <div className="flex flex-col gap-2 w-[353px]">
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-[#101828] truncate overflow-hidden whitespace-nowrap">
                          {restaurant.name}
                        </p>
                        <p className="text-sm text-[#667085] truncate">
                          {restaurant.description}
                        </p>
                        <div className="flex gap-5">
                          <div className="flex gap-1 justify-center items-center">
                            <Star
                              Super
                              Delight
                              Meal
                              size={20}
                              className="text-yellow-400 fill-current"
                            />
                            <p className="text-[#667085]">
                              {restaurant.avgRating
                                ? Number(restaurant.avgRating.toFixed(2))
                                : 0}
                            </p>
                          </div>
                          <p className="text-[#98A2B3]">
                            ({Math.floor(restaurant.totalReview || 0)})
                          </p>
                        </div>

                        <div className="flex gap-[6px]">
                          <FoodTag
                            categories={(
                              restaurant.main_categories || []
                            ).filter(
                              (category, index, array) =>
                                array.findIndex((c) => c.id === category.id) ===
                                index
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                ไม่พบร้านค้าที่ตรงกับเงื่อนไขการค้นหา
              </div>
            )}
          </div>
        )}

        {/* <div className="flex gap-3 pr-6">
          <div className="relative">
            <img
              src="https://github.com/shadcn.png"
              alt=""
              className="w-[147px] h-[144px] rounded-lg"
            />
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

          <div className="flex flex-col gap-2 w-[353px]">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[#101828] truncate overflow-hidden whitespace-nowrap">
                ข้าวมันไก่ลุงหนวด24ชม. - ถนนอ่อน
              </p>
              <div className="flex gap-5">
                <div className="flex gap-1 justify-center items-center">
                  <Star
                    size={20}
                    className="text-yellow-400 fill-current"
                  ></Star>
                  <p className="text-[#667085]">4.2</p>
                </div>
                <p className="text-[#98A2B3]">(18)</p>
              </div>

              <div className="flex gap-[6px]">
                <FoodTag
                  showFoodStall={true}
                  showSnackBox={true}
                  showCatering={false}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
});

export default PlanningCard;
